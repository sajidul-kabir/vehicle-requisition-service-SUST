import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TeacherSchedule from "../components/Teacher/TeacherSchedule.vue";
import TeacherHistory from "../components/Teacher/TeacherHistory.vue";
import TransportHome from "../components/TransportOfficial/TransportHome.vue";
import RequisitionDetails from "../components/TransportOfficial/RequisitionDetails.vue";
import TransportGranted from "../components/TransportOfficial/TransportGranted.vue";
import TransportRejected from "../components/TransportOfficial/TransportRejected.vue";
import TransportSchedule from "../components/TransportOfficial/TransportSchedule.vue";
import DriverHome from "../components/Driver/DriverHome.vue";
import DriverUpdate from "../components/Driver/DriverUpdate.vue";
import DriverCompleted from "../components/Driver/DriverCompleted.vue";

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
    path: "/granted-requisitions",
    name: "TransportGranted",
    component: TransportGranted,
  },
  {
    path: "/rejected-requisitions",
    name: "TransportRejected",
    component: TransportRejected,
  },
  {
    path: "/transport-schedule",
    name: "TransportSchedule",
    component: TransportSchedule,
  },
  {
    path: "/transport-home/335",
    name: "Details",
    component: RequisitionDetails,
  },
  {
    path: "/driver-home",
    name: "DriverHome",
    component: DriverHome,
  },
  {
    path: "/driver-update-schedule",
    name: "DriverUpdate",
    component: DriverUpdate,
  },
  {
    path: "/driver-completed-requisitions",
    name: "DriverCompleted",
    component: DriverCompleted,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
