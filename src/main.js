import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, instance, info) => {
  console.error("GLOBAL ERROR:", err);
  console.error("COMPONENT:", instance);
  console.error("INFO:", info);
};

app.mount('#app')
