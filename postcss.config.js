// postcss.config.js
const glob = require("glob");
const path = require("path");
const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano")({
  preset: "default",
});

const PATHS = {
  src: path.join(__dirname, "src"),
};

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
  // Include any special characters being used in your css
  defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("postcss-preset-env"),
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : []),
  ],
};
