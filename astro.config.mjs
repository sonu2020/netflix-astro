import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

import icon from "astro-icon";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), icon()],
});