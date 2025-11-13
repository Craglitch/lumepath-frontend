import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(), 
      tailwindcss(),
  ],
  server: {
	  host: "0.0.0.0", // Ini untuk hosting
	  allowedHosts: true, //  ngrok URL ahh jangan letak url guna * so semua boleh masuk
	  port: 5173, //  default vite port tiada perubahan

	  //yang jangan sentuh nanti aku gigit kau
	  proxy: {
         	"/api": {
			changeOrigin: true,
		target: "http://localhost:3000",
				secure: false,
		},
	  },
  },
},
)
