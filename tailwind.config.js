const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./elements/**/*.js"],
  theme: {
    screens: {
      xs: "540px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        eigengrau: { 600: "#16161D" },
        overlayg1: { 600: "#00000098" },
        overlayg2: { 600: "#FFFFFF24" },
        brand: { 600: "#DD5037" },
        manger: colors.emerald,
        boire: colors.pink,
      },
      width: {
        "9/10": "96%",
      },
      height: {
        "9/10": "97%",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.50"),
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.white") },
            h3: { color: theme("colors.white") },
            h4: { color: theme("colors.white") },
          },
        },
      }),
      animation: {
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
