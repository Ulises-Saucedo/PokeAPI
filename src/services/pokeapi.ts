import { ref } from "vue"

export default class PokeAPI {
    pokemonURL = ref([])
    pokemons = ref([])
    total_pokemons = ref(0)

    async fetchData(page: number){
        try{
            const pagination = ((page - 1) * 20)
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pagination}`)
            const json = await response.json()
            this.pokemonURL.value = [...this.pokemonURL.value, ...json.results]
        }catch{
            this.pokemonURL.value = null
        }
    }

    async fetch(page: number){
        const paginate = ((page - 1) * 20)
        await this.fetchData(page)
        for(let i = paginate; i < this.pokemonURL.value.length; i++){
            const response = await fetch(this.pokemonURL.value[i].url)
            const json = await response.json()
            this.pokemons.value = [...this.pokemons.value, json]
        }
    }
}