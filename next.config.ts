
module.exports = {
  async headers() {
      return [
          {
              source: '/api/:path*',
              headers: [
                  { key: 'Access-Control-Allow-Origin', value: 'http://localhost:5173', },
                  { key: 'Access-Control-Allow-Origin', value: 'http://127.0.0.1:5500', },
                  { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                  { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
              ],
          },
      ];
  },
};
