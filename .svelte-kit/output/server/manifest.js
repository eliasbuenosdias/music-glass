export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DUw98ags.js",app:"_app/immutable/entry/app.cpBII2Ll.js",imports:["_app/immutable/entry/start.DUw98ags.js","_app/immutable/chunks/CZ32pkcU.js","_app/immutable/chunks/1_b86T0k.js","_app/immutable/entry/app.cpBII2Ll.js","_app/immutable/chunks/1_b86T0k.js","_app/immutable/chunks/DazXqebA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
