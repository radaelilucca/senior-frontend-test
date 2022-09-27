/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		extend: {
			fontFamily: {
				proximaNova: ["ProximaNova", "serif"],
			},
			colors: {
				primary: {
					darkBlue: "#313E4F",
					lightGray: "#E8EDF3",
					gray: "#989EA7",
				},
				accent: {
					blue: "#33A6BA",
					red: "#FF7B92",
					yellow: "#FFC062",
				},
				background: {
					white: "#FFFFFF",
				},
			},
			boxShadow: {
				card: "0px 10px 15px -5px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05);",
			},
		},
	},
	plugins: [],
};
