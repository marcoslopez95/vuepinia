import { isAutenticated } from "@/helper";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: [
    {
      path: "/auth",
      redirect: "/auth",
      component: () => import("@/layouts/auth/authLayout.vue"),
      children: [
        {
          name: "Login",
          path: "/login",
          component: () =>
            import("@/views/auth/Login.vue"),
        },
      ]
    },
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/layouts/full/FullLayout.vue"),
      children: [
        {
          name: "Dashboard",
          path: "/dashboard",
          component: () =>
            import("@/views/dashboard/Dashboard.vue"),
        },
        {
          path: '/admin/',
          children: [
            {
              name: "admin-kyc",
              path: "/kyc",
              component: () =>
                import("@/views/kyc/Kyc.vue"),
            },
            {
              name: "admin-users",
              path: "/users",
              component: () =>
                import("@/views/users/UsersView.vue"),
            },
          ]
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
  ],
});

router.beforeEach(async (to, from,next) => {

  if (!isAutenticated()) {
    // if(to.name != 'Login' && to.name != 'register' && to.name != 'auth-forgot-password'){
    if(to.name != 'Login'){
      next({ name: 'Login' });
    }
  }else 
  if(isAutenticated() && to.name == 'Login'){
    next({ name: 'Dashboard' });
  }
  next();
})

export default router;
