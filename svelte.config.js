import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            // default options are shown
            // pages: '/roster-management',
            // assets: '/roster-management',
            fallback: "app.html",
            // precompress: false

        }),
		paths:{
			assets:'',
			base:"/pravesh-ui"
		}
	}
};

export default config;
