<template>
    <Head>
        <title>Freelance Web-Developer</title>
        <meta name="description" content="I have great passion for creating clean and functional websites that can help people or businesses achieve their goals to reach
            further on the internet.">
        <meta name="keywords"
              content="Freelancer, Freelance Web Developer, Web Developer, Web Development, Web Design, Full-Stack Developer, Front-end Developer, React, React Native, Laravel, VueJS">
    </Head>

    <header
        class="h-auto max-w-screen-xl mx-auto py-16 px-6 xl:px-0 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-12"
        data-aos="fade-up">
        <div class="w-full lg:w-3/5">
            <h2 class="mb-3">Hi there, I’m Hjörtur Freyr <span class="wave">👋</span>
            </h2>
            <h1>Freelance UX/UI Designer & <span
                class="text-gradiant">full-stack</span>
                developer
            </h1>
        </div>
        <div
            class="w-full lg:w-2/5 min-h-[55vh] lg:min-h-[70vh] 2xl:min-h-[50vh] rounded-xl jedi dark:sith relative group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                 class="group-hover:opacity-100 opacity-0 ease-in-out duration-200 text-red-600 fill-current absolute top-0 right-0 w-8 h-8 lg:w-10 lg:h-10 m-3 lg:m-5"
                 v-if="isDark">
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                    d="M0 32l69.71 118.75-58.86-11.52 69.84 91.03a146.741 146.741 0 0 0 0 51.45l-69.84 91.03 58.86-11.52L0 480l118.75-69.71-11.52 58.86 91.03-69.84c17.02 3.04 34.47 3.04 51.48 0l91.03 69.84-11.52-58.86L448 480l-69.71-118.78 58.86 11.52-69.84-91.03c3.03-17.01 3.04-34.44 0-51.45l69.84-91.03-58.86 11.52L448 32l-118.75 69.71 11.52-58.9-91.06 69.87c-8.5-1.52-17.1-2.29-25.71-2.29s-17.21.78-25.71 2.29l-91.06-69.87 11.52 58.9L0 32zm224 99.78c31.8 0 63.6 12.12 87.85 36.37 48.5 48.5 48.49 127.21 0 175.7s-127.2 48.46-175.7-.03c-48.5-48.5-48.49-127.21 0-175.7 24.24-24.25 56.05-36.34 87.85-36.34zm0 36.66c-22.42 0-44.83 8.52-61.92 25.61-34.18 34.18-34.19 89.68 0 123.87s89.65 34.18 123.84 0c34.18-34.18 34.19-89.68 0-123.87-17.09-17.09-39.5-25.61-61.92-25.61z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                 class="group-hover:opacity-100 opacity-0 ease-in-out duration-200 text-blue-600 fill-current absolute top-0 right-0 w-8 h-8 lg:w-10 lg:h-10 m-3 lg:m-5"
                 v-else>
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                    d="M398.5 373.6c95.9-122.1 17.2-233.1 17.2-233.1 45.4 85.8-41.4 170.5-41.4 170.5 105-171.5-60.5-271.5-60.5-271.5 96.9 72.7-10.1 190.7-10.1 190.7 85.8 158.4-68.6 230.1-68.6 230.1s-.4-16.9-2.2-85.7c4.3 4.5 34.5 36.2 34.5 36.2l-24.2-47.4 62.6-9.1-62.6-9.1 20.2-55.5-31.4 45.9c-2.2-87.7-7.8-305.1-7.9-306.9v-2.4 1-1 2.4c0 1-5.6 219-7.9 306.9l-31.4-45.9 20.2 55.5-62.6 9.1 62.6 9.1-24.2 47.4 34.5-36.2c-1.8 68.8-2.2 85.7-2.2 85.7s-154.4-71.7-68.6-230.1c0 0-107-118.1-10.1-190.7 0 0-165.5 99.9-60.5 271.5 0 0-86.8-84.8-41.4-170.5 0 0-78.7 111 17.2 233.1 0 0-26.2-16.1-49.4-77.7 0 0 16.9 183.3 222 185.7h4.1c205-2.4 222-185.7 222-185.7-23.6 61.5-49.9 77.7-49.9 77.7z"/>
            </svg>
        </div>
    </header>

    <section class="max-w-screen-xl mx-auto px-6 xl:px-0">
        <div class="gap-12 grid grid-cols-1 lg:grid-cols-2 mb-16" id="trigger-grid-animation">
            <div
                v-for="project in projects.slice().reverse()"
                class="col-span-1 lg:last:mt-16"
                data-aos-anchor="#trigger-grid-animation"
                data-aos="fade-grid"
            >
                <div
                    class="max-h-[35rem] cursor-pointer hover:scale-[.99] ease-in-out duration-200 flex flex-col rounded-lg shadow-lg overflow-hidden"
                    :class="findColor(project.feature_color)"
                    @click="$inertia.visit('projects/' + project.slug)"
                >
                    <div class="p-6">
                        <p class="font-medium text-lg">{{ project.company }}</p>
                        <h2>{{ project.title }}</h2>
                    </div>
                    <img :src="project.feature_image" alt="" class="w-full rounded-lg mx-24 mt-12">
                </div>
            </div>
        </div>

        <SeeMoreProjects button="true"/>
        <ContactMe />
    </section>
</template>

<script setup>
import {useDark} from "@vueuse/core";
import SeeMoreProjects from "../Shared/SeeMoreProjects";
import ContactMe from "../Shared/ContactMe";

const isDark = useDark();

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

<style scoped>
.wave {
    animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
    animation-duration: 2.5s; /* Change to speed up or slow down */
    animation-iteration-count: 3; /* Never stop waving :) */
    transform-origin: 70% 70%; /* Pivot around the bottom-left palm */
    display: inline-block;
}

@keyframes wave-animation {
    0% {
        transform: rotate(0.0deg)
    }
    10% {
        transform: rotate(14.0deg)
    }
    /* The following five values can be played with to make the waving more or less extreme */
    20% {
        transform: rotate(-8.0deg)
    }
    30% {
        transform: rotate(14.0deg)
    }
    40% {
        transform: rotate(-4.0deg)
    }
    50% {
        transform: rotate(10.0deg)
    }
    60% {
        transform: rotate(0.0deg)
    }
    /* Reset for the last half to pause */
    100% {
        transform: rotate(0.0deg)
    }
}
</style>
