<script>
	import "../app.css";
</script>

<div class="h-screen w-screen bg-slate-950 overflow-hidden relative">
	<!-- Dynamic background particles/gradient -->
	<div class="absolute inset-0 bg-gradient-dynamic opacity-80" />
	<div class="absolute inset-0 z-0">
		<div
			class="absolute top-1/4 left-1/4 w-[500px] h-[500px]
            bg-blue-600/10 rounded-full blur-[100px] animate-float"
		/>
		<div
			class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px]
            bg-purple-600/10 rounded-full blur-[120px] animate-float"
			style="animation-delay: -3s;"
		/>
	</div>

	<div class="flex flex-col h-full w-full relative z-10">
		<!-- Top Bar / Draggable Region -->
		<header
			data-tauri-drag-region
			class="h-16 flex-shrink-0 flex items-center bg-white/5 backdrop-blur-md border-b border-white/10 select-none relative"
		>
			<!-- Left side (macOS Controls Space) -->
			<div class="w-[84px] h-full flex-shrink-0"></div>

			<!-- Center: Creator Info (Absolute centered) -->
			<div
				class="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold pointer-events-none"
			>
				<span
					class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"
				></span>
				Creado por Elias Prieto
			</div>

			<!-- Right Side Actions -->
			<div class="ml-auto flex items-center gap-6 pr-8">
				<button
					on:click={async () => {
						const { open } = await import(
							"@tauri-apps/plugin-shell"
						);
						await open(
							"https://eliasbuenosdias.github.io/Elias-Porfolio/",
						);
					}}
					class="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all font-bold border-b border-transparent hover:border-white/20 pb-0.5"
				>
					Portfolio
				</button>

				<div class="h-4 w-[1px] bg-white/10"></div>

				<button
					on:click={async () => {
						const { open } = await import(
							"@tauri-apps/plugin-shell"
						);
						await open("mailto:dev-app@eliasp.simplelogin.com");
					}}
					class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-all border border-blue-500/20 bg-blue-500/5 px-4 py-2 rounded-full hover:bg-blue-500/10 active:scale-95"
				>
					dev-app@eliasp.simplelogin.com
				</button>
			</div>
		</header>

		<!-- Main Content Area -->
		<main
			class="flex-1 overflow-hidden p-6 flex flex-col justify-center items-center"
		>
			<slot />
		</main>
	</div>
</div>
