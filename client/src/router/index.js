import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TeacherSchedule from "../components/Teacher/TeacherSchedule.vue";
import TeacherHistory from "../components/Teacher/TeacherHistory.vue";
import TransportHome from "../components/TransportOfficial/TransportHome.vue";
import RequisitionDetails from "../components/TransportOfficial/RequisitionDetails.vue";

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
  {
    path: "/transport-home",
    name: "TransportHome",
    component: TransportHome,
  },
  {
    path: "/transport-home/335",
    name: "Details",
    component: RequisitionDetails,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
