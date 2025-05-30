/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Handle node: protocol imports and provide proper fallbacks
  webpack: (config, { isServer }) => {
    // Apply transformations only for client-side bundles
    if (!isServer) {
      // Resolve node: protocol imports and handle polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:buffer': require.resolve('buffer/'),
        'node:stream': require.resolve('stream-browserify'),
        'node:util': require.resolve('util/'),
        'node:path': require.resolve('path-browserify'),
        'node:crypto': require.resolve('crypto-browserify'),
        'node:http': require.resolve('stream-http'),
        'node:https': require.resolve('https-browserify'),
        'node:zlib': require.resolve('browserify-zlib'),
        'node:assert': require.resolve('assert/'),
      };
      
      // Provide fallbacks for Node.js built-in modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
        fs: false,
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        assert: require.resolve('assert/'),
        util: require.resolve('util/'),
      };
      
      // Add plugins to provide globals
      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
        new webpack.NormalModuleReplacementPlugin(
          /^(node:)/,
          (resource) => {
            const mod = resource.request.replace(/^node:/, '');
            resource.request = mod;
          }
        ),
      ];
    }
    
    return config;
  },
};

module.exports = nextConfig
