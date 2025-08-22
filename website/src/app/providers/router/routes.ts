// import HomePage from "@/pages/home/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    // component: HomePage,
    redirect: { name: 'repositories' }
  },
  {
    path: "/play",
    name: "playground",
    component: () => import("@/pages/playground"),
  },
  {
    path: "/repos",
    name: "repositories",
    component: () => import("@/pages/repositories"),
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
];

export default routes;
