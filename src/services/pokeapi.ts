import { ref } from "vue"

export default class PokeAPI {
    pokemon = ref([])

    async fetchPokemon(q){
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`)
            const json = await response.json()
            console.log(json)
            this.pokemon.value = json
        }catch{
            this.pokemon.value = null
        }
    }
}