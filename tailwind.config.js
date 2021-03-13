const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js", "./elements/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        eigengrau: { 600: "#16161D" },
        main: colors.yellow,
        manger: colors.emerald,
        boire: colors.pink,
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
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
