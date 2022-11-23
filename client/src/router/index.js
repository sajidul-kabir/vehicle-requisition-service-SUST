import Vue from "vue";
import VueRouter from "vue-router";
import LoginUser from "../components/auth/LoginUser.vue";
import SignupUser from "../components/auth/SignupUser.vue";
import HomeView from "../views/HomeView.vue";
import TeacherSchedule from "../components/Teacher/TeacherSchedule.vue";
import TeacherHistory from "../components/Teacher/TeacherHistory.vue";
import TeacherAccount from "../components/Teacher/TeacherAccount.vue";
import TransportHome from "../components/TransportOfficial/TransportHome.vue";
import RequisitionDetails from "../components/TransportOfficial/RequisitionDetails.vue";
import GrantedRequisitionDetails from "../components/TransportOfficial/GrantedRequisitionDetails.vue";
import RejectedRequisitionDetails from "../components/TransportOfficial/RejectedRequisitionDetails.vue";
import TransportGranted from "../components/TransportOfficial/TransportGranted.vue";
import TransportRejected from "../components/TransportOfficial/TransportRejected.vue";
import TransportSchedule from "../components/TransportOfficial/TransportSchedule.vue";
import TransportRunning from "../components/TransportOfficial/RunningRequisitions.vue";
import TransportAccount from "../components/TransportOfficial/TransportAccount.vue";
import DriverHome from "../components/Driver/DriverHome.vue";
import DriverUpdate from "../components/Driver/DriverUpdate.vue";
import DriverCompleted from "../components/Driver/DriverCompleted.vue";
import DriverAccount from "../components/Driver/DriverAccount.vue";
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
    path: "/signup",
    name: "signup",
    component: SignupUser,
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
    path: "/teacher-account",
    name: "TeacherAccount",
    component: TeacherAccount,
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
    path: "/running-requisitions",
    name: "TransportRunning",
    component: TransportRunning,
    beforeEnter: (to, from, next) => {
      checkAuth(next);
      checkTransport(next);
      next();
    },
  },
  {
    path: "/transport-account",
    name: "TransportAccount",
    component: TransportAccount,
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
    path: "/transport-home/:requisition_id",
    name: "Details",
    component: RequisitionDetails,
    props: true,
  },
  {
    path: "/transport-home/granted/:requisition_id",
    name: "GrantedDetails",
    component: GrantedRequisitionDetails,
    props: true,
  },
  {
    path: "/transport-home/rejected/:requisition_id",
    name: "RejectedDetails",
    component: RejectedRequisitionDetails,
    props: true,
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
  {
    path: "/driver-account",
    name: "DriverAccount",
    component: DriverAccount,
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
