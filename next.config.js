module.exports = {
    apps : [{
      name: "ailens-fashion",
      script: "./dist/main.js",
      cwd: "/ailens-fashion",
      watch: true,
      env: {
        NODE_ENV: "production",
      }
    }],
    compress: true,
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
          ],
        },
      ];
    },
  };
  