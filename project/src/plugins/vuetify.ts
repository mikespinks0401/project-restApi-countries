import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import {md3} from "vuetify/blueprints"

export default defineNuxtPlugin (nuxtApp => {
    const vuetify = createVuetify({
        directives,
        components,
        blueprint: md3,
        aliases:{
            
        }
    })
    nuxtApp.vueApp.use(vuetify)
})