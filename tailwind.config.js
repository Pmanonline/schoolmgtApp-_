// /** @type {import('tailwindcss').Config} */

// module.exports = {
// content: [
//   "./**/*.{js,ts,jsx,tsx,mdx}",
//   "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   "./src/**/*.{js,ts,jsx,tsx,mdx}",
// ],

//   theme: {
//     extend: {
// colors: {
//   main: "#1BB6CB",
//   transparent: "transparent",
//   current: "currentColor",
//   ash: "#f5f5f5",
//   white: "#ffffff",
//   lightash: "#838282",
//   midnightash: "#323131",
//   purple: "#b845ff",
//   purple2: "#7402BA",
//   contactustext: "#000000",
//   borderLight: "#A1A1A1",
//   dark: "#000000",
//   blue: "#3D3DE6",
// },
// screens: {
//   sm: "640px",
//   // => @media (min-width: 640px) { ... }
//   md: "768px",
//   // => @media (min-width: 768px) { ... }
//   lg: "1024px",
//   // => @media (min-width: 1024px) { ... }
//   xl: "1280px",
//   // => @media (min-width: 1280px) { ... }
//   "2xl": "1536px",
//   // // => @media (min-width: 1536px) { ... }
//   mod: { max: "639px" },
//   minlg: { max: "1023px" },
//   mid: { max: "767px" },
//   contQ1: { max: "980px" },
//   nonLG: { max: "1024px" },

//   // => @media (min-width: 0px and max-width: 639px) { ... }
// },
//     },
//   },
//   plugins: [],
// };

// tailwind.config.js

module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1BB6CB",
        transparent: "transparent",
        current: "currentColor",
        ash: "#f5f5f5",
        white: "#ffffff",
        lightash: "#838282",
        midnightash: "#323131",
        purple: "#b845ff",
        purple2: "#7402BA",
        contactustext: "#000000",
        borderLight: "#A1A1A1",
        dark: "#000000",
        blue: "#3D3DE6",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // // => @media (min-width: 1536px) { ... }
        mod: { max: "639px" },
        minlg: { max: "1023px" },
        mid: { max: "767px" },
        contQ1: { max: "980px" },
        nonLG: { max: "1024px" },

        // => @media (min-width: 0px and max-width: 639px) { ... }
      },
    },
  },
};
