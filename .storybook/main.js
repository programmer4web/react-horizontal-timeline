module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: (config) => {
    // Enable code splitting and lazy loading
    config.build = {
      ...config.build,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split each component into its own chunk
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('src/components/')) {
              const componentName = id.split('/components/')[1].split('/')[0];
              return `component-${componentName}`;
            }
          }
        }
      }
    };

    // Add PostCSS plugins for Tailwind CSS
    config.css = {
      ...config.css,
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    };

    return config;
  },
};