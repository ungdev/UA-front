module.exports = {
  extends: ['plugin:@next/next/recommended'],
  poweredByHeader: false,
  async headers() {
    // Remove non production websites from search engines
    return process.env.ROBOTS_INDEX !== 'enabled'
      ? [
          {
            source: '/:path*{/}?',
            headers: [
              {
                key: 'X-Robots-Tag',
                value: 'noindex',
              },
            ],
          },
        ]
      : [];
  },
};
