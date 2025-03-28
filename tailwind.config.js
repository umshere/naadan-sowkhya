/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		height: {
  			'screen-dynamic': '100dvh'
  		},
  		screens: {
  			xs: '480px'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding'
  		},
  		willChange: {
  			scroll: 'scroll-position',
  			transform: 'transform'
  		},
  		colors: {
  			primary: {
  				light: '#e8f4ea',
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#1a4d2e',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: {
  				DEFAULT: '#a3b899',
  				light: '#e9f0e4'
  			},
  			cream: '#FAF8F5',
  			earth: {
  				terracotta: '#c87941',
  				brown: '#664e33',
  				khaki: '#bfb58f'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			card: '0.75rem',
  			btn: '0.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  			'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
  			'bottom-nav': '0 -2px 10px rgba(0, 0, 0, 0.05)',
  			btn: '0 2px 4px rgba(0, 0, 0, 0.1)',
  			'btn-hover': '0 4px 8px rgba(0, 0, 0, 0.1)'
  		},
  		animation: {
  			'slide-up': 'slideUp 0.3s ease-out forwards',
  			'slide-down': 'slideDown 0.3s ease-out forwards',
  			'fade-in': 'fadeIn 0.3s ease-out forwards',
  			'fade-out': 'fadeOut 0.3s ease-out forwards'
  		},
  		keyframes: {
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: 1
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-20px)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: 1
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: 1
  				},
  				'100%': {
  					opacity: 0
  				}
  			}
  		},
  		spacing: {
  			'safe-bottom': 'env(safe-area-inset-bottom, 16px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
