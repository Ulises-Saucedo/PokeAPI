<script setup lang="ts">
    import { ref } from 'vue'
    import Header from './components/Header.vue'
    import fetchMounted from './components/fetchMounted.vue'
    import fetchPokemon from './components/fetchPokemon.vue'
    import PokeAPI from './services/pokeapi.ts'

    const pokemons = new PokeAPI()
    const allPokemons = ref(pokemons.fetchedPokemons)

    const searchPokemon = async (q: string) =>{
        await pokemons.fetchPokemons(q)
    }
</script>

<template>
    <Header @fetchPokemons="searchPokemon"/>
    <Suspense>
        <template #default>
            <fetchMounted v-if="allPokemons.length === 0" />
            <fetchPokemon v-else :pokemons="allPokemons"/>
        </template>
        <template #fallback>
            <p>Cargando...</p>
        </template>
    </Suspense>
</template>