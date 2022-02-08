<template>
    <nav class="max-w-screen-xl mx-auto flex items-center justify-between px-6 xl:px-0 pt-8 sm:pt-16">
        <Link href="/" class="link"><h1 class="w-full text-lg sm:text-xl font-medium">Hjörtur Freyr</h1></Link>
    </nav>

    <slot></slot>

    <footer class="max-w-screen-xl mx-auto flex items-center justify-between px-6 xl:px-0 pb-8 xl:pb-16 pt-8 xl:pt-32 text-xs xl:text-base">
        <p>© {{ new Date().getFullYear() }} Hjörtur Freyr </p>

        <ul class="list-none flex space-x-4 xl:space-x-8">
            <li><a href="https://github.com/hjortur17" target="_blank" class="link">Github</a></li>
            <li><a href="https://dribbble.com/hjortur17" target="_blank" class="link">Dribbble</a></li>
            <li><a href="mailto:hjorturfreyr@hjorturfreyr.com" class="link">Contact Me</a></li>
        </ul>
    </footer>
</template>

<script>
    export default {}
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(120%);
  background-color: #48bb78;
}
</style>
