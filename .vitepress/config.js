import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Standard Issue Research",
  description:
    "IS117-007 T-shirt research: four competitor sites, checkout walk-throughs, positions and personas.",
  // GitHub Pages serves this repo's site under /is117-tshirt-research/.
  base: "/is117-tshirt-research/",
  // The README is the home page, so GitHub and the website read the same file.
  rewrites: { "README.md": "index.md" },
  themeConfig: {
    outline: { level: 2, label: "On This Page" },
    socialLinks: [
      { icon: "github", link: "https://github.com/mnguyenht/is117-tshirt-research" },
    ],
  },
});
