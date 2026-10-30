import babelConfig from "./babel.config.js";

export default {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      include: ["src/**/*.{js,jsx,mjs,ts,tsx}"],
      babelConfig,
      useLayers: true,
    },
  },
};
