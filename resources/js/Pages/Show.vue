<template>
    <header class="max-w-screen-xl mx-auto flex py-32 items-center">
        <div class="flex-1 pr-16">
            <h1 v-text="project.name" class="text-4xl mb-4"></h1>
            <p v-text="project.description"></p>

            <h4 class="text-lg uppercase mt-16">Tools</h4>
        </div>
        <img src="https://images.unsplash.com/photo-1640798482111-525aadfa461b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="" class="w-2/5">
    </header>
</template>

<script>
export default {
    name: "Show",
    props: {
        project: Object
    },
}
</script>

<style scoped>

</style>
