<script>
    export let title = "";
    let className = "";
    export { className as class };
</script>

<div
    class="glass-card flex flex-col items-center justify-center p-8 gap-4 relative group transition-all duration-500 overflow-hidden {className}"
>
    <div
        class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
    />
    <slot />
    {#if title}
        <div
            class="text-xs font-bold uppercase tracking-widest text-white/40 mt-2"
        >
            {title}
        </div>
    {/if}
</div>
