import HomePage from "@/pages/home/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/play",
    name: "playground",
    component: () => import("@/pages/playground"),
  },
];

export default routes;
