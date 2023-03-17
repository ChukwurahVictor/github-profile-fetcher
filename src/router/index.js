import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ViewRepo from "../views/ViewRepo.vue";
import SingleRepo from "../views/SingleRepo.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/repos/:repoId/content",
    name: "SingleRepo",
    component: SingleRepo,
  },
  // {
  //   path: "/repos/:repoId",
  //   name: "ViewRepo",
  //   component: ViewRepo,
  // },
  { path: "/:catchall(.*)*", name: "PageNotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
