// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    ssr: false,
    css: ["vuetify/lib/styles/main.css", "@mdi/font/css/materialdesignicons.min.css"],
    modules:["@pinia/nuxt"],
    build:{
        transpile:["vuetify"],
    },
    vite:{
        appType:"spa",
        base:'/project-restApi-countries/',
        build:{
            
        },
        vue:{
            
        } 
    },

})
