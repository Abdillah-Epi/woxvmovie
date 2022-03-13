import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), EnvironmentPlugin(["VITE_API_URL", "VITE_CLIENT_ID", "VITE_CLIENT_SECRET"])]
});
