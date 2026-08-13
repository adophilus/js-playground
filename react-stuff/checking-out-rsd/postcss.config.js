import babelConfig from "./babel.config.cjs";

export default {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      include: ["src/**/*.{js,jsx,mjs,tx,tsx}"],
      babelConfig,
      useLayers: true,
    },
    autoprefixer: {},
  },
};
