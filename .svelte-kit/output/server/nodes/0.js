

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BAXRmgB9.js","_app/immutable/chunks/CT-Wt29q.js","_app/immutable/chunks/D27Xdb6M.js"];
export const stylesheets = ["_app/immutable/assets/0.BziIAMUo.css"];
export const fonts = [];
