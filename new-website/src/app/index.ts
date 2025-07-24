import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./providers";
import { pinia } from "./providers";

export const app = createApp(App).use(pinia).use(router);
