<script setup lang='ts'>
const props = defineProps({
    name: String,
    capital: String,
    population: Number,
    region: String,
    image: String,

})
const useCountry = `country-${props.name}`
const countryData = {
    name: props.name,
    capital: props.capital,
    population: props.population,
    region: props.region,
    image: props.image
}
</script>

<template>
    <div class="d-flex justify-center">
        <v-hover v-slot:default="{isHovering, props}">
            <v-card
                rounded="1"
                width="100%"
                style="max-width: 320px;"
                :elevation="isHovering ? 9 : 4"
                :class="{ 'on-hover': isHovering}"
                v-bind="props"
            >
                <NuxtLink
                    class="w-100"
                    :to="useCountry"
                >
                    <v-sheet elevation="2">
                        <v-img
                            width="100%"
                            :src="countryData.image"
                            height="170"
                            aspect-ration="16/9"
                            cover
                        />
                    </v-sheet>
                    <v-card-text class="cardBody d-flex flex-column">
                        <p class="font-weight-bold">{{ countryData.name }}</p>
                        <p> Population: {{ countryData.population }} </p>
                        <p>Region: {{ countryData.region }}</p>
                        <p>Capital: {{ countryData.capital }}</p>

                    </v-card-text>
                </NuxtLink>
            </v-card>
        </v-hover>
    </div>
</template>

<style scoped >
a {
    text-decoration: none;
}
</style>