
// SET BASE_URL with - NUXT_APP_BASE_URL=''
// SET CDN_URL with - NUXT_APP_CDN_URL='http://'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    css: ["vuetify/lib/styles/main.css", "@mdi/font/css/materialdesignicons.min.css"],
    modules:["@pinia/nuxt"],
    // routeRules:{
    //      "/static1/country/**": {ssr: false}
    // },
    build:{
        transpile:["vuetify"],
    },
})
