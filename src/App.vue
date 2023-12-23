<template>
    <section class="searchbar">
        <input type="text" v-model="search">
        <button @click="searchPokemon(search)">Search</button>
    </section>
    <main v-if="fetched">
        <section v-if="pokemon != null">
            <div>{{ pokemon.name }}</div>
            <div v-for="(p, i) in pokemon.stats" :key="i">
                <p>{{ p.stat.name }}: <span>{{ p.base_stat }}</span></p>
            </div>
        </section>
        <section v-else>
            <h2>Pokemon no encontrado</h2>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import PokeAPI from './services/pokeapi.ts'

    const poke = new PokeAPI();
    const pokemon = poke.pokemon;
    const search = ref('')
    const fetched = ref(false)

    const searchPokemon = async (q: string) =>{
        const variable = q.toLowerCase()
        await poke.fetchPokemon(variable)
        fetched.value = true
    }
</script>

<style scoped>
    main{
        margin-top: 15px;
        width: 300px;
        color: #FFFFFF;
        font-size: 20px;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 700;
    }
    section div p{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    input{
        width: 75%;
        padding: 5px 0;
        outline: none;
        border: none;
        border-radius: 5px;
    }
    button{
        width: 20%;
        padding: 5px 0;
        border: none;
        border-radius: 5px;
        background: #3C3C3C;
        cursor: pointer;
        color: #ffffff;
    }
    .searchbar{
        display: flex;
        justify-content: space-between;
    }
</style>