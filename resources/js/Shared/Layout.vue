<template>
    <nav class="max-w-screen-xl mx-auto flex items-center justify-between px-6 xl:px-0 pt-8 sm:pt-16">
        <Link href="/" class="link"><h1 class="w-full text-lg sm:text-xl font-medium">Hjörtur Freyr</h1></Link>


        <ul class="flex space-x-6">
            <li>
                <Link href="/about-me" class="link" v-text="'About me'" />
            </li>
            <li>
                <Link href="/projects" class="link" v-text="'Projects'" />
            </li>
            <li>
                <a href="mailto:hjorturfreyr@hjorturfreyr.com" class="text-gradiant" v-text="'Contact Me'" />
            </li>
            <li>
                <button @click="toggleDark()" class="bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 fill-current">
                        <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                        <path
                            d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z"/>
                    </svg>
                </button>
            </li>
        </ul>
    </nav>

    <slot></slot>

    <footer
        class="max-w-screen-xl mx-auto flex items-center justify-between px-6 xl:px-0 pb-8 xl:pb-16 pt-8 text-xs xl:text-base">
        <p>© {{ new Date().getFullYear() }} Hjörtur Freyr </p>

        <ul class="list-none flex space-x-4 xl:space-x-8">
            <li><a href="https://github.com/hjortur17" target="_blank" class="link">Github</a></li>
            <li><a href="https://dribbble.com/hjortur17" target="_blank" class="link">Dribbble</a></li>
            <li><a href="mailto:hjorturfreyr@hjorturfreyr.com" class="link">Contact Me</a></li>
        </ul>
    </footer>
</template>

<script setup>
import {useDark, useToggle} from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped>
input:checked ~ .dot {
    transform: translateX(120%);
    background-color: #48bb78;
}
</style>
