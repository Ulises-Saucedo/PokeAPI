import { ref } from "vue"

export default class PokeAPI {
    pokemonURL = ref([])
    pokemons = ref([])
    allPokemons = ref([])
    fetchedPokemons = ref([])

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

    async fetchAll(){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
        const json = await response.json()
        this.allPokemons.value = json.results
        for(let i = 0; i < this.allPokemons.value.length; i++){
            const response = await fetch(this.allPokemons.value[i].url)
            const json =  await response.json()
            this.allPokemons.value[i] = json 
        }
    }

    async fetchPokemons(q: string){
        this.fetchedPokemons.value = []
        await this.fetchAll()
        for(let i = 0; i < this.allPokemons.value.length; i++){
            if(this.allPokemons.value[i].name.includes(q)){
                this.fetchedPokemons.value.push(this.allPokemons.value[i])
            }
        }
    }
}