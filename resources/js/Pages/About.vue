<template>
    <Head>
        <title>About me</title>
        <meta name="description" content="I have great passion for creating clean and functional websites that can help people or businesses achieve their goals to reach
            further on the internet.">
        <meta name="keywords"
              content="Freelancer, Freelance Web Developer, Web Developer, Web Development, Web Design, Full-Stack Developer, Front-end Developer, React, React Native, Laravel, VueJS">
    </Head>

    <header
        class="h-auto max-w-screen-xl overflow-hidden mx-auto py-56 sm:py-16 xl:py-16 px-6 xl:px-0 flex items-center space-x-12">
        <div class="w-3/5 space-y-2">
            <h2 class="text-2xl sm:text-3xl xl:text-4xl mb-4">A little bit more about myself</h2>
            <p class="2xl:text-lg">
                My name is Hjörtur Freyr and I'm from Iceland. I’m a {{ new Date().getFullYear() - 1999 }}-year-old
                computer science student at Reykjavík University but I will be graduating this summer.
                For a while, I have been building websites just for fun and learning new techniques in the meantime. My
                passion is creating clean and functional websites that can help people or businesses achieve their goals
                to reach
                further on the internet.
            </p>
            <p class="2xl:text-lg">
                For development, I like to use Laravel for the backend and Vue for the frontend. But I have also worked
                at projects using ReactJS, ReactNative, .NET or Wordpress. Every framework has there pros and cons but I
                always fall back to Laravel and Vue simply because I started making websites using
                Laravel 5.0 and Vue2 so I'm most familiar with those frameworks
            </p>
            <p class="2xl:text-lg">
                For design, I like to use Figma. It allows me to visualize the project and add animations to see how the
                real thing should look like. Also Figma is very handy when working with other people, we can share the
                documents and I can get feedback on what needs to fixed or changed. I learn to design websites and
                mobile app by getting inspiration on Dribbble and by reading Refactoring UI by Adam Wathan and Steve
                Schoger the creators of TailwindCSS (the CSS framework I use for all my projects)
            </p>
        </div>
        <div class="w-2/5 xl:min-h-[70vh] 2xl:min-h-[50vh] rounded-xl jedi dark:sith relative group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                 class="group-hover:opacity-100 opacity-0 ease-in-out duration-200  text-red-600 fill-current absolute right-0 top-0 w-10 h-10 m-5"
                 v-if="isDark">
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                    d="M0 32l69.71 118.75-58.86-11.52 69.84 91.03a146.741 146.741 0 0 0 0 51.45l-69.84 91.03 58.86-11.52L0 480l118.75-69.71-11.52 58.86 91.03-69.84c17.02 3.04 34.47 3.04 51.48 0l91.03 69.84-11.52-58.86L448 480l-69.71-118.78 58.86 11.52-69.84-91.03c3.03-17.01 3.04-34.44 0-51.45l69.84-91.03-58.86 11.52L448 32l-118.75 69.71 11.52-58.9-91.06 69.87c-8.5-1.52-17.1-2.29-25.71-2.29s-17.21.78-25.71 2.29l-91.06-69.87 11.52 58.9L0 32zm224 99.78c31.8 0 63.6 12.12 87.85 36.37 48.5 48.5 48.49 127.21 0 175.7s-127.2 48.46-175.7-.03c-48.5-48.5-48.49-127.21 0-175.7 24.24-24.25 56.05-36.34 87.85-36.34zm0 36.66c-22.42 0-44.83 8.52-61.92 25.61-34.18 34.18-34.19 89.68 0 123.87s89.65 34.18 123.84 0c34.18-34.18 34.19-89.68 0-123.87-17.09-17.09-39.5-25.61-61.92-25.61z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                 class="group-hover:opacity-100 opacity-0 ease-in-out duration-200 text-blue-600 fill-current absolute top-0 right-0 w-10 h-10 m-5"
                 v-else>
                <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                <path
                    d="M398.5 373.6c95.9-122.1 17.2-233.1 17.2-233.1 45.4 85.8-41.4 170.5-41.4 170.5 105-171.5-60.5-271.5-60.5-271.5 96.9 72.7-10.1 190.7-10.1 190.7 85.8 158.4-68.6 230.1-68.6 230.1s-.4-16.9-2.2-85.7c4.3 4.5 34.5 36.2 34.5 36.2l-24.2-47.4 62.6-9.1-62.6-9.1 20.2-55.5-31.4 45.9c-2.2-87.7-7.8-305.1-7.9-306.9v-2.4 1-1 2.4c0 1-5.6 219-7.9 306.9l-31.4-45.9 20.2 55.5-62.6 9.1 62.6 9.1-24.2 47.4 34.5-36.2c-1.8 68.8-2.2 85.7-2.2 85.7s-154.4-71.7-68.6-230.1c0 0-107-118.1-10.1-190.7 0 0-165.5 99.9-60.5 271.5 0 0-86.8-84.8-41.4-170.5 0 0-78.7 111 17.2 233.1 0 0-26.2-16.1-49.4-77.7 0 0 16.9 183.3 222 185.7h4.1c205-2.4 222-185.7 222-185.7-23.6 61.5-49.9 77.7-49.9 77.7z"/>
            </svg>
        </div>
    </header>

    <section class="max-w-screen-xl mx-auto px-6 xl:px-0 space-y-12">
        <div class="grid grid-cols-3 gap-4">
            <h2 class="text-2xl col-span-4">My technical stack:</h2>
            <div>
                <h3 class="font-bold uppercase">Front-end 👓</h3>
                <p>VueJS</p>
                <p>React</p>
                <p>Angular</p>
                <p>Typescript</p>
                <p>Sass</p>
                <p>NextJs</p>
                <p>NodeJs</p>
            </div>
            <div>
                <h3 class="font-bold uppercase">Backend ⚙️</h3>
                <p>Laravel</p>
                <p>.NET 6</p>
                <p>Docker</p>
            </div>
            <div>
                <h3 class="font-bold uppercase">Design 🎨</h3>
                <p>Figma</p>
                <p>Sketch</p>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <h2 class="text-2xl col-span-4">Other things about me:</h2>
            <div>
                <h3 class="font-bold uppercase">Currently watching 🍿</h3>
                <p>The Mandalorian</p>
            </div>
            <div>
                <h3 class="font-bold uppercase">Currently playing 🎮</h3>
                <p>God of War: Ragnarök</p>
            </div>
            <div>
                <h3 class="font-bold uppercase">Favorite TV-show 🌟</h3>
                <p>The Office - US</p>
            </div>
            <div>
                <h3 class="font-bold uppercase">Favorite City 🌆</h3>
                <p>Sydney - AU</p>
            </div>
        </div>

        <ContactMe/>
    </section>
</template>

<script setup>
import {useDark} from "@vueuse/core";
import ContactMe from "../Shared/ContactMe";

const isDark = useDark();
</script>
