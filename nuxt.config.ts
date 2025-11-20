import { pt } from 'vuetify/locale'
import colors from 'vuetify/lib/util/colors.mjs'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-07',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Deltatec Integration',
      htmlAttrs: {
        lang: 'pt-br',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      duration: 300
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
      duration: 300
    },
  },

  devServer: {
    port: 3002,
    host: '0.0.0.0',
  },

  runtimeConfig: {
    // Variáveis públicas (acessíveis no cliente e servidor)
    public: {
      base_url_local: process.env.API_URL_LOCAL || '',
      base_url_external: process.env.API_URL_EXTERNAL || '',
      base_url_file_manager: process.env.API_FILE_MANAGER || '',
      base_url_web_socket: process.env.API_URL_WEB_SOCKET || '',
      automation_base_url: process.env.BASE_URL_AUTOMATION || '',
      version: process.env.APP_VERSION || 'current',
      key_weather: process.env.API_KEY_WEATHER || '',
      base_url_weather: process.env.BASE_URL_WEATHER || 'https://api.openweathermap.org'
    }
  },

  modules: [
    'dayjs-nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@nuxt/devtools',
    '@vee-validate/nuxt',
    'nuxt-tiptap-editor',
    'vuetify-nuxt-module',
  ],

  css: ['@/assets/style.css'],

  components: [
    '~/components',
    { path: '~/components/domain', prefix: '' },
  ],

  plugins: [
    { src: '~/plugins/highcharts.ts', mode: 'client' },
    { src: '~/plugins/vuecal.ts', mode: 'client' }
  ],

  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      },
      locale: {
        locale: 'pt',
        messages: { pt }
      },
      theme: {
        defaultTheme: 'dark',
        themes: {
          dark: {
            dark: true,
            colors: {
              primary: colors.blue.darken2,
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
              surface: colors.grey.darken4,
              'surface-bright': '#272727',
              'surface-light': '#272727',
              'surface-variant': colors.grey.darken3,
              'on-surface-variant': colors.grey.lighten3,
            }
          },
          light: {
            dark: false,
            colors: {
              primary: colors.blue.darken2,
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
              surface: colors.grey.lighten5,
              'surface-bright': colors.grey.lighten5,
              'surface-light': colors.grey.lighten3,
              'surface-variant': colors.grey.darken3,
              'on-surface-variant': colors.grey.lighten3,
            },
            variables: {
              'disabled-opacity': 0.60
            }
          },
        }
      },
    },
  },


  dayjs: {
    locales: ['pt-br'],
    plugins: ['relativeTime', 'utc', 'timezone', 'customParseFormat'],
    defaultLocale: 'pt-br',
    defaultTimezone: 'America/Sao_Paulo',
  },

  tiptap: {
    prefix: 'Tiptap',
  },

  fonts: {
    families: [
      {
        name: 'Poppins',
        display: 'swap',
        preload: true,
        provider: 'google',
      },
      {
        name: 'Space Mono',
        display: 'swap',
        provider: 'google',
        preload: true
      }
    ]
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    // Lazy loading por padrão
    loading: 'lazy'
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  imports: {
    dirs: [
      'composables',
      'composables/**',
    ],
  },

  sourcemap: true,
})

