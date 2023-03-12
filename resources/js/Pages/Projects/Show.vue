<template>
    <Head>
        <title>{{ project.title }} ({{ project.company }})</title>
        <meta name="description" :content=project.overview>
        <meta name="keywords"
              content="Freelancer, Freelance Web Developer, Web Developer, Web Development, Web Design, Full-Stack Developer, Front-end Developer, React, React Native, Laravel, VueJS">
    </Head>

    <header class="max-w-screen-xl mx-auto grid grid-cols-1 gap-4 px-6 xl:px-0 py-56 sm:py-16 xl:py-16">
        <div class="col-span-1">
            <h4 class="text-lg mb-3">{{ project.company }} - <a
                :href="project.company_url" class="link">{{ project.company_url }}</a>
            </h4>
            <h1 class="text-2xl sm:text-3xl xl:text-5xl mb-3">{{ project.title }}</h1>
        </div>
        <div class="grid grid-cols-2 gap-12">
            <div class="col-span-1">
                <h3 class="text-3xl mb-2">Overview</h3>
                <p v-text="project.overview"/>
            </div>
            <div class="col-span-1">
                <h3 class="text-3xl mb-2">Roles</h3>
                <ul class="space-y-1" v-for="role in project.roles">
                    <li v-text="role"/>
                </ul>
            </div>
        </div>
    </header>

    <section class="max-w-screen-xl mx-auto space-y-24">
        <img :alt="'Project: ' + project.title" :src="project.images[0]" class="rounded-xl"/>

        <div class="text-neutral-900 bg-neutral-100 rounded-xl h-96 items-center p-8 mx-auto flex space-x-12">
            <div class="w-1/2">
                <h3 class="text-4xl mb-2">Technical stack</h3>
                <p>
                    Here you can see what programming language/frameworks was used for this project along with other
                    technology.
                </p>
            </div>
            <div class="w-1/2 relative py-12">
                <div class="overflow-x-scroll carousel flex space-x-6">
                    <div class="flex-none max-w-[22rem] bg-white rounded-lg p-8 space-y-2"
                         v-for="framework in project.technical_stack">
                        <img :alt="framework.title" :src="'/images/svgs/' + framework.svg + '.svg'"
                             class="w-8 h-8 mb-2"/>
                        <h2 class="text-xl" v-text="framework.title"/>
                        <p class="text-sm" v-text="framework.description"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full space-y-12">
            <div class="w-1/2 mx-auto">
                <h3 class="text-4xl mb-2">Color palette</h3>
                <p v-text="project.colors.description"/>
            </div>
            <div class="grid grid-cols-10 gap-4">
                <div class="space-y-2" :class="customColSpan ? 'col-span-10' : ''"
                     v-for="color in project.colors.main">
                    <div class="h-24 w-full rounded" :style="'background-color: ' + color"/>
                    <p class="text-xs text-center">{{ color }}</p>
                </div>
                <div class="space-y-2" v-for="color in project.colors.second" v-if="project.colors.second">
                    <div class="h-24 w-full rounded" :style="'background-color: ' + color"/>
                    <p class="text-xs text-center">{{ color }}</p>
                </div>
                <div class="space-y-2" v-for="color in project.colors.third" v-if="project.colors.third">
                    <div class="h-24 w-full rounded" :style="'background-color: ' + color"/>
                    <p class="text-xs text-center">{{ color }}</p>
                </div>
                <div class="space-y-2" v-for="color in project.colors.neutral">
                    <div class="h-24 w-full rounded" :style="'background-color: ' + color"/>
                    <p class="text-xs text-center">{{ color }}</p>
                </div>
            </div>
        </div>

        <img :alt="'Project: ' + project.title" :src="project.images[1]" class="rounded-xl" v-if="project.images[1]"/>

        <div class="w-1/2 mx-auto">
            <h3 class="text-4xl mb-2">Summary</h3>
            <p class="mb-12" v-text="project.summary"/>

            <SeeMoreProjects button="true"/>
        </div>
    </section>

    <section class="max-w-screen-xl mx-auto px-6 xl:px-0">
        <ContactMe/>
    </section>
</template>

<script setup>
import {useDark} from "@vueuse/core";
import SeeMoreProjects from "../../Shared/SeeMoreProjects";
import ContactMe from "../../Shared/ContactMe";
import {onMounted, ref} from "vue";

const isDark = useDark();

const props = defineProps(['project'])

const customColSpan = ref(false)

onMounted(() => {
    console.log(props.project.colors.main.length)

    if (props.project.colors.main.length === 1) {
        customColSpan.value = true
    }
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.carousel::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.carousel {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
