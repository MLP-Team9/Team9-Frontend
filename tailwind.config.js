/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        'pretendard-thin': ['Pretendard-Thin', 'sans-serif'],
        'pretendard-extralight': ['Pretendard-ExtraLight', 'sans-serif'],
        'pretendard-light': ['Pretendard-Light', 'sans-serif'],
        'pretendard-regular': ['Pretendard-Regular', 'sans-serif'],
        'pretendard-medium': ['Pretendard-Medium', 'sans-serif'],
        'pretendard-semibold': ['Pretendard-SemiBold', 'sans-serif'],
        'pretendard-bold': ['Pretendard-Bold', 'sans-serif'],
        'pretendard-extrabold': ['Pretendard-ExtraBold', 'sans-serif'],
        'pretendard-black': ['Pretendard-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

