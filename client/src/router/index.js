import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TeacherSchedule from "../components/TeacherSchedule.vue";
import TeacherHistory from "../components/TeacherHistory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/schedule",
    name: "TeacherSchedule",
    component: TeacherSchedule,
  },
  {
    path: "/history",
    name: "TeacherHistory",
    component: TeacherHistory,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
