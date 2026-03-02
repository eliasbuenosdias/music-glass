

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.C8n4o1_s.js","_app/immutable/chunks/1_b86T0k.js","_app/immutable/chunks/DazXqebA.js"];
export const stylesheets = ["_app/immutable/assets/2.DAX0a0HU.css"];
export const fonts = [];
