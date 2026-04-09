/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                trading: {
                    dark: '#0a0e17',
                    blue: '#1e3a8a',
                    green: '#10b981',
                    light: '#f3f4f6',
                    accent: '#3b82f6',
                }
            }
        },
    },
    plugins: [],
}
