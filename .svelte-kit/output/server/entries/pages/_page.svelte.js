import { c as create_ssr_component, d as compute_rest_props, f as spread, h as escape_object, i as escape_attribute_value, j as each, v as validate_component, e as escape, m as missing_component, k as add_attribute } from "../../chunks/ssr.js";
import "@tauri-apps/api/core";
import "@tauri-apps/api/event";
import "@tauri-apps/plugin-dialog";
import * as mm from "music-metadata-browser";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
/**
 * @license lucide-svelte v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode = [] } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["circle", { "cx": "9", "cy": "9", "r": "2" }],
    [
      "path",
      {
        "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "image" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Music = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M9 18V5l12-2v13" }],
    ["circle", { "cx": "6", "cy": "18", "r": "3" }],
    ["circle", { "cx": "18", "cy": "16", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "music" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "settings" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Video = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"
      }
    ],
    [
      "rect",
      {
        "x": "2",
        "y": "6",
        "width": "14",
        "height": "12",
        "rx": "2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "video" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const DragZone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { file = null } = $$props;
  let { type = "audio/*" } = $$props;
  let { label = "Drop file here" } = $$props;
  let { icon } = $$props;
  let { onDrop = (f) => {
  } } = $$props;
  let { onClear = () => {
  } } = $$props;
  if ($$props.file === void 0 && $$bindings.file && file !== void 0) $$bindings.file(file);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.onDrop === void 0 && $$bindings.onDrop && onDrop !== void 0) $$bindings.onDrop(onDrop);
  if ($$props.onClear === void 0 && $$bindings.onClear && onClear !== void 0) $$bindings.onClear(onClear);
  return ` <div class="${"glass-card flex-1 flex flex-col items-center justify-center gap-4 relative transition-all duration-300 " + escape("", true)}">${file ? `<div class="absolute top-4 right-4">${validate_component(Check, "Check").$$render($$result, { class: "text-green-400" }, {}, {})}</div> ${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      size: 64,
      class: "text-blue-400 opacity-50"
    },
    {},
    {}
  )} <div class="text-center px-4"><h3 class="font-bold text-lg truncate w-48 text-white">${escape(file.name)}</h3></div> <button class="mt-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">${validate_component(X, "X").$$render($$result, { size: 16 }, {}, {})}</button>` : `<div class="${"flex flex-col items-center gap-4 opacity-40 " + escape("", true) + " transition-opacity"}">${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      size: 80,
      class: "animate-pulse"
    },
    {},
    {}
  )} <p class="font-medium text-lg">${escape(label)}</p></div>`}</div>`;
});
const GlassCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div class="${"glass-card flex flex-col items-center justify-center p-8 gap-4 relative group transition-all duration-500 overflow-hidden " + escape(className, true)}"><div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div> ${slots.default ? slots.default({}) : ``} ${title ? `<div class="text-xs font-bold uppercase tracking-widest text-white/40 mt-2">${escape(title)}</div>` : ``}</div>`;
});
const css = {
  code: ":root{--glass-opacity:0.1}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { invoke } from \\"@tauri-apps/api/core\\";\\nimport { listen } from \\"@tauri-apps/api/event\\";\\nimport { open, save } from \\"@tauri-apps/plugin-dialog\\";\\nimport {\\n  FileText,\\n  Music,\\n  Image as ImageIcon,\\n  Video,\\n  Play,\\n  Download,\\n  Settings,\\n  Loader2,\\n  X,\\n  Check,\\n  ArrowRight,\\n  Disc\\n} from \\"lucide-svelte\\";\\nimport DragZone from \\"$lib/components/DragZone.svelte\\";\\nimport GlassCard from \\"$lib/components/GlassCard.svelte\\";\\nimport * as mm from \\"music-metadata-browser\\";\\nlet audioFile = null;\\nlet imageFile = null;\\nlet isGenerating = false;\\nlet progress = 0;\\nlet status = \\"Ready to create\\";\\nlet previewUrl = \\"\\";\\nlet title = \\"\\";\\nlet description = \\"\\";\\nlet preset = \\"YouTube HD 1080p\\";\\nlet audioBitrate = 192;\\nlet fps = 30;\\nlet hasHandBrake = false;\\nlet unlistenProgress;\\nlet unlistenStatus;\\nonMount(() => {\\n  const setup = async () => {\\n    hasHandBrake = await invoke(\\"check_handbrake\\");\\n    unlistenProgress = await listen(\\"video-progress\\", (event) => {\\n      progress = Math.round(event.payload.progress);\\n    });\\n    unlistenStatus = await listen(\\"video-status\\", (event) => {\\n      status = event.payload.status;\\n    });\\n  };\\n  setup();\\n  return () => {\\n    unlistenProgress?.();\\n    unlistenStatus?.();\\n  };\\n});\\nasync function handleAudio(file) {\\n  const metadata = await mm.parseBlob(file);\\n  audioFile = {\\n    name: file.name,\\n    path: file.path,\\n    // Tauri specific path property\\n    duration: metadata.format.duration,\\n    artist: metadata.common.artist,\\n    title: metadata.common.title\\n  };\\n  if (!title)\\n    title = `${audioFile.artist || \\"Unknown\\"} - ${audioFile.title || \\"Untitled\\"}`;\\n}\\nasync function handleImage(file) {\\n  imageFile = {\\n    name: file.name,\\n    path: file.path,\\n    url: URL.createObjectURL(file)\\n  };\\n}\\nasync function handleGenerate() {\\n  if (!audioFile || !imageFile) return;\\n  const outPath = await save({\\n    filters: [{ name: \\"Video\\", extensions: [\\"mp4\\"] }],\\n    defaultPath: `${title || \\"Video\\"}.mp4`\\n  });\\n  if (!outPath) return;\\n  isGenerating = true;\\n  progress = 0;\\n  try {\\n    const result = await invoke(\\"generate_video\\", {\\n      options: {\\n        audio_path: audioFile.path,\\n        image_path: imageFile.path,\\n        output_path: outPath,\\n        title,\\n        preset,\\n        audio_bitrate: audioBitrate,\\n        fps\\n      }\\n    });\\n    previewUrl = result.startsWith(\\"/\\") ? `asset://${result}` : result;\\n  } catch (e) {\\n    status = `Error: ${e}`;\\n  } finally {\\n    isGenerating = false;\\n  }\\n}\\nasync function cancel() {\\n  await invoke(\\"cancel_generation\\");\\n  isGenerating = false;\\n}\\n<\/script>\\n\\n<div class=\\"flex gap-8 w-full max-w-7xl h-full items-start\\">\\n    <!-- Left Side: Drop Zones & Previews -->\\n    <div class=\\"flex-1 flex flex-col gap-8 h-full\\">\\n        <div class=\\"grid grid-cols-2 gap-8 flex-1\\">\\n            <!-- Audio Drop Zone -->\\n            <DragZone\\n                file={audioFile}\\n                label=\\"Drop MP3 / WAV\\"\\n                icon={Music}\\n                type=\\"audio/*\\"\\n                onDrop={handleAudio}\\n                onClear={() => (audioFile = null)}\\n            >\\n                {#if audioFile}\\n                    <div class=\\"text-center px-4\\">\\n                        <h3 class=\\"font-bold text-lg truncate w-48 text-white\\">\\n                            {audioFile.name}\\n                        </h3>\\n                        <p class=\\"text-xs opacity-60\\">\\n                            {Math.floor(audioFile.duration || 0)}s • {audioFile.artist ||\\n                                \\"Unknown Artist\\"}\\n                        </p>\\n                    </div>\\n                {/if}\\n            </DragZone>\\n\\n            <!-- Image Drop Zone -->\\n            <DragZone\\n                file={imageFile}\\n                label=\\"Drop JPG / PNG\\"\\n                icon={ImageIcon}\\n                type=\\"image/*\\"\\n                onDrop={handleImage}\\n                onClear={() => (imageFile = null)}\\n            >\\n                {#if imageFile}\\n                    <img\\n                        src={imageFile.url}\\n                        alt=\\"Cover\\"\\n                        class=\\"absolute inset-0 w-full h-full object-cover opacity-30\\"\\n                    />\\n                    <div class=\\"text-center px-4 z-10\\">\\n                        <h3 class=\\"font-bold text-lg truncate w-48 text-white\\">\\n                            {imageFile.name}\\n                        </h3>\\n                    </div>\\n                {/if}\\n            </DragZone>\\n        </div>\\n\\n        <!-- Video Preview / Progress -->\\n        <GlassCard\\n            class=\\"h-64 flex flex-col justify-center items-center overflow-hidden\\"\\n        >\\n            {#if isGenerating}\\n                <div class=\\"flex flex-col items-center gap-6 w-full max-w-md\\">\\n                    <div class=\\"flex justify-between w-full mb-1 px-1\\">\\n                        <span class=\\"text-sm font-medium text-blue-400\\"\\n                            >{status}</span\\n                        >\\n                        <span class=\\"text-sm font-medium text-white\\"\\n                            >{progress}%</span\\n                        >\\n                    </div>\\n                    <div\\n                        class=\\"w-full bg-white/10 rounded-full h-4 overflow-hidden\\"\\n                    >\\n                        <div\\n                            class=\\"bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500\\"\\n                            style=\\"width: {progress}%\\"\\n                        />\\n                    </div>\\n                    <button\\n                        on:click={cancel}\\n                        class=\\"btn-glass px-8 py-2 text-red-400 border-red-500/20\\"\\n                    >\\n                        <Loader2 class=\\"animate-spin mr-2\\" size={18} /> Cancel Generation\\n                    </button>\\n                </div>\\n            {:else if previewUrl}\\n                <div class=\\"relative w-full h-full group\\">\\n                    <!-- svelte-ignore a11y-media-has-caption -->\\n                    <video\\n                        src={previewUrl}\\n                        controls\\n                        class=\\"w-full h-full object-contain\\"\\n                    />\\n                    <div\\n                        class=\\"absolute top-4 left-4 bg-green-500/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg animate-bounce\\"\\n                    >\\n                        Preview Final\\n                    </div>\\n                </div>\\n            {:else}\\n                <div class=\\"opacity-30 flex flex-col items-center gap-4\\">\\n                    <Video size={48} />\\n                    <p class=\\"text-sm italic\\">Video preview will appear here</p>\\n                </div>\\n            {/if}\\n        </GlassCard>\\n    </div>\\n\\n    <!-- Sidebar: Options (Right Side) -->\\n    <div class=\\"w-96 glass-card h-full flex flex-col gap-6\\">\\n        <div class=\\"flex items-center gap-3 border-b border-white/10 pb-4\\">\\n            <Settings class=\\"text-white/60\\" />\\n            <h2 class=\\"text-xl font-bold tracking-tight\\">Project Options</h2>\\n        </div>\\n\\n        <div class=\\"space-y-4 flex-1\\">\\n            <div class=\\"space-y-2\\">\\n                <label\\n                    class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >Video Title</label\\n                >\\n                <input\\n                    bind:value={title}\\n                    placeholder=\\"Song Artist - Song Title\\"\\n                    class=\\"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none transition-all\\"\\n                />\\n            </div>\\n\\n            <div class=\\"space-y-2\\">\\n                <label\\n                    class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >Description</label\\n                >\\n                <textarea\\n                    bind:value={description}\\n                    placeholder=\\"Add lyrics or credits...\\"\\n                    class=\\"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none h-24 resize-none transition-all\\"\\n                ></textarea>\\n            </div>\\n\\n            <div class=\\"space-y-2\\">\\n                <label\\n                    class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >Quality Preset</label\\n                >\\n                <select\\n                    bind:value={preset}\\n                    class=\\"w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 appearance-none outline-none\\"\\n                >\\n                    <option>YouTube HD 1080p</option>\\n                    <option>Very Fast 1080p30</option>\\n                    <option>Fast 720p30</option>\\n                </select>\\n            </div>\\n\\n            <div class=\\"space-y-4 pt-4 border-t border-white/10\\">\\n                <div class=\\"flex justify-between items-center\\">\\n                    <label\\n                        class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                        >Audio Bitrate</label\\n                    >\\n                    <span class=\\"text-sm font-mono text-blue-400\\"\\n                        >{audioBitrate}kbps</span\\n                    >\\n                </div>\\n                <input\\n                    type=\\"range\\"\\n                    min=\\"128\\"\\n                    max=\\"320\\"\\n                    step=\\"32\\"\\n                    bind:value={audioBitrate}\\n                    class=\\"w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500\\"\\n                />\\n\\n                <div class=\\"flex justify-between items-center\\">\\n                    <label\\n                        class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                        >Target FPS</label\\n                    >\\n                    <span class=\\"text-sm font-mono text-purple-400\\">{fps}</span>\\n                </div>\\n                <div class=\\"flex gap-2\\">\\n                    <button\\n                        on:click={() => (fps = 30)}\\n                        class=\\"flex-1 py-2 rounded-xl border transition-all {fps ===\\n                        30\\n                            ? \'bg-white/10 border-white/30 text-white\'\\n                            : \'border-white/5 text-white/30 hover:border-white/10\'}\\"\\n                    >\\n                        30\\n                    </button>\\n                    <button\\n                        on:click={() => (fps = 60)}\\n                        class=\\"flex-1 py-2 rounded-xl border transition-all {fps ===\\n                        60\\n                            ? \'bg-white/10 border-white/30 text-white\'\\n                            : \'border-white/5 text-white/30 hover:border-white/10\'}\\"\\n                    >\\n                        60\\n                    </button>\\n                </div>\\n            </div>\\n        </div>\\n\\n        <!-- Generate Button -->\\n        <div class=\\"pt-6 border-t border-white/10\\">\\n            {#if !hasHandBrake}\\n                <div\\n                    class=\\"bg-red-500/20 border border-red-500/30 p-4 rounded-2xl mb-4 text-xs text-red-200\\"\\n                >\\n                    <p class=\\"font-bold mb-1\\">HandBrakeCLI missing!</p>\\n                    <p>\\n                        Please run <code>brew install handbrake</code> to enable\\n                        rendering.\\n                    </p>\\n                </div>\\n            {/if}\\n\\n            <button\\n                on:click={handleGenerate}\\n                disabled={!audioFile ||\\n                    !imageFile ||\\n                    isGenerating ||\\n                    !hasHandBrake}\\n                class=\\"w-full btn-glass group disabled:opacity-30 disabled:cursor-not-allowed\\"\\n            >\\n                {#if isGenerating}\\n                    <div class=\\"flex items-center gap-3\\">\\n                        <Loader2 class=\\"animate-spin\\" />\\n                        <span>Rendering Video...</span>\\n                    </div>\\n                {:else}\\n                    <div class=\\"flex items-center justify-between w-full px-4\\">\\n                        <span class=\\"uppercase tracking-[0.2em] text-sm\\"\\n                            >Create Video</span\\n                        >\\n                        <div\\n                            class=\\"bg-white/20 p-2 rounded-full group-hover:scale-125 transition-transform\\"\\n                        >\\n                            <ArrowRight size={20} />\\n                        </div>\\n                    </div>\\n                {/if}\\n            </button>\\n        </div>\\n    </div>\\n</div>\\n\\n<style>\\n    :global(:root) {\\n        --glass-opacity: 0.1;\\n    }\\n</style>\\n"],"names":[],"mappings":"AA4VY,KAAO,CACX,eAAe,CAAE,GACrB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let audioFile = null;
  let imageFile = null;
  let isGenerating = false;
  let title = "";
  let audioBitrate = 192;
  let fps = 30;
  async function handleAudio(file) {
    const metadata = await mm.parseBlob(file);
    audioFile = {
      name: file.name,
      path: file.path,
      // Tauri specific path property
      duration: metadata.format.duration,
      artist: metadata.common.artist,
      title: metadata.common.title
    };
    if (!title) title = `${audioFile.artist || "Unknown"} - ${audioFile.title || "Untitled"}`;
  }
  async function handleImage(file) {
    imageFile = {
      name: file.name,
      path: file.path,
      url: URL.createObjectURL(file)
    };
  }
  $$result.css.add(css);
  return `<div class="flex gap-8 w-full max-w-7xl h-full items-start"> <div class="flex-1 flex flex-col gap-8 h-full"><div class="grid grid-cols-2 gap-8 flex-1"> ${validate_component(DragZone, "DragZone").$$render(
    $$result,
    {
      file: audioFile,
      label: "Drop MP3 / WAV",
      icon: Music,
      type: "audio/*",
      onDrop: handleAudio,
      onClear: () => audioFile = null
    },
    {},
    {
      default: () => {
        return `${audioFile ? `<div class="text-center px-4"><h3 class="font-bold text-lg truncate w-48 text-white">${escape(audioFile.name)}</h3> <p class="text-xs opacity-60">${escape(Math.floor(audioFile.duration || 0))}s • ${escape(audioFile.artist || "Unknown Artist")}</p></div>` : ``}`;
      }
    }
  )}  ${validate_component(DragZone, "DragZone").$$render(
    $$result,
    {
      file: imageFile,
      label: "Drop JPG / PNG",
      icon: Image,
      type: "image/*",
      onDrop: handleImage,
      onClear: () => imageFile = null
    },
    {},
    {
      default: () => {
        return `${imageFile ? `<img${add_attribute("src", imageFile.url, 0)} alt="Cover" class="absolute inset-0 w-full h-full object-cover opacity-30"> <div class="text-center px-4 z-10"><h3 class="font-bold text-lg truncate w-48 text-white">${escape(imageFile.name)}</h3></div>` : ``}`;
      }
    }
  )}</div>  ${validate_component(GlassCard, "GlassCard").$$render(
    $$result,
    {
      class: "h-64 flex flex-col justify-center items-center overflow-hidden"
    },
    {},
    {
      default: () => {
        return `${`${`<div class="opacity-30 flex flex-col items-center gap-4">${validate_component(Video, "Video").$$render($$result, { size: 48 }, {}, {})} <p class="text-sm italic" data-svelte-h="svelte-1hxg7an">Video preview will appear here</p></div>`}`}`;
      }
    }
  )}</div>  <div class="w-96 glass-card h-full flex flex-col gap-6"><div class="flex items-center gap-3 border-b border-white/10 pb-4">${validate_component(Settings, "Settings").$$render($$result, { class: "text-white/60" }, {}, {})} <h2 class="text-xl font-bold tracking-tight" data-svelte-h="svelte-fy5fs3">Project Options</h2></div> <div class="space-y-4 flex-1"><div class="space-y-2"><label class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-e9brw2">Video Title</label> <input placeholder="Song Artist - Song Title" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"${add_attribute("value", title, 0)}></div> <div class="space-y-2"><label class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-bb3e2j">Description</label> <textarea placeholder="Add lyrics or credits..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none h-24 resize-none transition-all">${escape("")}</textarea></div> <div class="space-y-2"><label class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-dyhrsd">Quality Preset</label> <select class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 appearance-none outline-none"><option value="YouTube HD 1080p" data-svelte-h="svelte-1jizvb4">YouTube HD 1080p</option><option value="Very Fast 1080p30" data-svelte-h="svelte-18oa9ok">Very Fast 1080p30</option><option value="Fast 720p30" data-svelte-h="svelte-1iai5sa">Fast 720p30</option></select></div> <div class="space-y-4 pt-4 border-t border-white/10"><div class="flex justify-between items-center"><label class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-nb78fs">Audio Bitrate</label> <span class="text-sm font-mono text-blue-400">${escape(audioBitrate)}kbps</span></div> <input type="range" min="128" max="320" step="32" class="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"${add_attribute("value", audioBitrate, 0)}> <div class="flex justify-between items-center"><label class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-1j27ipz">Target FPS</label> <span class="text-sm font-mono text-purple-400">${escape(fps)}</span></div> <div class="flex gap-2"><button class="${"flex-1 py-2 rounded-xl border transition-all " + escape(
    "bg-white/10 border-white/30 text-white",
    true
  )}">30</button> <button class="${"flex-1 py-2 rounded-xl border transition-all " + escape(
    "border-white/5 text-white/30 hover:border-white/10",
    true
  )}">60</button></div></div></div>  <div class="pt-6 border-t border-white/10">${`<div class="bg-red-500/20 border border-red-500/30 p-4 rounded-2xl mb-4 text-xs text-red-200" data-svelte-h="svelte-bcbege"><p class="font-bold mb-1">HandBrakeCLI missing!</p> <p>Please run <code>brew install handbrake</code> to enable
                        rendering.</p></div>`} <button ${!audioFile || !imageFile || isGenerating || true ? "disabled" : ""} class="w-full btn-glass group disabled:opacity-30 disabled:cursor-not-allowed">${`<div class="flex items-center justify-between w-full px-4"><span class="uppercase tracking-[0.2em] text-sm" data-svelte-h="svelte-1og6dhu">Create Video</span> <div class="bg-white/20 p-2 rounded-full group-hover:scale-125 transition-transform">${validate_component(Arrow_right, "ArrowRight").$$render($$result, { size: 20 }, {}, {})}</div></div>`}</button></div></div> </div>`;
});
export {
  Page as default
};
