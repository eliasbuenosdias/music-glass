<script lang="ts">
    import { toast } from "svelte-sonner";
    import { onMount } from "svelte";
    import { invoke, convertFileSrc } from "@tauri-apps/api/core";
    import { listen } from "@tauri-apps/api/event";
    import { readFile } from "@tauri-apps/plugin-fs";
    import { open, save } from "@tauri-apps/plugin-dialog";
    import {
        FileText,
        Music,
        Image as ImageIcon,
        Video,
        Play,
        Download,
        Settings,
        Loader2,
        X,
        ArrowRight,
        Disc,
        Camera,
    } from "lucide-svelte";
    import DragZone from "$lib/components/DragZone.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import * as mm from "music-metadata-browser";
    import { captureAppScreenshot } from "$lib/utils/screenshot.ts";

    // --- STORES/STATE ---
    let audioFile: any = null;
    let imageFile: any = null;
    let isGenerating = false;
    let progress = 0;
    let status = "Ready to create";
    let previewUrl = "";

    // Options
    let title = "";
    let description = "";
    let preset = "Fast 1080p30";
    let audioBitrate = 192;
    let fps = 30;

    // HandBrake check
    let hasHandBrake = false;

    let unlistenProgress: () => void;
    let unlistenStatus: () => void;

    onMount(() => {
        const setup = async () => {
            try {
                hasHandBrake = await invoke("check_handbrake");

                unlistenProgress = await listen(
                    "video-progress",
                    (event: any) => {
                        progress = Math.round(event.payload.progress);
                    },
                );
                unlistenStatus = await listen("video-status", (event: any) => {
                    status = event.payload.status;
                });
            } catch (e) {
                console.error("Error in setup:", e);
            }
        };
        setup();

        const handleKeys = async (e: KeyboardEvent) => {
            const isKeyJ = e.key.toLowerCase() === "j";
            const isModifier = e.metaKey || e.ctrlKey;

            if (isModifier && isKeyJ) {
                e.preventDefault();
                await captureAppScreenshot();
            }
        };
        window.addEventListener("keydown", handleKeys);

        return () => {
            unlistenProgress?.();
            unlistenStatus?.();
            window.removeEventListener("keydown", handleKeys);
        };
    });

    async function handleAudio(f: any) {
        try {
            let metadata;
            if (f.isPathOnly) {
                const data = await readFile(f.path);
                metadata = await mm.parseBlob(new Blob([data]));
            } else {
                metadata = await mm.parseBlob(f);
            }

            audioFile = {
                name: f.name,
                path: f.path || (f as any).path,
                duration: metadata.format.duration,
                artist: metadata.common.artist,
                title: metadata.common.title,
            };
            if (!title)
                title = `${audioFile.artist || "Unknown"} - ${audioFile.title || "Untitled"}`;
        } catch (e) {
            console.error("Error parsing audio metadata:", e);
            audioFile = {
                name: f.name,
                path: f.path || (f as any).path,
            };
        }
    }

    async function handleImage(f: any) {
        const path = f.path || (f as any).path;
        imageFile = {
            name: f.name,
            path: path,
            url: f.isPathOnly ? convertFileSrc(path) : URL.createObjectURL(f),
        };
    }

    async function handleGenerate() {
        if (!audioFile || !imageFile) return;

        const outPath = await save({
            filters: [{ name: "Video", extensions: ["mp4"] }],
            defaultPath: `${title || "Video"}.mp4`,
        });

        if (!outPath) return;

        isGenerating = true;
        progress = 0;
        try {
            const result: string = await invoke("generate_video", {
                options: {
                    audio_path: audioFile.path,
                    image_path: imageFile.path,
                    output_path: outPath,
                    title: title,
                    preset: preset,
                    audio_bitrate: audioBitrate,
                    fps: fps,
                },
            });
            previewUrl = result.startsWith("/") ? `asset://${result}` : result;
        } catch (e) {
            status = `Error: ${e}`;
        } finally {
            isGenerating = false;
        }
    }

    async function cancel() {
        await invoke("cancel_generation");
        isGenerating = false;
    }
</script>

<div class="flex gap-4 w-full max-w-7xl h-full items-start overflow-hidden">
    <!-- Left Side: Drop Zones & Previews -->
    <div class="flex-1 flex flex-col gap-4 h-full">
        <div class="grid grid-cols-2 gap-4 h-48">
            <!-- Audio Drop Zone -->
            <DragZone
                file={audioFile}
                label="Drop MP3 / WAV"
                icon={Music}
                type="audio/*"
                onDrop={handleAudio}
                onClear={() => (audioFile = null)}
            >
                {#if audioFile}
                    <div class="text-center px-4">
                        <h3 class="font-bold text-lg truncate w-48 text-white">
                            {audioFile.name}
                        </h3>
                        <p class="text-xs opacity-60">
                            {Math.floor(audioFile.duration || 0)}s • {audioFile.artist ||
                                "Unknown Artist"}
                        </p>
                    </div>
                {/if}
            </DragZone>

            <!-- Image Drop Zone -->
            <DragZone
                file={imageFile}
                label="Drop JPG / PNG"
                icon={ImageIcon}
                type="image/*"
                onDrop={handleImage}
                onClear={() => (imageFile = null)}
            >
                {#if imageFile}
                    <img
                        src={imageFile.url}
                        alt="Cover"
                        class="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div class="text-center px-4 z-10">
                        <h3 class="font-bold text-lg truncate w-48 text-white">
                            {imageFile.name}
                        </h3>
                    </div>
                {/if}
            </DragZone>
        </div>

        <!-- Video Preview / Progress -->
        <GlassCard
            class="flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden"
        >
            {#if isGenerating}
                <div class="flex flex-col items-center gap-6 w-full max-w-md">
                    <div class="flex justify-between w-full mb-1 px-1">
                        <span class="text-sm font-medium text-blue-400"
                            >{status}</span
                        >
                        <span class="text-sm font-medium text-white"
                            >{progress}%</span
                        >
                    </div>
                    <div
                        class="w-full bg-white/10 rounded-full h-4 overflow-hidden"
                    >
                        <div
                            class="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                            style="width: {progress}%"
                        />
                    </div>
                    <button
                        on:click={cancel}
                        class="btn-glass px-8 py-2 text-red-400 border-red-500/20"
                    >
                        <Loader2 class="animate-spin mr-2" size={18} /> Cancel Generation
                    </button>
                </div>
            {:else if previewUrl}
                <div class="relative w-full h-full group">
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video
                        src={previewUrl}
                        controls
                        class="w-full h-full object-contain"
                    />
                    <div
                        class="absolute top-4 left-4 bg-green-500/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg animate-bounce"
                    >
                        Preview Final
                    </div>
                </div>
            {:else}
                <div class="opacity-30 flex flex-col items-center gap-4">
                    <Video size={48} />
                    <p class="text-sm italic">Video preview will appear here</p>
                </div>
            {/if}
        </GlassCard>
    </div>

    <!-- Sidebar: Options (Right Side) -->
    <div class="w-80 glass-card h-full flex flex-col gap-3 p-4">
        <div class="flex items-center gap-3 border-b border-white/10 pb-3">
            <Settings class="text-white/60" />
            <h2 class="text-xl font-bold tracking-tight">Project Options</h2>
        </div>

        <div class="space-y-3 flex-1">
            <div class="space-y-2">
                <label
                    for="video-title"
                    class="text-xs font-bold uppercase text-white/40 tracking-widest"
                    >Video Title</label
                >
                <input
                    id="video-title"
                    bind:value={title}
                    placeholder="Song Artist - Song Title"
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"
                />
            </div>

            <div class="space-y-2">
                <label
                    for="video-description"
                    class="text-xs font-bold uppercase text-white/40 tracking-widest"
                    >Description</label
                >
                <textarea
                    id="video-description"
                    bind:value={description}
                    placeholder="Add lyrics or credits..."
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none h-24 resize-none transition-all"
                ></textarea>
            </div>

            <div class="space-y-2">
                <label
                    for="quality-preset"
                    class="text-xs font-bold uppercase text-white/40 tracking-widest"
                    >Quality Preset</label
                >
                <select
                    id="quality-preset"
                    bind:value={preset}
                    class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 appearance-none outline-none"
                >
                    <option>Fast 1080p30</option>
                    <option>Very Fast 1080p30</option>
                    <option>Fast 720p30</option>
                </select>
            </div>

            <div class="space-y-4 pt-4 border-t border-white/10">
                <div class="flex justify-between items-center">
                    <label
                        for="audio-bitrate"
                        class="text-xs font-bold uppercase text-white/40 tracking-widest"
                        >Audio Bitrate</label
                    >
                    <span class="text-sm font-mono text-blue-400"
                        >{audioBitrate}kbps</span
                    >
                </div>
                <input
                    id="audio-bitrate"
                    type="range"
                    min="128"
                    max="320"
                    step="32"
                    bind:value={audioBitrate}
                    class="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                <div class="flex justify-between items-center">
                    <div
                        class="text-xs font-bold uppercase text-white/40 tracking-widest"
                    >
                        Target FPS
                    </div>
                    <span class="text-sm font-mono text-purple-400">{fps}</span>
                </div>
                <div class="flex gap-2">
                    <button
                        on:click={() => (fps = 30)}
                        class="flex-1 py-2 rounded-xl border transition-all {fps ===
                        30
                            ? 'bg-white/10 border-white/30 text-white'
                            : 'border-white/5 text-white/30 hover:border-white/10'}"
                    >
                        30
                    </button>
                    <button
                        on:click={() => (fps = 60)}
                        class="flex-1 py-2 rounded-xl border transition-all {fps ===
                        60
                            ? 'bg-white/10 border-white/30 text-white'
                            : 'border-white/5 text-white/30 hover:border-white/10'}"
                    >
                        60
                    </button>
                </div>
            </div>
        </div>

        <!-- Generate Button -->
        <div class="pt-6 border-t border-white/10">
            {#if !hasHandBrake}
                <div
                    class="bg-red-500/20 border border-red-500/30 p-4 rounded-2xl mb-4 text-xs text-red-200"
                >
                    <p class="font-bold mb-1">HandBrakeCLI missing!</p>
                    <p>
                        Please run <code>brew install handbrake</code> to enable
                        rendering.
                    </p>
                </div>
            {/if}

            <button
                on:click={handleGenerate}
                disabled={!audioFile ||
                    !imageFile ||
                    isGenerating ||
                    !hasHandBrake}
                class="w-full btn-glass group disabled:opacity-30 disabled:cursor-not-allowed"
            >
                {#if isGenerating}
                    <div class="flex items-center gap-3">
                        <Loader2 class="animate-spin" />
                        <span>Rendering Video...</span>
                    </div>
                {:else}
                    <div class="flex items-center justify-between w-full px-4">
                        <span class="uppercase tracking-[0.2em] text-sm"
                            >Create Video</span
                        >
                        <div
                            class="bg-white/20 p-2 rounded-full group-hover:scale-125 transition-transform"
                        >
                            <ArrowRight size={20} />
                        </div>
                    </div>
                {/if}
            </button>
        </div>
    </div>
</div>

<style>
    :global(:root) {
        --glass-opacity: 0.1;
    }
</style>
