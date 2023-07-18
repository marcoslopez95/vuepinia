import { isAutenticated } from "@/helper";
import { createRouter, createWebHistory } from "vue-router";
import admin from './admin'
import user from './user'

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: [
    {
      name: "Home",
      path: "/home",
      component: () =>
        import("@/views/HomeView.vue"),
    },
    {
      path: "/auth",
      redirect: "/login",
      component: () => import("@/layouts/auth/authLayout.vue"),
      children: [
        {
          name: "Login",
          path: "/login",
          component: () =>
            import("@/views/auth/Login.vue"),
        },
        {
          name: "Register",
          path: "/register",
          component: () =>
            import("@/views/auth/Register.vue"),
        },
        {
          name: "Unauthorized",
          path: "/unauthorized",
          component: () =>
            import("@/views/auth/Unauthorized.vue"),
        },
      ],
    },
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/layouts/full/FullLayout.vue"),
      children: [
        ...admin,
        ...user,
        
        {
          name: "Dashboard",
          path: "/dashboard",
          component: () =>
            import("@/views/dashboard/Dashboard.vue"),
        },
        {
          name: "Alerts",
          path: "ui-components/alert",
          component: () =>
            import("@/views/ui-components/Alerts.vue"),
        },
        {
          name: "Buttons",
          path: "ui-components/buttons",
          component: () =>
            import("@/views/ui-components/Buttons.vue"),
        },
        {
          name: "Cards",
          path: "ui-components/cards",
          component: () =>
            import("@/views/ui-components/Cards.vue"),
        },
        {
          name: "Menus",
          path: "ui-components/menus",
          component: () =>
            import("@/views/ui-components/Menus.vue"),
        },
        {
          name: "Tables",
          path: "ui-components/tables",
          component: () =>
            import("@/views/ui-components/Tables.vue"),
        },
      ],
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect: 'notFound',
      component: () => import("@/layouts/auth/authLayout.vue"),
      children:[
        {
          path: 'notFound',
          component: () => import('@/views/auth/404.vue') 
        }
      ]
    }
  ],
});

router.beforeEach(async (to, from, next) => {

  if (!isAutenticated()) {
    // if(to.name != 'Login' && to.name != 'register' && to.name != 'auth-forgot-password'){
    if (to.name != 'Login' && to.name != 'Register' && to.name != 'Home') {
      next({ name: 'Login' });
    }
  } else
    if (isAutenticated() && to.name == 'Login') {
      next({ name: 'Dashboard' });
    }
  next();
})

export default router;
