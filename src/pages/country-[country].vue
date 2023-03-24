<script setup lang='ts'>
import { country as countryType } from "../types/countrytypes"

const loading = ref(true)
const error = ref<string | null>(null)
const useCountry = ref<countryType | null>(null)
const route = useRoute()
const countryName = route.params.country

onMounted(() => {
    loadCountry()
})

const loadCountry = async () => {
    loading.value = true
    try {
        const [country] = await $fetch<countryType[]>(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        if (country) {
            useCountry.value = country
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


const useTopLevelDomains = computed(() => {
    if (useCountry.value === null) {
        return
    }
    let domains = ""
    for (let ind in useCountry?.value.topLevelDomain) {
        domains += useCountry.value.topLevelDomain[ind]
    }
    return domains
})

const useNativeName: string = (() => {
    if (useCountry.value === null) {
        return
    }
    const nativeName = Object.values(useCountry.value?.name.nativeName)[0].official
    return nativeName
})()

const goBack = () => {
    let router = useRouter()
    router.back()
}

</script>

<template>
    <div class="">
        <div class="d-flex justify-center">
            <div class="h-100 d-flex flex-column justify-center align-center" v-if="loading">

                <p>LOading...</p>
            </div>
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
        </div>
        <v-container>

            <button @click="goBack" class="mb-4 "><h5 class="text-h5 font-weight-bold">Back</h5></button>
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
                                <p>Native Name:{{ useNativeName }} </p>
                                <p>Population:{{ useCountry?.population }} </p>
                                <p>Region:{{ useCountry?.region }} </p>
                                <p>Subregion:{{ useCountry?.subregion }} </p>
                                <p>Captial:{{ useCapital }} </p>
                            </v-col>
                            <v-col>
                                <p>Top Level Domains: {{ useTopLevelDomains }}</p>
                                <p>Curreny:</p>
                                <p>Language:</p>
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
</style>