import { useAuthStore } from "@/stores/auth";
import CheckFlightView from "@/views/CheckFlightView.vue";
import DashboardView from "@/views/DashboardView.vue";
import FlightUpdationFormView from "@/views/FlightUpdationFormView.vue";
import FlightUpdationView from "@/views/FlightUpdationView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import SectorView from "@/views/SectorView.vue";
import UnauthorizedView from "@/views/UnauthorizedView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard",
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/login", component: LoginView, meta: { guest: true } },
    {
      path: "/flight-updation",
      component: FlightUpdationFormView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/flight-updation/update",
      component: FlightUpdationView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/check-flight",
      component: CheckFlightView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/sector",
      component: SectorView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/unauthorized",
      component: UnauthorizedView,
    },
    
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return "/login";
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    return "/";
  }
});

export default router;
