import pkg from './package'
import sanityClient from './sanityClient'

const routesQuery = `
  {
    "sessions": *[_type == "session"],
    "speakers": *[_type == "person" && defined(slug.current)]
  }
`

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
    //link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [{ src: 'normalize.css' }],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/eventInformation',
    { src: '~/plugins/vue-select', mode: 'client' },
    { src: '~/plugins/html2canvas.js', mode: 'client' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/pwa'],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAopTvaR4jDmxmuHkBYr9iIfxTviBIlmag',
          authDomain: 'behind-themask.firebaseapp.com',
          databaseURL:
            'https://behind-themask-default-rtdb.europe-west1.firebasedatabase.app',
          projectId: 'behind-themask',
          storageBucket: 'behind-themask.appspot.com',
          messagingSenderId: '530034600999',
          appId: '1:530034600999:web:83ab77e1f79f3f4b1b7202'
        },
        services: {
          firestore: true // Just as example. Can be any other service.
        }
      }
    ]
  ],

  /*
   ** Set global info from sanity document
   */
  eventInformation: () => {
    return sanityClient.fetch('*[_id == "eventInformation"]').then(res => res)
  },

  /*
   ** Generate dynamic routes from data from sanity.
   ** Used only for generating static served HTML files
   */
  generate: {
    routes: () => {
      return sanityClient.fetch(routesQuery).then(res => {
        return [
          ...res.sessions.map(item => `/sessions/${item._id}`),
          ...res.speakers.map(item => `/speakers/${item.slug.current}`)
        ]
      })
    }
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
          stage: 3,
          features: {
            'color-mod-function': { unresolved: 'warn' },
            'nesting-rules': true,
            'custom-media-queries': {
              preserve: false
            },
            'custom-properties': {
              preserve: false
            }
          }
        }
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
