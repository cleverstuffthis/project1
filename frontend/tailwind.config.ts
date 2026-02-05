import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0a0a0f"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
