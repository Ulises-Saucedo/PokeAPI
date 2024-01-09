<script setup lang="ts">
    const props = defineProps({
        pokemons: Array
    })
</script>

<template>
    <main class="min-h-screen p-[50px] flex flex-wrap justify-center gap-5">
        <div v-for="(item, i) in props.pokemons" :key="i" class="h-[200px] w-[150px] rounded shadow relative cursor-pointer">
            <img v-if="item.sprites.front_default" :src="item.sprites.front_default" class="mx-auto w-full transition ease-in-out delay-300 hover:scale-90">
            <img v-else src="https://d2h3d42vkj4fuu.cloudfront.net/1ba8606fc5bacee4f88bcd60440e4a2b" class="mx-auto w-full transition ease-in-out delay-300 hover:scale-90">
            <p class="font-bold text-center">{{ item.name[0].toUpperCase() + item.name.slice(1,item.name.length) }}</p>
        </div>
    </main>
</template>