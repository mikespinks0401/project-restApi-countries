// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    ssr: false,
    css: ["vuetify/lib/styles/main.css", "@mdi/font/css/materialdesignicons.min.css"],
    modules:["@pinia/nuxt"],
    app:{
        baseURL: "https://mikespinks0401.github.io/project-restApi-countries/project-restApi-countries/"
    },
    build:{
        transpile:["vuetify"],
    },
})
