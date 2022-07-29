module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        theme: {
          base: "rgb(var(--ff-color-text) / <alpha-value>)",
          inverted: "rgb(var(--ff-color-fill) / <alpha-value>)",
          primary: "rgb(var(--ff-color-primary) / <alpha-value>)",
        },
        //
        black: "rgb(var(--ff-black) / <alpha-value>)",
        gray: "rgb(var(--ff-gray) / <alpha-value>)",
        "gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        green: "rgb(var(--ff-green) / <alpha-value>)",
        //
      },
      backgroundColor: {
        theme: {
          fill: "rgb(var(--ff-color-fill) / <alpha-value>)",
          primary: "rgb(var(--ff-color-primary) / <alpha-value>)",
          inverted: "rgb(var(--ff-color-text) / <alpha-value>)",
          button: "rgb(var(--ff-color-button) / <alpha-value>)",
        },
        //
        black: "rgb(var(--ff-black) / <alpha-value>)",
        gray: "rgb(var(--ff-gray) / <alpha-value>)",
        "gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        green: "rgb(var(--ff-green) / <alpha-value>)",
        //
      },
      ringColor: {
        theme: {
          primary: "rgb(var(--ff-color-primary) / <alpha-value>)",
        },
        //
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        //
      },
      borderColor: {
        theme: {
          base: "rgb(var(--ff-color-border) / <alpha-value>)",
        },
        //
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        "gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        //
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
