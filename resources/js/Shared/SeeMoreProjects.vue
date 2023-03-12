<template>
    <div
        class="w-full flex items-end justify-center mt-6 mb-12">
        <Link
            href="/projects"
            class="bg-neutral-200 bg-opacity-40 text-neutral-900 rounded-lg px-6 py-4 hover:bg-opacity-100 ease-in-out duration-200">
            See more projects
        </Link>
    </div>
</template>

<script>
export default {
    name: "SeeMoreProjects",

    props: ['button']
}
</script>

<style scoped>

</style>
