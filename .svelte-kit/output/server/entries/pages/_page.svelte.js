import { b as get_store_value, c as create_ssr_component, d as compute_rest_props, f as spread, h as escape_object, i as escape_attribute_value, j as each, v as validate_component, e as escape, m as missing_component, k as add_attribute } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import { convertFileSrc } from "@tauri-apps/api/core";
import "@tauri-apps/api/event";
import { readFile } from "@tauri-apps/plugin-fs";
import "@tauri-apps/plugin-dialog";
import * as mm from "music-metadata-browser";
import "tauri-plugin-screenshots-api";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const isBrowser = typeof document !== "undefined";
function clientWritable(initialValue) {
  const store = writable(initialValue);
  function set(value) {
    if (isBrowser) {
      store.set(value);
    }
  }
  function update(updater) {
    if (isBrowser) {
      store.update(updater);
    }
  }
  return {
    subscribe: store.subscribe,
    set,
    update
  };
}
let toastsCounter = 0;
function createToastState() {
  const toasts = clientWritable([]);
  const heights = clientWritable([]);
  function addToast(data) {
    toasts.update((prev) => [data, ...prev]);
  }
  function create(data) {
    const { message: message2, ...rest } = data;
    const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    const $toasts = get_store_value(toasts);
    const alreadyExists = $toasts.find((toast) => {
      return toast.id === id;
    });
    if (alreadyExists) {
      toasts.update((prev) => prev.map((toast) => {
        if (toast.id === id) {
          return {
            ...toast,
            ...data,
            id,
            title: message2,
            dismissable,
            type,
            updated: true
          };
        }
        return {
          ...toast,
          updated: false
        };
      }));
    } else {
      addToast({ ...rest, id, title: message2, dismissable, type });
    }
    return id;
  }
  function dismiss(id) {
    if (id === void 0) {
      toasts.update((prev) => prev.map((toast) => ({ ...toast, dismiss: true })));
      return;
    }
    toasts.update((prev) => prev.map((toast) => toast.id === id ? { ...toast, dismiss: true } : toast));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev) => prev.filter((toast) => toast.id !== id));
    return id;
  }
  function message(message2, data) {
    return create({ ...data, type: "default", message: message2 });
  }
  function error(message2, data) {
    return create({ ...data, type: "error", message: message2 });
  }
  function success(message2, data) {
    return create({ ...data, type: "success", message: message2 });
  }
  function info(message2, data) {
    return create({ ...data, type: "info", message: message2 });
  }
  function warning(message2, data) {
    return create({ ...data, type: "warning", message: message2 });
  }
  function loading(message2, data) {
    return create({ ...data, type: "loading", message: message2 });
  }
  function promise(promise2, data) {
    if (!data) {
      return;
    }
    let id = void 0;
    if (data.loading !== void 0) {
      id = create({
        ...data,
        promise: promise2,
        type: "loading",
        message: data.loading
      });
    }
    const p = promise2 instanceof Promise ? promise2 : promise2();
    let shouldDismiss = id !== void 0;
    p.then((response) => {
      if (response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message2 = typeof data.error === "function" ? (
          // @ts-expect-error: Incorrect response type
          data.error(`HTTP error! status: ${response.status}`)
        ) : data.error;
        create({ id, type: "error", message: message2 });
      } else if (data.success !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.success === "function" ? data.success(response) : data.success
        );
        create({ id, type: "success", message: message2 });
      }
    }).catch((error2) => {
      if (data.error !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.error === "function" ? data.error(error2) : data.error
        );
        create({ id, type: "error", message: message2 });
      }
    }).finally(() => {
      if (shouldDismiss) {
        dismiss(id);
        id = void 0;
      }
      data.finally?.();
    });
    return id;
  }
  function custom(component, data) {
    const id = data?.id || toastsCounter++;
    create({ component, id, ...data });
    return id;
  }
  function removeHeight(id) {
    heights.update((prev) => prev.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get_store_value(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev) => [data, ...prev]);
      return;
    }
    heights.update((prev) => prev.map((el) => {
      if (el.toastId === data.toastId) {
        return data;
      } else {
        return el;
      }
    }));
  }
  function reset() {
    toasts.set([]);
    heights.set([]);
  }
  return {
    // methods
    create,
    addToast,
    dismiss,
    remove,
    message,
    error,
    success,
    info,
    warning,
    loading,
    promise,
    custom,
    removeHeight,
    setHeight,
    reset,
    // stores
    toasts,
    heights
  };
}
const toastState = createToastState();
function toastFunction(message, data) {
  return toastState.create({
    message,
    ...data
  });
}
const basicToast = toastFunction;
Object.assign(basicToast, {
  success: toastState.success,
  info: toastState.info,
  warning: toastState.warning,
  error: toastState.error,
  custom: toastState.custom,
  message: toastState.message,
  promise: toastState.promise,
  dismiss: toastState.dismiss,
  loading: toastState.loading
});
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
  return ` <div role="button" tabindex="0" class="${"glass-card flex-1 flex flex-col items-center justify-center gap-4 relative transition-all duration-300 cursor-pointer " + escape("", true) + " " + escape(file ? "cursor-default" : "hover:bg-white/5", true)}">${file ? `<div class="absolute top-4 right-4">${validate_component(Check, "Check").$$render($$result, { class: "text-green-400" }, {}, {})}</div> ${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      size: 64,
      class: "text-blue-400 opacity-50"
    },
    {},
    {}
  )} <div class="text-center px-4"><h3 class="font-bold text-lg truncate w-48 text-white">${escape(file.name)}</h3></div> <button class="mt-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all z-20">${validate_component(X, "X").$$render($$result, { size: 16 }, {}, {})}</button>` : `<div class="${"flex flex-col items-center gap-4 opacity-40 " + escape("", true) + " transition-opacity"}">${validate_component(icon || missing_component, "svelte:component").$$render(
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
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { toast } from \\"svelte-sonner\\";\\nimport { onMount } from \\"svelte\\";\\nimport { invoke, convertFileSrc } from \\"@tauri-apps/api/core\\";\\nimport { listen } from \\"@tauri-apps/api/event\\";\\nimport { readFile } from \\"@tauri-apps/plugin-fs\\";\\nimport { open, save } from \\"@tauri-apps/plugin-dialog\\";\\nimport {\\n  FileText,\\n  Music,\\n  Image as ImageIcon,\\n  Video,\\n  Play,\\n  Download,\\n  Settings,\\n  Loader2,\\n  X,\\n  ArrowRight,\\n  Disc,\\n  Camera\\n} from \\"lucide-svelte\\";\\nimport DragZone from \\"$lib/components/DragZone.svelte\\";\\nimport GlassCard from \\"$lib/components/GlassCard.svelte\\";\\nimport * as mm from \\"music-metadata-browser\\";\\nimport { captureAppScreenshot } from \\"$lib/utils/screenshot.ts\\";\\nlet audioFile = null;\\nlet imageFile = null;\\nlet isGenerating = false;\\nlet progress = 0;\\nlet status = \\"Ready to create\\";\\nlet previewUrl = \\"\\";\\nlet title = \\"\\";\\nlet description = \\"\\";\\nlet preset = \\"Fast 1080p30\\";\\nlet audioBitrate = 192;\\nlet fps = 30;\\nlet hasHandBrake = false;\\nlet unlistenProgress;\\nlet unlistenStatus;\\nlet debugLogs = [];\\nconst addLog = (msg) => {\\n  const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();\\n  debugLogs = [`[${time}] ${msg}`, ...debugLogs].slice(0, 10);\\n  console.log(`[DEBUG_OVERLAY] ${msg}`);\\n};\\nonMount(() => {\\n  addLog(\\"MusicGlass Montada! (v2.0)\\");\\n  const setup = async () => {\\n    try {\\n      hasHandBrake = await invoke(\\"check_handbrake\\");\\n      addLog(`HandBrake detectado: ${hasHandBrake}`);\\n      unlistenProgress = await listen(\\n        \\"video-progress\\",\\n        (event) => {\\n          progress = Math.round(event.payload.progress);\\n        }\\n      );\\n      unlistenStatus = await listen(\\"video-status\\", (event) => {\\n        status = event.payload.status;\\n        addLog(`Estado: ${status}`);\\n      });\\n    } catch (e) {\\n      addLog(`Error en setup: ${e}`);\\n    }\\n  };\\n  setup();\\n  const handleKeys = async (e) => {\\n    addLog(`Tecla: ${e.key} (Alt:${e.altKey} Cmd:${e.metaKey})`);\\n    const isKeyJ = e.key.toLowerCase() === \\"j\\";\\n    const isModifier = e.metaKey || e.ctrlKey;\\n    if (isModifier && isKeyJ) {\\n      e.preventDefault();\\n      addLog(\\"!! ATAJO CMD+J DETECTADO !! Capturando...\\");\\n      const res = await captureAppScreenshot();\\n      if (res.success) {\\n        addLog(`Captura OK: ${res.path}`);\\n      } else {\\n        addLog(`Captura FALL\\\\xD3: ${res.error}`);\\n      }\\n    }\\n  };\\n  window.addEventListener(\\"keydown\\", handleKeys);\\n  return () => {\\n    unlistenProgress?.();\\n    unlistenStatus?.();\\n    window.removeEventListener(\\"keydown\\", handleKeys);\\n  };\\n});\\nasync function handleAudio(f) {\\n  try {\\n    let metadata;\\n    if (f.isPathOnly) {\\n      const data = await readFile(f.path);\\n      metadata = await mm.parseBlob(new Blob([data]));\\n    } else {\\n      metadata = await mm.parseBlob(f);\\n    }\\n    audioFile = {\\n      name: f.name,\\n      path: f.path || f.path,\\n      duration: metadata.format.duration,\\n      artist: metadata.common.artist,\\n      title: metadata.common.title\\n    };\\n    if (!title)\\n      title = `${audioFile.artist || \\"Unknown\\"} - ${audioFile.title || \\"Untitled\\"}`;\\n  } catch (e) {\\n    console.error(\\"Error parsing audio metadata:\\", e);\\n    audioFile = {\\n      name: f.name,\\n      path: f.path || f.path\\n    };\\n  }\\n}\\nasync function handleImage(f) {\\n  const path = f.path || f.path;\\n  imageFile = {\\n    name: f.name,\\n    path,\\n    url: f.isPathOnly ? convertFileSrc(path) : URL.createObjectURL(f)\\n  };\\n}\\nasync function handleGenerate() {\\n  if (!audioFile || !imageFile) return;\\n  const outPath = await save({\\n    filters: [{ name: \\"Video\\", extensions: [\\"mp4\\"] }],\\n    defaultPath: `${title || \\"Video\\"}.mp4`\\n  });\\n  if (!outPath) return;\\n  isGenerating = true;\\n  progress = 0;\\n  try {\\n    const result = await invoke(\\"generate_video\\", {\\n      options: {\\n        audio_path: audioFile.path,\\n        image_path: imageFile.path,\\n        output_path: outPath,\\n        title,\\n        preset,\\n        audio_bitrate: audioBitrate,\\n        fps\\n      }\\n    });\\n    previewUrl = result.startsWith(\\"/\\") ? `asset://${result}` : result;\\n  } catch (e) {\\n    status = `Error: ${e}`;\\n  } finally {\\n    isGenerating = false;\\n  }\\n}\\nasync function cancel() {\\n  await invoke(\\"cancel_generation\\");\\n  isGenerating = false;\\n}\\n<\/script>\\n\\n<div class=\\"flex gap-8 w-full max-w-7xl h-full items-start\\">\\n    <!-- Left Side: Drop Zones & Previews -->\\n    <div class=\\"flex-1 flex flex-col gap-8 h-full\\">\\n        <div class=\\"grid grid-cols-2 gap-8 flex-1\\">\\n            <!-- Audio Drop Zone -->\\n            <DragZone\\n                file={audioFile}\\n                label=\\"Drop MP3 / WAV\\"\\n                icon={Music}\\n                type=\\"audio/*\\"\\n                onDrop={handleAudio}\\n                onClear={() => (audioFile = null)}\\n            >\\n                {#if audioFile}\\n                    <div class=\\"text-center px-4\\">\\n                        <h3 class=\\"font-bold text-lg truncate w-48 text-white\\">\\n                            {audioFile.name}\\n                        </h3>\\n                        <p class=\\"text-xs opacity-60\\">\\n                            {Math.floor(audioFile.duration || 0)}s • {audioFile.artist ||\\n                                \\"Unknown Artist\\"}\\n                        </p>\\n                    </div>\\n                {/if}\\n            </DragZone>\\n\\n            <!-- Image Drop Zone -->\\n            <DragZone\\n                file={imageFile}\\n                label=\\"Drop JPG / PNG\\"\\n                icon={ImageIcon}\\n                type=\\"image/*\\"\\n                onDrop={handleImage}\\n                onClear={() => (imageFile = null)}\\n            >\\n                {#if imageFile}\\n                    <img\\n                        src={imageFile.url}\\n                        alt=\\"Cover\\"\\n                        class=\\"absolute inset-0 w-full h-full object-cover opacity-30\\"\\n                    />\\n                    <div class=\\"text-center px-4 z-10\\">\\n                        <h3 class=\\"font-bold text-lg truncate w-48 text-white\\">\\n                            {imageFile.name}\\n                        </h3>\\n                    </div>\\n                {/if}\\n            </DragZone>\\n        </div>\\n\\n        <!-- Video Preview / Progress -->\\n        <GlassCard\\n            class=\\"h-64 flex flex-col justify-center items-center overflow-hidden\\"\\n        >\\n            {#if isGenerating}\\n                <div class=\\"flex flex-col items-center gap-6 w-full max-w-md\\">\\n                    <div class=\\"flex justify-between w-full mb-1 px-1\\">\\n                        <span class=\\"text-sm font-medium text-blue-400\\"\\n                            >{status}</span\\n                        >\\n                        <span class=\\"text-sm font-medium text-white\\"\\n                            >{progress}%</span\\n                        >\\n                    </div>\\n                    <div\\n                        class=\\"w-full bg-white/10 rounded-full h-4 overflow-hidden\\"\\n                    >\\n                        <div\\n                            class=\\"bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500\\"\\n                            style=\\"width: {progress}%\\"\\n                        />\\n                    </div>\\n                    <button\\n                        on:click={cancel}\\n                        class=\\"btn-glass px-8 py-2 text-red-400 border-red-500/20\\"\\n                    >\\n                        <Loader2 class=\\"animate-spin mr-2\\" size={18} /> Cancel Generation\\n                    </button>\\n                </div>\\n            {:else if previewUrl}\\n                <div class=\\"relative w-full h-full group\\">\\n                    <!-- svelte-ignore a11y-media-has-caption -->\\n                    <video\\n                        src={previewUrl}\\n                        controls\\n                        class=\\"w-full h-full object-contain\\"\\n                    />\\n                    <div\\n                        class=\\"absolute top-4 left-4 bg-green-500/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg animate-bounce\\"\\n                    >\\n                        Preview Final\\n                    </div>\\n                </div>\\n            {:else}\\n                <div class=\\"opacity-30 flex flex-col items-center gap-4\\">\\n                    <Video size={48} />\\n                    <p class=\\"text-sm italic\\">Video preview will appear here</p>\\n                    <button\\n                        class=\\"text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 opacity-50\\"\\n                        on:click={() => captureAppScreenshot()}\\n                    >\\n                        DEBUG CAPTURE\\n                    </button>\\n                </div>\\n            {/if}\\n        </GlassCard>\\n    </div>\\n\\n    <!-- Sidebar: Options (Right Side) -->\\n    <div class=\\"w-96 glass-card h-full flex flex-col gap-6\\">\\n        <div class=\\"flex items-center gap-3 border-b border-white/10 pb-4\\">\\n            <Settings class=\\"text-white/60\\" />\\n            <h2 class=\\"text-xl font-bold tracking-tight\\">Project Options</h2>\\n        </div>\\n\\n        <div class=\\"space-y-4 flex-1\\">\\n            <div class=\\"space-y-2\\">\\n                <label\\n                    for=\\"video-title\\"\\n                    class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >Video Title</label\\n                >\\n                <input\\n                    id=\\"video-title\\"\\n                    bind:value={title}\\n                    placeholder=\\"Song Artist - Song Title\\"\\n                    class=\\"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none transition-all\\"\\n                />\\n            </div>\\n\\n            <div class=\\"space-y-2\\">\\n                <label\\n                    for=\\"video-description\\"\\n                    class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >Description</label\\n                >\\n                <textarea\\n                    id=\\"video-description\\"\\n                    bind:value={description}\\n                    placeholder=\\"Add lyrics or credits...\\"\\n                    class=\\"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none h-24 resize-none transition-all\\"\\n                ></textarea>\\n            </div>\\n\\n            <div class=\\"space-y-2\\">\\n                <label\\n                    for=\\"quality-preset\\"\\n                    class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >Quality Preset</label\\n                >\\n                <select\\n                    id=\\"quality-preset\\"\\n                    bind:value={preset}\\n                    class=\\"w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 appearance-none outline-none\\"\\n                >\\n                    <option>Fast 1080p30</option>\\n                    <option>Very Fast 1080p30</option>\\n                    <option>Fast 720p30</option>\\n                </select>\\n            </div>\\n\\n            <div class=\\"space-y-4 pt-4 border-t border-white/10\\">\\n                <div class=\\"flex justify-between items-center\\">\\n                    <label\\n                        for=\\"audio-bitrate\\"\\n                        class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                        >Audio Bitrate</label\\n                    >\\n                    <span class=\\"text-sm font-mono text-blue-400\\"\\n                        >{audioBitrate}kbps</span\\n                    >\\n                </div>\\n                <input\\n                    id=\\"audio-bitrate\\"\\n                    type=\\"range\\"\\n                    min=\\"128\\"\\n                    max=\\"320\\"\\n                    step=\\"32\\"\\n                    bind:value={audioBitrate}\\n                    class=\\"w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500\\"\\n                />\\n\\n                <div class=\\"flex justify-between items-center\\">\\n                    <div\\n                        class=\\"text-xs font-bold uppercase text-white/40 tracking-widest\\"\\n                    >\\n                        Target FPS\\n                    </div>\\n                    <span class=\\"text-sm font-mono text-purple-400\\">{fps}</span>\\n                </div>\\n                <div class=\\"flex gap-2\\">\\n                    <button\\n                        on:click={() => (fps = 30)}\\n                        class=\\"flex-1 py-2 rounded-xl border transition-all {fps ===\\n                        30\\n                            ? \'bg-white/10 border-white/30 text-white\'\\n                            : \'border-white/5 text-white/30 hover:border-white/10\'}\\"\\n                    >\\n                        30\\n                    </button>\\n                    <button\\n                        on:click={() => (fps = 60)}\\n                        class=\\"flex-1 py-2 rounded-xl border transition-all {fps ===\\n                        60\\n                            ? \'bg-white/10 border-white/30 text-white\'\\n                            : \'border-white/5 text-white/30 hover:border-white/10\'}\\"\\n                    >\\n                        60\\n                    </button>\\n                </div>\\n            </div>\\n        </div>\\n\\n        <!-- Generate Button -->\\n        <div class=\\"pt-6 border-t border-white/10\\">\\n            {#if !hasHandBrake}\\n                <div\\n                    class=\\"bg-red-500/20 border border-red-500/30 p-4 rounded-2xl mb-4 text-xs text-red-200\\"\\n                >\\n                    <p class=\\"font-bold mb-1\\">HandBrakeCLI missing!</p>\\n                    <p>\\n                        Please run <code>brew install handbrake</code> to enable\\n                        rendering.\\n                    </p>\\n                </div>\\n            {/if}\\n\\n            <button\\n                on:click={handleGenerate}\\n                disabled={!audioFile ||\\n                    !imageFile ||\\n                    isGenerating ||\\n                    !hasHandBrake}\\n                class=\\"w-full btn-glass group disabled:opacity-30 disabled:cursor-not-allowed\\"\\n            >\\n                {#if isGenerating}\\n                    <div class=\\"flex items-center gap-3\\">\\n                        <Loader2 class=\\"animate-spin\\" />\\n                        <span>Rendering Video...</span>\\n                    </div>\\n                {:else}\\n                    <div class=\\"flex items-center justify-between w-full px-4\\">\\n                        <span class=\\"uppercase tracking-[0.2em] text-sm\\"\\n                            >Create Video</span\\n                        >\\n                        <div\\n                            class=\\"bg-white/20 p-2 rounded-full group-hover:scale-125 transition-transform\\"\\n                        >\\n                            <ArrowRight size={20} />\\n                        </div>\\n                    </div>\\n                {/if}\\n            </button>\\n        </div>\\n    </div>\\n</div>\\n\\n<!-- Debug Log Overlay -->\\n<div\\n    class=\\"fixed bottom-6 left-6 z-[9999] pointer-events-none flex flex-col gap-1\\"\\n>\\n    {#each debugLogs as log}\\n        <div\\n            class=\\"bg-black/80 backdrop-blur-md text-[#00ff00] font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2\\"\\n        >\\n            {log}\\n        </div>\\n    {/each}\\n</div>\\n\\n<style>\\n    :global(:root) {\\n        --glass-opacity: 0.1;\\n    }\\n</style>\\n"],"names":[],"mappings":"AA0aY,KAAO,CACX,eAAe,CAAE,GACrB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let audioFile = null;
  let imageFile = null;
  let isGenerating = false;
  let title = "";
  let audioBitrate = 192;
  let fps = 30;
  let debugLogs = [];
  async function handleAudio(f) {
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
        path: f.path || f.path,
        duration: metadata.format.duration,
        artist: metadata.common.artist,
        title: metadata.common.title
      };
      if (!title) title = `${audioFile.artist || "Unknown"} - ${audioFile.title || "Untitled"}`;
    } catch (e) {
      console.error("Error parsing audio metadata:", e);
      audioFile = { name: f.name, path: f.path || f.path };
    }
  }
  async function handleImage(f) {
    const path = f.path || f.path;
    imageFile = {
      name: f.name,
      path,
      url: f.isPathOnly ? convertFileSrc(path) : URL.createObjectURL(f)
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
        return `${`${`<div class="opacity-30 flex flex-col items-center gap-4">${validate_component(Video, "Video").$$render($$result, { size: 48 }, {}, {})} <p class="text-sm italic" data-svelte-h="svelte-1hxg7an">Video preview will appear here</p> <button class="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 opacity-50" data-svelte-h="svelte-qzsjk3">DEBUG CAPTURE</button></div>`}`}`;
      }
    }
  )}</div>  <div class="w-96 glass-card h-full flex flex-col gap-6"><div class="flex items-center gap-3 border-b border-white/10 pb-4">${validate_component(Settings, "Settings").$$render($$result, { class: "text-white/60" }, {}, {})} <h2 class="text-xl font-bold tracking-tight" data-svelte-h="svelte-fy5fs3">Project Options</h2></div> <div class="space-y-4 flex-1"><div class="space-y-2"><label for="video-title" class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-1t5doja">Video Title</label> <input id="video-title" placeholder="Song Artist - Song Title" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"${add_attribute("value", title, 0)}></div> <div class="space-y-2"><label for="video-description" class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-xllg8b">Description</label> <textarea id="video-description" placeholder="Add lyrics or credits..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 ring-blue-500/20 outline-none h-24 resize-none transition-all">${escape("")}</textarea></div> <div class="space-y-2"><label for="quality-preset" class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-h8hgng">Quality Preset</label> <select id="quality-preset" class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 appearance-none outline-none"><option value="Fast 1080p30" data-svelte-h="svelte-1tq1xx2">Fast 1080p30</option><option value="Very Fast 1080p30" data-svelte-h="svelte-18oa9ok">Very Fast 1080p30</option><option value="Fast 720p30" data-svelte-h="svelte-1iai5sa">Fast 720p30</option></select></div> <div class="space-y-4 pt-4 border-t border-white/10"><div class="flex justify-between items-center"><label for="audio-bitrate" class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-19a8uku">Audio Bitrate</label> <span class="text-sm font-mono text-blue-400">${escape(audioBitrate)}kbps</span></div> <input id="audio-bitrate" type="range" min="128" max="320" step="32" class="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"${add_attribute("value", audioBitrate, 0)}> <div class="flex justify-between items-center"><div class="text-xs font-bold uppercase text-white/40 tracking-widest" data-svelte-h="svelte-1yybx5l">Target FPS</div> <span class="text-sm font-mono text-purple-400">${escape(fps)}</span></div> <div class="flex gap-2"><button class="${"flex-1 py-2 rounded-xl border transition-all " + escape(
    "bg-white/10 border-white/30 text-white",
    true
  )}">30</button> <button class="${"flex-1 py-2 rounded-xl border transition-all " + escape(
    "border-white/5 text-white/30 hover:border-white/10",
    true
  )}">60</button></div></div></div>  <div class="pt-6 border-t border-white/10">${`<div class="bg-red-500/20 border border-red-500/30 p-4 rounded-2xl mb-4 text-xs text-red-200" data-svelte-h="svelte-bcbege"><p class="font-bold mb-1">HandBrakeCLI missing!</p> <p>Please run <code>brew install handbrake</code> to enable
                        rendering.</p></div>`} <button ${!audioFile || !imageFile || isGenerating || true ? "disabled" : ""} class="w-full btn-glass group disabled:opacity-30 disabled:cursor-not-allowed">${`<div class="flex items-center justify-between w-full px-4"><span class="uppercase tracking-[0.2em] text-sm" data-svelte-h="svelte-1og6dhu">Create Video</span> <div class="bg-white/20 p-2 rounded-full group-hover:scale-125 transition-transform">${validate_component(Arrow_right, "ArrowRight").$$render($$result, { size: 20 }, {}, {})}</div></div>`}</button></div></div></div>  <div class="fixed bottom-6 left-6 z-[9999] pointer-events-none flex flex-col gap-1">${each(debugLogs, (log) => {
    return `<div class="bg-black/80 backdrop-blur-md text-[#00ff00] font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2">${escape(log)} </div>`;
  })} </div>`;
});
export {
  Page as default
};
