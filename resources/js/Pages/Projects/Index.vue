<template>
    <Head>
        <title>Projects I've worked on</title>
        <meta name="description" content="I have great passion for creating clean and functional websites that can help people or businesses achieve their goals to reach
            further on the internet.">
        <meta name="keywords"
              content="Freelancer, Freelance Web Developer, Web Developer, Web Development, Web Design, Full-Stack Developer, Front-end Developer, React, React Native, Laravel, VueJS">
    </Head>

    <header
        class="h-auto max-w-screen-xl overflow-hidden mx-auto py-16 px-6 xl:px-0 flex items-center space-x-12">
        <div class="w-full lg:w-2/5">
            <h2 class="text-2xl sm:text-3xl xl:text-4xl mb-3">Projects 🚀</h2>
            <p class="text-lg">Here are the projects I have worked on. Also some of my projects from school</p>
        </div>
    </header>

    <section class="max-w-screen-xl mx-auto px-6 xl:px-0">
        <div class="gap-12 columns-1 lg:columns-2">
            <div
                v-for="project in projects.slice().reverse()"
                class="py-4 md:py-6">
                <div class="py-4 md:py-6 hidden lg:[:nth-of-type(3)_&]:block min-h-[8rem]"></div>
                <div class="max-h-[35rem] hover:scale-[.99] ease-in-out duration-200 cursor-pointer flex flex-col rounded-lg shadow-lg overflow-hidden"
                     :class="findColor(project.feature_color)"
                     @click="$inertia.visit('projects/' + project.slug)"
                >
                    <div class="p-6">
                        <h3 class="text-lg font-light">{{ project.company }}</h3>
                        <h2 class="text-4xl">{{ project.title }}</h2>
                    </div>
                    <img :src="project.feature_image" alt="" class="w-full rounded-lg mx-24 mt-12">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps(['projects'])

const findColor = (color) => {
    if (color === "teal") {
        return 'bg-teal-500 text-teal-50'
    } else if (color === "red") {
        return 'bg-red-500 text-red-50'
    } else if (color === "orange") {
        return 'bg-orange-500 text-orange-50'
    } else if (color === "green") {
        return 'bg-green-500 text-green-50'
    }
}
</script>
