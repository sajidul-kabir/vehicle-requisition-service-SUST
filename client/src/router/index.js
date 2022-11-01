import Vue from "vue";
import VueRouter from "vue-router";
import LoginUser from "../components/auth/LoginUser.vue";
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
//import store from "@/store";
import checkAuth from "../middlewares/authMiddleware";
import checkTransport from "../middlewares/transportMiddleware";
import checkTeacher from "../middlewares/teacherMiddleware";
import checkDriver from "../middlewares/driverMiddleware";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: LoginUser,
  },
  {
    path: "/teacher-home",
    name: "home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTeacher(next);
      next();
    },
  },
  {
    path: "/teacher-schedule",
    name: "TeacherSchedule",
    component: TeacherSchedule,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTeacher(next);
      next();
    },
  },
  {
    path: "/teacher-history",
    name: "TeacherHistory",
    component: TeacherHistory,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTeacher(next);
      next();
    },
  },
  {
    path: "/transport-home",
    name: "TransportHome",
    component: TransportHome,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTransport(next);
      next();
    },
  },
  {
    path: "/granted-requisitions",
    name: "TransportGranted",
    component: TransportGranted,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTransport(next);
      next();
    },
  },
  {
    path: "/rejected-requisitions",
    name: "TransportRejected",
    component: TransportRejected,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTransport(next);
      next();
    },
  },
  {
    path: "/transport-schedule",
    name: "TransportSchedule",
    component: TransportSchedule,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTransport(next);
      next();
    },
  },
  {
    path: "/transport-home/335",
    name: "Details",
    component: RequisitionDetails,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTransport(next);
      next();
    },
  },
  {
    path: "/driver-home",
    name: "DriverHome",
    component: DriverHome,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkDriver(next);
      next();
    },
  },
  {
    path: "/driver-update-schedule",
    name: "DriverUpdate",
    component: DriverUpdate,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkDriver(next);
      next();
    },
  },
  {
    path: "/driver-completed-requisitions",
    name: "DriverCompleted",
    component: DriverCompleted,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkDriver(next);
      next();
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
