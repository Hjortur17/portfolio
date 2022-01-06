<template>
    <Head>
        <title>{{ project.name }}</title>
    </Head>

    <header class="max-w-screen-md mx-auto justify-center text-center py-16 lg:py-24 xl:py-36">
        <h1 v-text="project.name" class="text-5xl mb-4"></h1>
        <p v-text="project.description" class="text-lg"></p>
    </header>

    <section class="max-w-screen-xl mx-auto flex items-center justify-between py-16">
        <div class="w-1/2">
            <h3 class="text-3xl mb-4">Problem</h3>
            <p v-text="project.problem" class="leading-relaxed"></p>
        </div>
        <img :src="project.problem_url" alt="" class="w-2/5 min-h-104 h-full max-h-104 object-center object-cover">
    </section>

    <section class="max-w-screen-xl mx-auto flex items-center justify-between py-16 lg:py-24 xl:py-24">
        <img :src="project.solution_url" alt="" class="w-2/5 min-h-104 h-full max-h-104 object-center object-cover">
        <div class="w-1/2">
            <h3 class="text-3xl mb-4">Solution</h3>
            <p v-text="project.solution" class="leading-relaxed"></p>

            <h4 class="text-lg pt-8 mb-4 uppercase">Tools</h4>
            <div class="grid grid-cols-6 gap-y-2.5">
                <div class="flex items-center text-light space-x-4 odd:col-start-1 odd:col-span-2 even:col-start-2 even:col-span-3 even:text-right" v-for="tool in project.tools">
                    <img :src="tool.tool_icon" class="w-8 h-8">
                    <p v-text="tool.title"></p>
                </div>
            </div>
        </div>
    </section>

    <section class="relative max-w-screen overflow-auto">
        <div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto" id="image-slider">
            <div class="snap-always first:snap-start last:snap-end snap-center shrink-0 first:pl-8 last:pr-8" v-for="image in project.images">
                <img class="shrink-0 w-96 h-80 object-cover object-center rounded-lg shadow-xl bg-white" :src="image.image_url">
            </div>
        </div>
    </section>
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
.min-h-104 {
    min-height: 28rem;
}

.max-h-104 {
    max-height: 28rem;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#image-slider::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#image-slider {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
