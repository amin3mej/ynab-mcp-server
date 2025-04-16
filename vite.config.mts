import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			exclude: ["**/node_modules/**", "**/index.ts, ", "vite.config.mts"],
			thresholds: {
				100: true,
			},
		},
		globals: true,
		restoreMocks: true,
	},
	plugins: [tsconfigPaths()],
});
