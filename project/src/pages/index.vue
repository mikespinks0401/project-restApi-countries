<script setup lang='ts'>
// const {[{name}]} = await $fetch("https://restcountries.com/v3.1/all")
const useCountries = ref<country[]>([])
const ogCountries = ref<country[]>([])
const filterString = ref("")
const loading = ref(true)
const useFilter = ref("")
onMounted(async () => {
    try {
        const countries: country[] = await $fetch("https://restcountries.com/v3.1/all")
        if (countries.length > 1) {
            ogCountries.value = countries
            useCountries.value = countries
        }
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
})

type flag = {
    png: string,
    svg: string,
    alt: string
}
type country = {
    name: {
        common: string
    },
    population: number,
    capital: string[],
    region: string,
    subregion: string,
    flags: flag,
}
const regions = [
    "Africa", "Americas", "Asia", "Europe", "Oceania"
]
//  style="width: 200px; mid-width: 200px; max-width: 200px;"
const goToCountry = (country: string) => {
    window.open(`/country-${country}`)
}

const filterCountries = () => {
    if (useFilter.value == "") {
        useCountries.value = ogCountries.value
        return
    }
    useCountries.value = ogCountries.value
    const filteredCountries = useCountries.value.filter(country => country.region === useFilter.value)
    useCountries.value = filteredCountries
}

const textFilter = () => {
    useCountries.value = ogCountries.value
    let filteredCountries
    if (useFilter.value != "") {
        filterCountries()
        filteredCountries = useCountries.value.filter(country => country.name.common.toLowerCase().startsWith(filterString.value.toLowerCase()))
    } else {
        filteredCountries = ogCountries.value.filter(country => country.name.common.toLowerCase().startsWith(filterString.value.toLowerCase()))
    }
    useCountries.value = filteredCountries
}

const clearFilter = () => {
    useFilter.value = ""
    useCountries.value = ogCountries.value
}
</script>

<template>
    <div>
        <v-container>
            <v-row class="">
                <v-col
                    cols=12
                    sm="2"
                    class="pt-0 py-0 pa-0"
                >
                    <v-text-field
                        @input="textFilter"
                        variant="plain"
                        label="Search"
                        v-model="filterString"
                    ></v-text-field>
                </v-col>
                <v-spacer />
                <v-col
                    cols=12
                    sm="2"
                >
                    <v-select
                        v-model="useFilter"
                        label="Filter By Region"
                        clearable
                        :items="regions"
                        :onUpdate:modelValue="filterCountries"
                        @click:clear="clearFilter"
                        variant="solo"
                    >

                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <template
                    v-for="(country, index) in useCountries"
                    :key="index"
                >
                    <v-col
                        cols="12"
                        sm="3"
                    >
                        <button
                            @click="goToCountry(country.name.common)"
                            class="w-100"
                        >
                            <CountryCard
                                :name="country.name.common"
                                :image="country.flags.svg"
                                :population="country.population"
                                :region="country.region"
                            />
                        </button>
                    </v-col>

                </template>
            </v-row>
        </v-container>
    </div>
</template>

<style>
a:hover {
    cursor: pointer;
}
</style>