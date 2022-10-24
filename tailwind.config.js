/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%': { transform: 'translateX(0)' },

                    '25%': {
                        transform: 'translateX(5px)',
                    },

                    '50%': {
                        transform: 'translateX(-5px)',
                    },

                    '75%': {
                        transform: 'translateX(5px)',
                    },

                    '100%': {
                        transform: 'translateX(0)',
                    },
                },
            },
        },
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [],
};
