// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    css: ["vuetify/lib/styles/main.css", "@mdi/font/css/materialdesignicons.min.css"],
    modules:["@pinia/nuxt"],
    build:{
        transpile:["vuetify"]
    },
    vite:{
    },

})
