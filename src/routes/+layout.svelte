<script>
	import '../app.css';
</script>

<div class="h-screen w-screen bg-slate-950 overflow-hidden relative">
	<!-- Dynamic background particles/gradient -->
	<div class="absolute inset-0 bg-gradient-dynamic opacity-80" />
	<div class="absolute inset-0 z-0">
		<div
			class="absolute top-1/4 left-1/4 w-[500px] h-[500px] 
            bg-blue-600/10 rounded-full blur-[100px] animate-float" />
		<div
			class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] 
            bg-purple-600/10 rounded-full blur-[120px] animate-float"
			style="animation-delay: -3s;" />
	</div>

	<!-- Main Content Area -->
	<main class="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">
		<slot />
	</main>
</div>
