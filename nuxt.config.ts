export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint'
  ],
  devtools: {
    enabled: true
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-09-30',
  hub: {
    database: true,
    kv: true
  },
  auth: {
    webAuthn: true
  },
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  icon: {
    clientBundle: {
      scan: true
    }
  }
})
