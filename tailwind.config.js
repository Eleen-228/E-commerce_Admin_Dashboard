/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			keyframes: {
				wave: {
					'0%': { transform: 'rotate(0)' },
					'15%': { transform: 'rotate(14deg)' },
					'30%': { transform: 'rotate(-8deg)' },
					'40%': { transform: 'rotate(14deg)' },
					'50%': { transform: 'rotate(-4deg)' },
					'60%': { transform: 'rotate(10.0deg)' },
					'70%': { transform: 'rotate(0.0deg)' },
					// reset for the last half to pause
					'100%': { transform: 'rotate(0.0deg)' },
				},
			},
			animation: {
				wavingHand: 'wave 2s linear infinite',
			},
		},
	},
	plugins: [],
}
