# Netlify Deployment Guide

## Issue: "Your publish directory cannot be the same as the base directory"

This error occurs when Netlify's UI has the "Publish directory" set to the repository root, which conflicts with the Next.js plugin.

## Solution

### Step 1: Clear the Publish Directory in Netlify UI

1. Go to your Netlify dashboard
2. Navigate to your site
3. Go to **Site settings** > **Build & deploy** > **Build settings**
4. Find the **Publish directory** field
5. **Clear/delete the value** (leave it completely empty)
6. Click **Save**

The `@netlify/plugin-nextjs` plugin will automatically handle the publish directory - you should NOT set it manually in the UI.

### Step 2: Verify Build Settings

Make sure your build settings match:
- **Build command**: `npm run build`
- **Publish directory**: (leave empty)
- **Node version**: 20 (specified in `.nvmrc`)

### Step 3: Redeploy

After clearing the publish directory, trigger a new deployment:
- Push a new commit, OR
- Go to **Deploys** tab and click **Trigger deploy** > **Clear cache and deploy site**

## Alternative: If the plugin still causes issues

If you continue to have issues, you can try using static export:

1. Update `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};
```

2. Update `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
```

3. Remove the plugin from `package.json` and `netlify.toml`

Note: Static export has limitations - no API routes, no server-side features, and images are unoptimized.

## Current Configuration

The project is configured to use `@netlify/plugin-nextjs` which provides full Next.js App Router support with server-side rendering capabilities.

