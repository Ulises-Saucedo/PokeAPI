<script setup lang="ts">
    import { ref } from 'vue'

    const emits = defineEmits(['fetchPokemons'])

    const search = ref('')
    const searchPokemon = async () =>{
        emits('fetchPokemons', search.value)
    }
</script>

<template>
    <div class="navbar bg-[#c92a47]">
        <div class="navbar-start">
        </div>
        <div class="navbar-end gap-2">
            <form class="form-control" @submit.prevent="searchPokemon">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" v-model="search"/>
            </form>
        </div>
    </div>
</template>