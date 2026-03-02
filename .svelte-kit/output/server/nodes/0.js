

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Dk_yEFNK.js","_app/immutable/chunks/1_b86T0k.js","_app/immutable/chunks/DazXqebA.js"];
export const stylesheets = ["_app/immutable/assets/0.BjlU_-yp.css"];
export const fonts = [];
