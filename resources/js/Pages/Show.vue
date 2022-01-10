<template>
    <Head>
        <title>{{ project.name }}</title>
    </Head>

    <header class="max-w-screen-md mx-auto justify-center text-center py-16 lg:py-24 xl:py-36 px-6 md:px-0">
        <div class="w-full justify-center flex items-center space-x-2 md:space-x-4 mb-4">
            <h1 v-text="project.name" class="text-4xl md:text-5xl"></h1>

            <a :href="project.path" target="_blank"
               class="bg-gray-300 hover:bg-gray-200 text-gray-700 hover:text-gray-500 duration-300 ease-in-out rounded-full w-10 h-10 p-2.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-full h-full">
                    <!-- Font Awesome Pro 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                    <path
                        d="M314.222 197.78c51.091 51.091 54.377 132.287 9.75 187.16-6.242 7.73-2.784 3.865-84.94 86.02-54.696 54.696-143.266 54.745-197.99 0-54.711-54.69-54.734-143.255 0-197.99 32.773-32.773 51.835-51.899 63.409-63.457 7.463-7.452 20.331-2.354 20.486 8.192a173.31 173.31 0 0 0 4.746 37.828c.966 4.029-.272 8.269-3.202 11.198L80.632 312.57c-32.755 32.775-32.887 85.892 0 118.8 32.775 32.755 85.892 32.887 118.8 0l75.19-75.2c32.718-32.725 32.777-86.013 0-118.79a83.722 83.722 0 0 0-22.814-16.229c-4.623-2.233-7.182-7.25-6.561-12.346 1.356-11.122 6.296-21.885 14.815-30.405l4.375-4.375c3.625-3.626 9.177-4.594 13.76-2.294 12.999 6.524 25.187 15.211 36.025 26.049zM470.958 41.04c-54.724-54.745-143.294-54.696-197.99 0-82.156 82.156-78.698 78.29-84.94 86.02-44.627 54.873-41.341 136.069 9.75 187.16 10.838 10.838 23.026 19.525 36.025 26.049 4.582 2.3 10.134 1.331 13.76-2.294l4.375-4.375c8.52-8.519 13.459-19.283 14.815-30.405.621-5.096-1.938-10.113-6.561-12.346a83.706 83.706 0 0 1-22.814-16.229c-32.777-32.777-32.718-86.065 0-118.79l75.19-75.2c32.908-32.887 86.025-32.755 118.8 0 32.887 32.908 32.755 86.025 0 118.8l-45.848 45.84c-2.93 2.929-4.168 7.169-3.202 11.198a173.31 173.31 0 0 1 4.746 37.828c.155 10.546 13.023 15.644 20.486 8.192 11.574-11.558 30.636-30.684 63.409-63.457 54.733-54.735 54.71-143.3-.001-197.991z"/>
                </svg>
            </a>
        </div>
        <p v-text="project.description" class="text-lg"></p>
    </header>

    <section class="max-w-screen-xl mx-auto flex items-start md:items-center justify-between flex-col md:flex-row py-16 px-6 md:px-0 space-y-8 md:space-y-0">
        <div class="w-full md:w-1/2">
            <h3 class="text-3xl mb-4">Problem</h3>
            <p v-text="project.problem" class="leading-relaxed"></p>
        </div>
        <img :src="project.problem_url" :alt="project.name + '- Problem'" class="w-full md:w-2/5 h-80 md:h-3/5 rounded-lg shadow-lg" />
    </section>

    <section class="max-w-screen-xl mx-auto flex items-start md:items-center justify-between flex-col-reverse md:flex-row py-16 lg:py-24 xl:py-24 px-6 md:px-0">
        <img :src="project.solution_url" :alt="project.name + '- Solution'" class="w-full md:w-2/5 h-80 md:h-3/5 rounded-lg shadow-lg mt-8 md:mt-0" />
        <div class="w-full md:w-1/2">
            <h3 class="text-3xl mb-4">Solution</h3>
            <p v-text="project.solution" class="leading-relaxed"></p>

            <h4 class="text-lg pt-8 mb-4 uppercase">Tools</h4>
            <div class="grid grid-cols-4 gap-y-2.5">
                <div class="col-span-2 md:col-span-1 flex items-center text-light space-x-4" v-for="tool in project.tools">
                    <img :src="tool.tool_icon" class="w-8 h-8">
                    <p v-text="tool.title"></p>
                </div>
            </div>
        </div>
    </section>

    <section class="relative max-w-screen overflow-auto">
        <div class="relative w-full flex gap-2 md:gap-6 snap-x snap-mandatory overflow-x-auto" id="image-slider">
            <div class="snap-always first:snap-start last:snap-end snap-center shrink-0 first:pl-6 last:pr-6 md:first:pl-16 md:last:pr-16 p-4 bg-transparent"
                 v-for="image in project.images">
                <img class="shrink-0 w-72 md:w-104 h-56 md:h-80 object-fit object-center shadow-lg rounded-lg"
                     :src="image.image_url">
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

.w-104 {
    width: 32rem;
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
