<script setup lang='ts'>
const props = defineProps({
    name: String,
    capital: String,
    population: Number,
    region: String,
    image: String,

})
</script>

<template>
    <div class="d-flex justify-center">

        <v-card
            rounded="1"
            width="100%"
            style="max-width: 320px;"
        >
            <v-img
                width="100%"
                :src="props.image"
                height="170"
                aspect-ration="16/9"
                cover
            />
            <v-card-text class="d-flex flex-column">
                <p class="font-weight-bold">{{ props.name }}</p>
                <p> Population: {{ props.population }} </p>
                <p>Region: {{ props.region }}</p>
                <p>Capital: {{ props.capital }}</p>

            </v-card-text>
        </v-card>
    </div>
</template>