import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import { Directive, DirectiveBinding, VNode } from 'vue';

const themes = {
    colors: {
        primary100: "#CE1212",
        primary200: "#690505",
        secondary100: "#F7DF70",
        success: "#43E323",
        error: "#DC2F02",
        lightGrey100: "#d9d9d9"
    }
}

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "themes",
        themes: {
            themes
        }
    }
})

export const colors = () => {
    return vuetify.theme.themes.value
}

// Animated scroll fixed  
export const appear: Directive = {
    beforeMount(element: HTMLElement) {
        element.style.visibility = 'hidden';
    },
    updated(element: HTMLElement,
        binding: DirectiveBinding<boolean>,
        node: VNode) {
        if (!binding.value === !binding.oldValue
            || null === node.transition) {
            return;
        }
        if (!binding.value) {
            node.transition.leave(element, () => {
                element.style.visibility = 'hidden';
            });
            return;
        }
        node.transition.beforeEnter(element);
        element.style.visibility = '';
        node.transition.enter(element);
    }
};


createApp(App).use(createPinia()).directive('appear', appear).use(vuetify).use(router).mount('#app')
