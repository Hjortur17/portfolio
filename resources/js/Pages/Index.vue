<template>
    <section class="max-w-screen-md mx-auto justify-center text-center py-16 lg:py-24 xl:py-36">
        <div class="w-full mx-auto pb-6">
            <img src="../../images/me.svg" class="w-40 h-40 mx-auto">
        </div>
        <h2 class="text-4xl mb-3">Hello, this is me 👋</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur at blanditiis, cupiditate
            explicabo laboriosam, laudantium minus molestiae natus nisi, pariatur perferendis quaerat quas repudiandae
            sequi vero vitae voluptate voluptatibus.
        </p>
    </section>

    <section class="max-w-screen-xl mx-auto">
        <h3 class="text-xl mb-6">Chosen projects</h3>

        <div
            class="grid grid-rows-4 grid-cols-3 grid-flow-col gap-4">
            <div class="p-4 sm:p-12 rounded-lg shadow-lg bg-yellow-400 grid place-content-center row-start-1 row-span-2">
                01
            </div>
            <div class="p-4 sm:p-12 rounded-lg shadow-lg bg-yellow-400 grid place-content-center row-start-2 row-span-2">
                02
            </div>
            <div class="p-4 sm:p-12 rounded-lg shadow-lg bg-yellow-400 grid place-content-center row-start-1 row-span-2">
                03
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Homepage"
}
</script>
