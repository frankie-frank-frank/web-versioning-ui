import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import CalendarModal from './components/CalendarModal.vue';

const routes = [
  { path: "/", component: CalendarModal },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
