<template>
    <Head>
        <title>Freelance Web-Developer</title>
    </Head>

    <section
        class="h-screen md:h-auto flex flex-col items-center max-w-screen-md mx-auto justify-center text-center py-16 lg:py-24 px-6 md:px-0">
        <div class="w-full mx-auto pb-6">
            <img src="../../images/me.svg" class="w-40 h-40 mx-auto">
        </div>
        <h2 class="text-3xl md:text-4xl mb-3">Hello, this is me <span class="wave">👋</span></h2>
        <p>
            My name is Hjörtur Freyr, and I’m a 22-year-old computer science student at Reykjavík University. For a
            while, I have been building websites just for fun and learning new techniques in the meantime. My passion is
            creating clean and functional websites that can help people or businesses achieve their goals to reach
            further on the internet.
        </p>
    </section>

    <section class="max-w-screen-xl mx-auto px-6 md:px-0">
        <h3 class="text-xl mb-12">Chosen projects</h3>

        <div class="h-96 grid grid-cols-3 grid-flow-col gap-4">
            <Link :href="'/projects/' + project.slug"
                  class="col-span-3 md:col-span-1 hover:-mt-2 ease-in-out duration-300" v-for="project in projects">
                <div class="rounded-lg shadow-lg bg-lighter h-64 md:h-80 mb-4">
                    <img class="object-center w-full h-full rounded-lg" :src="project.image" :alt="project.name">
                </div>
                <span v-text="project.name" class="text-lg"></span>
            </Link>
        </div>
    </section>
</template>

<script>
export default {
    name: "Homepage",

    props: {
        projects: Object
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
