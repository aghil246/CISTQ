import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Next.js 16 blocks cross-origin requests to dev-only resources by default.
  // When the app is opened through a non-localhost hostname (LAN/public IP, a
  // tunnel, etc.) the client JS chunks under /_next/* return 403, so the page
  // renders from SSR but never hydrates — menus, the theme toggle, tabs and the
  // cart all stay unresponsive. List the hostnames used to reach the dev server.
  // Hostnames only (no scheme, no port). Development only; production is unaffected.
  allowedDevOrigins: [
    "79.137.207.223", // public IP (shown as the "Network" URL)
    "172.16.0.2", // private/LAN IP
  ],
}

export default nextConfig
