<script setup lang='ts'>
import { country as countryType } from "../types/countrytypes"

const loading = ref(true)
const error = ref<string | null>(null)
const useCountry = ref<countryType | null>(null)
const route = useRoute()
const countryName = route.params.country
const useLanguage = ref('')
const useCurrency = ref('')
const useNative = ref('')
const useBorders = ref([''])
onMounted(() => {
    let link = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    if (countryName.length < 4) {
        link = `https://restcountries.com/v3.1/alpha/${countryName}`
    }
    loadCountry(link)
})



const loadCountry = async (link: string) => {
    loading.value = true
    try {
        let [country] = await $fetch<countryType[]>(`${link}`)
        if (country) {
            useCountry.value = country

            console.log(useCountry.value)
            useBorders.value = useCountry.value.borders
            console.log(useBorders.value)

            //set native lanaguage
            useNative.value = Object.values(useCountry.value.name.nativeName)[0].official
            //set currency
            let { currencies } = useCountry.value
            useCurrency.value = Object.values(currencies)[0].name
            //set language
            let { languages } = useCountry.value
            useLanguage.value = Object.values(languages)[0] as string
        }
    } catch (e) {
        error.value = "Error Loading The Country.Please Try Again"
    } finally {
        loading.value = false
    }
}

const useCapital = computed(() => {
    if (useCountry.value === null) {
        return
    }
    let capitals = ""
    for (let ind in useCountry?.value.capital) {
        capitals += useCountry.value.capital[ind]
    }
    return capitals
})



const goBack = () => {
    let router = useRouter()
    router.back()
}

const makeLink = (code: string) => {
    return `/country-${code}`
}

</script>

<template>
    <div class="">
        <div class="d-flex justify-center">
            <div
                class="h-100 d-flex flex-column justify-center align-center"
                v-if="loading"
            >

                <p>LOading...</p>
            </div>
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
        </div>
        <v-container>

            <button
                @click="goBack"
                class="mb-4 "
            >
                <h5 class="text-h5 font-weight-bold">Back</h5>
            </button>
            <v-row
                height="500"
                class=""
                style="min-height:500px;"
            >
                <!-- {{ country?.flags }} -->
                <v-col cols="6">
                    <v-img
                        class="border"
                        height="500"
                        cover
                        :src="useCountry?.flags.svg"
                    >

                    </v-img>
                </v-col>
                <v-col
                    cols="6"
                    id="countryDescription"
                    class="px-4"
                    align-self="center"
                >
                    <div>
                        <v-row>
                            <h3 class="text-h3">{{ useCountry?.name.common }}</h3>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p>Native Name: {{ useNative }} </p>
                                <p>Population: {{ useCountry?.population }} </p>
                                <p>Region: {{ useCountry?.region }} </p>
                                <p>Subregion: {{ useCountry?.subregion }} </p>
                                <p>Captial: {{ useCapital }} </p>
                            </v-col>
                            <v-col>
                                <p>Curreny: {{ useCurrency }}</p>
                                <p>Language: {{ useLanguage }}</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h3 class="text-h3 mt-5 mb-2">Border Countries</h3>
                                <v-chip
                                    class="rounded-pill chip mx-1"
                                    v-for="border in useBorders"
                                >
                                    <Nuxt-link :to="makeLink(border)">

                                        {{ border }}
                                    </Nuxt-link>
                                </v-chip>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<style>
#countryDescription {
    line-height: 2.1;
}



.chip a{
    font-weight: bold;
    color: inherit;
    text-decoration: none;
}

.rounded-pill:hover{
    color: white;
}


.chip:hover {
    cursor: pointer;
    background-color: black;
    color: white;
}
</style>