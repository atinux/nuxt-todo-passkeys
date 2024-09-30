export default defineNuxtConfig({
  compatibilityDate: '2024-09-30',
  future: { compatibilityVersion: 4 },
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint'
  ],
  auth: {
    webAuthn: true
  },
  hub: {
    database: true
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
  devtools: {
    enabled: true
  }
})
