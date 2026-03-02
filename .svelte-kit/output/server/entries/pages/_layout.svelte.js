import { c as create_ssr_component } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="h-screen w-screen bg-slate-950 overflow-hidden relative"> <div class="absolute inset-0 bg-gradient-dynamic opacity-80"></div> <div class="absolute inset-0 z-0" data-svelte-h="svelte-p8xz8q"><div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-float"></div> <div class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-float" style="animation-delay: -3s;"></div></div>  <main class="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">${slots.default ? slots.default({}) : ``}</main></div>`;
});
export {
  Layout as default
};
