<script setup lang="ts">
    import PokeAPI from '../services/pokeapi.ts'
    import { ref } from 'vue'
    import { useInfiniteScroll } from '@vueuse/core'

    const page = ref(0)
    const el = ref<HTMLElement | null>(null)
    const pokemons = new PokeAPI()
    const pokemon = ref(pokemons.pokemons)

    useInfiniteScroll(
        el,
        async () => {
            page.value++
            await pokemons.fetch(page.value)
        },
        { distance: 10 }
    )
</script>

<template>
    <main ref="el" class="h-screen overflow-y-auto p-[50px] flex flex-wrap justify-center gap-5">
        <div v-for="(item, i) in pokemon" :key="i" class="min-h-[200px] min-w-[150px] rounded shadow relative cursor-pointer">
            <img v-if="item.sprites.front_default" :src="item.sprites.front_default" class="mx-auto w-full transition ease-in-out delay-300 hover:scale-90">
            <img v-else src="https://d2h3d42vkj4fuu.cloudfront.net/1ba8606fc5bacee4f88bcd60440e4a2b">
            <p class="font-bold text-center">{{ item.name[0].toUpperCase() + item.name.slice(1,item.name.length) }}</p>
        </div>
    </main>
</template>