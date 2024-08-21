import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react()],
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV),
		},
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./src/vitest.setup.ts",
		},
	};
});
