<script lang="ts">
    import { Check, X } from "lucide-svelte";
    import { open } from "@tauri-apps/plugin-dialog";
    import { convertFileSrc } from "@tauri-apps/api/core";

    export let file: any = null;
    export let type = "audio/*";
    export let label = "Drop file here";
    export let icon: any;
    export let onDrop = (f: any) => {};
    export let onClear = () => {};

    let isOver = false;

    async function handleDrop(e: DragEvent) {
        isOver = false;
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            handleFiles(files[0]);
        }
    }

    async function handleClick() {
        if (file) return;
        const selected = await open({
            multiple: false,
            filters: type.includes("audio")
                ? [
                      {
                          name: "Audio",
                          extensions: ["mp3", "wav", "ogg", "flac", "m4a"],
                      },
                  ]
                : [
                      {
                          name: "Image",
                          extensions: [
                              "jpg",
                              "jpeg",
                              "png",
                              "webp",
                              "gif",
                              "svg",
                          ],
                      },
                  ],
        });

        if (selected && !Array.isArray(selected)) {
            // Create a fake File object that works with our handleAudio/handleImage
            const name = selected.split("/").pop();
            onDrop({
                name,
                path: selected,
                isPathOnly: true, // Flag to help the handler
            });
        }
    }

    function handleFiles(f: any) {
        // Try to get path from file object (Tauri injects this usually)
        const path =
            f.path || (f.webkitRelativePath ? f.webkitRelativePath : null);

        const mimeMatch = f.type && f.type.match(type.replace("*", ".*"));
        const extensionMatch =
            f.name &&
            !f.type &&
            ((type.includes("audio") &&
                f.name.match(/\.(mp3|wav|ogg|flac|m4a)$/i)) ||
                (type.includes("image") &&
                    f.name.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)));

        if (mimeMatch || extensionMatch) {
            onDrop(f);
        } else {
            console.warn("File type not matched:", f.type, f.name);
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            handleClick();
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    role="button"
    tabindex="0"
    class="glass-card flex-1 flex flex-col items-center justify-center gap-4 relative transition-all duration-300 cursor-pointer {isOver
        ? 'scale-105 border-blue-500/50 shadow-glow'
        : ''} {file ? 'cursor-default' : 'hover:bg-white/5'}"
    on:dragenter|preventDefault={() => (isOver = true)}
    on:dragover|preventDefault={() => (isOver = true)}
    on:dragleave|preventDefault={() => (isOver = false)}
    on:drop|preventDefault={handleDrop}
    on:click={handleClick}
    on:keydown={handleKeyDown}
>
    {#if file}
        <div class="absolute top-4 right-4">
            <Check class="text-green-400" />
        </div>
        <svelte:component
            this={icon}
            size={64}
            class="text-blue-400 opacity-50"
        />
        <div class="text-center px-4">
            <h3 class="font-bold text-lg truncate w-48 text-white">
                {file.name}
            </h3>
        </div>
        <button
            on:click|stopPropagation={onClear}
            class="mt-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all z-20"
        >
            <X size={16} />
        </button>
    {:else}
        <div
            class="flex flex-col items-center gap-4 opacity-40 {isOver
                ? 'opacity-100'
                : ''} transition-opacity"
        >
            <svelte:component
                this={icon}
                size={48}
                class={isOver ? "animate-bounce" : "animate-pulse"}
            />
            <p class="font-medium text-base">{label}</p>
        </div>
    {/if}
</div>
