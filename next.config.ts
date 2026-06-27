
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/stats/:match*',
        destination: 'http://3.144.237.139:3000/:match*'
      }
    ];
  }
};

export default nextConfig;