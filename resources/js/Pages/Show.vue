<template>
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
            <div class="grid grid-cols-3 gap-4 font-mono text-white text-sm text-center font-bold leading-6">
                <div class="p-4 rounded-lg shadow-lg bg-indigo-500 col-start-1 col-span-2">04</div>
                <div class="p-4 rounded-lg shadow-lg bg-indigo-500 col-start-2 col-span-3">07</div>
                <div class="p-4 rounded-lg shadow-lg bg-indigo-500 col-start-1 col-span-2">04</div>
            </div>
        </div>
    </section>

    <section class="relative max-w-screen overflow-auto">
        <div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14" id="image-slider">
            <div class="snap-always snap-start shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
            </div>
            <div class="snap-always snap-end shrink-0 first:pl-8 last:pr-8">
                <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white"
                     src="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
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
