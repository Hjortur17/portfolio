import {createApp, h} from 'vue'
import {createInertiaApp, Head, Link, router} from '@inertiajs/vue3'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from "./Shared/Layout";

AOS.init({
    duration: 500,
    once: true,
    easing: 'ease-in-out'
});

createInertiaApp({
    progress: {
        color: '#DB2777',
    },
    resolve: name => {
        let page = require(`./Pages/${name}`).default;

        page.layout ??= Layout;

        return page;
    },

    setup({el, App, props, plugin}) {
        createApp({render: () => h(App, props)})
            .use(plugin)
            .component('Link', Link)
            .component('Head', Head)
            .mount(el)
    },

    title: title => `Hjörtur Freyr / ${title}`
})
