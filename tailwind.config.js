/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        qBlack: "#24272A",
        qGreen: "#74C947",
        qDarkGreen: "#65B13D",
        qBlue: "#00A0DF",
        qDarkerBlue: "#0281b3",
        qLightGray: "#F6F6F6",
        qGray: "#BBBCBD",
        qRed: "#C94F47",
        qDarkBlue: "#24272A",
      },
      backgroundImage: {
        loginBg: "url('./src/assets/images/login/bg_login.png')",
      },
    },
  },
  plugins: [],
}
