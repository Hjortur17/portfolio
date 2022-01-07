<template>
    <Head>
        <title>Freelance Web-Developer</title>
    </Head>

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
        <h3 class="text-xl mb-12">Chosen projects</h3>

        <div class="h-96 grid grid-cols-3 grid-flow-col gap-4">
            <Link :href="'/projects/' + project.slug" class="even:mt-16 hover:-mt-2 even:hover:mt-12 ease-in-out duration-300" v-for="project in projects">
                <div class="rounded-lg shadow-lg bg-lighter h-80 mb-4 py-8 px-16">
                    <img class="object-center w-full h-full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAn1BMVEX////x8fHl5eXi4uL7+/vo6OjV1dX39/f09PTt7e3v7+/hsWfSbm7j4+Pq6uqbxX3RaWngrmCYxHjc3Nz3+fzv2NrcmZnaj4zourvz8Ofmy5vlv4jpzqjz8u7d6ta006HO4sLQYl/gqqqSwXLI27feoKDp2sLt49Pz6uro1bnirlyxz5f08fXkyMnQZ2Xit3XR3ce20KTVe3rr4NeiyYbkfHaLAAACeUlEQVR4nO3YXXPSQBhA4Q0xkA0hfLW0FVusVFHEYtX//9vcVOqMvci5hJHz5OLdZG92zuQmCVmuTlkYBXUaheqNOlUhvnoySNefeVicuxiawbPnNq2LdD3Pl8W5a14SXS6urtt583b57jbNi7vV6v0RD3Y6mlCUyeCynkzuP9yW2XA63S7Tk7vZbLZ+KFUWociS8uOkrutJVX7aDofD6aYsV7PxeDzbZSpCL6uqqly0iR4/7760ibabbPe1TbTetZt//XPz+vZ/3cx6YVTFGKtv95P68aqKzTS9RPsmVt/XqdDTLp69ahTy2DRNjNc/6kUvNnGz3y9/phkffo2fmnbvzMU85IdVMUo9iqIpbg57aa0kJSrUKQ/zoqcOxTz0j32GU9cP8746zUMWjv2deNpSoOzY/2NOnYmQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkImQiZCJkIlQFvJjH+HU5aHM1an8DWpZfV1dzFjZAAAAAElFTkSuQmCC" alt="">
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
