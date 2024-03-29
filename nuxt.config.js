export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'yogalibv2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vuelidate.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    // @nuxtjs/composition-api
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
          authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.VUE_APP_FIREBASE_APP_ID,
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
        },
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
