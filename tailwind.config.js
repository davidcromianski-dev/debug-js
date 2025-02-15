import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './slides/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'via-red-900',
        'via-stone-900',
        'via-green-900',
        'via-blue-900',
        'via-orange-900',
        'via-yellow-900',
        'via-rose-900',
        'via-violet-900',
        'via-navyblue-900',
        'via-bluesky-900',
        'via-emerald-900',
        'via-londonblue-900',
        'via-ixcblue-900',
    ],
    theme: {
        extend: {
            colors: {
                default: 'rgba(var(--vg-color-ixcgray-500))',
                primary: 'rgba(var(--vg-color-ixcblue))',
                secondary: 'rgba(var(--vg-color-emerald))',
                danger: 'rgba(var(--vg-color-red))',
                success: 'rgba(var(--vg-color-green))',
                warning: 'rgba(var(--vg-color-yellow))',
                info: 'rgba(var(--vg-color-blue))',
                neutral: 'rgba(var(--vg-color-ixcgray))',
                red: {
                    DEFAULT: 'rgba(var(--vg-color-red))',
                    100: 'rgba(var(--vg-color-red-100))',
                    200: 'rgba(var(--vg-color-red-200))',
                    300: 'rgba(var(--vg-color-red-300))',
                    400: 'rgba(var(--vg-color-red-400))',
                    500: 'rgba(var(--vg-color-red-500))',
                    600: 'rgba(var(--vg-color-red-600))',
                    700: 'rgba(var(--vg-color-red-700))',
                    800: 'rgba(var(--vg-color-red-800))',
                    900: 'rgba(var(--vg-color-red-900))',
                },
                green: {
                    DEFAULT: 'rgba(var(--vg-color-green))',
                    100: 'rgba(var(--vg-color-green-100))',
                    200: 'rgba(var(--vg-color-green-200))',
                    300: 'rgba(var(--vg-color-green-300))',
                    400: 'rgba(var(--vg-color-green-400))',
                    500: 'rgba(var(--vg-color-green-500))',
                    600: 'rgba(var(--vg-color-green-600))',
                    700: 'rgba(var(--vg-color-green-700))',
                    800: 'rgba(var(--vg-color-green-800))',
                    900: 'rgba(var(--vg-color-green-900))',
                },
                yellow: {
                    DEFAULT: 'rgba(var(--vg-color-yellow))',
                    100: 'rgba(var(--vg-color-yellow-100))',
                    200: 'rgba(var(--vg-color-yellow-200))',
                    300: 'rgba(var(--vg-color-yellow-300))',
                    400: 'rgba(var(--vg-color-yellow-400))',
                    500: 'rgba(var(--vg-color-yellow-500))',
                    600: 'rgba(var(--vg-color-yellow-600))',
                    700: 'rgba(var(--vg-color-yellow-700))',
                    800: 'rgba(var(--vg-color-yellow-800))',
                    900: 'rgba(var(--vg-color-yellow-900))',
                },
                blue: {
                    DEFAULT: 'rgba(var(--vg-color-blue))',
                    100: 'rgba(var(--vg-color-blue-100))',
                    200: 'rgba(var(--vg-color-blue-200))',
                    300: 'rgba(var(--vg-color-blue-300))',
                    400: 'rgba(var(--vg-color-blue-400))',
                    500: 'rgba(var(--vg-color-blue-500))',
                    600: 'rgba(var(--vg-color-blue-600))',
                    700: 'rgba(var(--vg-color-blue-700))',
                    800: 'rgba(var(--vg-color-blue-800))',
                    900: 'rgba(var(--vg-color-blue-900))',
                },
                ixcblue: {
                    DEFAULT: 'rgba(var(--vg-color-ixcblue))',
                    100: 'rgba(var(--vg-color-ixcblue-100))',
                    200: 'rgba(var(--vg-color-ixcblue-200))',
                    300: 'rgba(var(--vg-color-ixcblue-300))',
                    400: 'rgba(var(--vg-color-ixcblue-400))',
                    500: 'rgba(var(--vg-color-ixcblue-500))',
                    600: 'rgba(var(--vg-color-ixcblue-600))',
                    700: 'rgba(var(--vg-color-ixcblue-700))',
                    800: 'rgba(var(--vg-color-ixcblue-800))',
                    900: 'rgba(var(--vg-color-ixcblue-900))',
                },
                londonblue: {
                    DEFAULT: 'rgba(var(--vg-color-londonblue))',
                    100: 'rgba(var(--vg-color-londonblue-100))',
                    200: 'rgba(var(--vg-color-londonblue-200))',
                    300: 'rgba(var(--vg-color-londonblue-300))',
                    400: 'rgba(var(--vg-color-londonblue-400))',
                    500: 'rgba(var(--vg-color-londonblue-500))',
                    600: 'rgba(var(--vg-color-londonblue-600))',
                    700: 'rgba(var(--vg-color-londonblue-700))',
                    800: 'rgba(var(--vg-color-londonblue-800))',
                    900: 'rgba(var(--vg-color-londonblue-900))',
                },
                ixcgray: {
                    DEFAULT: 'rgba(var(--vg-color-ixcgray))',
                    100: 'rgba(var(--vg-color-ixcgray-100))',
                    200: 'rgba(var(--vg-color-ixcgray-200))',
                    300: 'rgba(var(--vg-color-ixcgray-300))',
                    400: 'rgba(var(--vg-color-ixcgray-400))',
                    500: 'rgba(var(--vg-color-ixcgray-500))',
                    600: 'rgba(var(--vg-color-ixcgray-600))',
                    700: 'rgba(var(--vg-color-ixcgray-700))',
                    800: 'rgba(var(--vg-color-ixcgray-800))',
                    900: 'rgba(var(--vg-color-ixcgray-900))',
                },
                silver: {
                    DEFAULT: 'rgba(var(--vg-color-silver))',
                    100: 'rgba(var(--vg-color-silver-100))',
                    200: 'rgba(var(--vg-color-silver-200))',
                    300: 'rgba(var(--vg-color-silver-300))',
                    400: 'rgba(var(--vg-color-silver-400))',
                    500: 'rgba(var(--vg-color-silver-500))',
                    600: 'rgba(var(--vg-color-silver-600))',
                    700: 'rgba(var(--vg-color-silver-700))',
                    800: 'rgba(var(--vg-color-silver-800))',
                    900: 'rgba(var(--vg-color-silver-900))',
                },
                violet: {
                    DEFAULT: 'rgba(var(--vg-color-violet))',
                    100: 'rgba(var(--vg-color-violet-100))',
                    200: 'rgba(var(--vg-color-violet-200))',
                    300: 'rgba(var(--vg-color-violet-300))',
                    400: 'rgba(var(--vg-color-violet-400))',
                    500: 'rgba(var(--vg-color-violet-500))',
                    600: 'rgba(var(--vg-color-violet-600))',
                    700: 'rgba(var(--vg-color-violet-700))',
                    800: 'rgba(var(--vg-color-violet-800))',
                    900: 'rgba(var(--vg-color-violet-900))',
                },
                emerald: {
                    DEFAULT: 'rgba(var(--vg-color-emerald))',
                    100: 'rgba(var(--vg-color-emerald-100))',
                    200: 'rgba(var(--vg-color-emerald-200))',
                    300: 'rgba(var(--vg-color-emerald-300))',
                    400: 'rgba(var(--vg-color-emerald-400))',
                    500: 'rgba(var(--vg-color-emerald-500))',
                    600: 'rgba(var(--vg-color-emerald-600))',
                    700: 'rgba(var(--vg-color-emerald-700))',
                    800: 'rgba(var(--vg-color-emerald-800))',
                    900: 'rgba(var(--vg-color-emerald-900))',
                },
                navyblue: {
                    DEFAULT: 'rgba(var(--vg-color-navyblue))',
                    100: 'rgba(var(--vg-color-navyblue-100))',
                    200: 'rgba(var(--vg-color-navyblue-200))',
                    300: 'rgba(var(--vg-color-navyblue-300))',
                    400: 'rgba(var(--vg-color-navyblue-400))',
                    500: 'rgba(var(--vg-color-navyblue-500))',
                    600: 'rgba(var(--vg-color-navyblue-600))',
                    700: 'rgba(var(--vg-color-navyblue-700))',
                    800: 'rgba(var(--vg-color-navyblue-800))',
                    900: 'rgba(var(--vg-color-navyblue-900))',
                },
                orange: {
                    DEFAULT: 'rgba(var(--vg-color-orange))',
                    100: 'rgba(var(--vg-color-orange-100))',
                    200: 'rgba(var(--vg-color-orange-200))',
                    300: 'rgba(var(--vg-color-orange-300))',
                    400: 'rgba(var(--vg-color-orange-400))',
                    500: 'rgba(var(--vg-color-orange-500))',
                    600: 'rgba(var(--vg-color-orange-600))',
                    700: 'rgba(var(--vg-color-orange-700))',
                    800: 'rgba(var(--vg-color-orange-800))',
                    900: 'rgba(var(--vg-color-orange-900))',
                },
                bluesky: {
                    DEFAULT: 'rgba(var(--vg-color-bluesky))',
                    100: 'rgba(var(--vg-color-bluesky-100))',
                    200: 'rgba(var(--vg-color-bluesky-200))',
                    300: 'rgba(var(--vg-color-bluesky-300))',
                    400: 'rgba(var(--vg-color-bluesky-400))',
                    500: 'rgba(var(--vg-color-bluesky-500))',
                    600: 'rgba(var(--vg-color-bluesky-600))',
                    700: 'rgba(var(--vg-color-bluesky-700))',
                    800: 'rgba(var(--vg-color-bluesky-800))',
                    900: 'rgba(var(--vg-color-bluesky-900))',
                },
                // rose: '#f43f5e',
                rose: {
                    DEFAULT: '#f43f5e',
                    100: '#ffb7c4',
                    200: '#ff9ea9',
                    300: '#ff8490',
                    400: '#ff6b77',
                    500: '#f43f5e',
                    600: '#d23b55',
                    700: '#ab2d44',
                    800: '#8d283d',
                    900: '#6b1f32',
                }
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
}
