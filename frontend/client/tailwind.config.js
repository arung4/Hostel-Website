module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this matches your file structure
    './node_modules/shadcn-ui/**/*.{js,ts,jsx,tsx}', // Add shadcn-ui folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
