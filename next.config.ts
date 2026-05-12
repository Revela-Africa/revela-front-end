import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['172.20.10.3', '192.168.0.4','192.168.0.2','192.168.0.3', '192.168.18.3'],
    devIndicators:false,
};

export default nextConfig;
