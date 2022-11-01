import store from "@/store";
const checkAuth = (next) => {
  if (!store.getters["auth/authenticated"]) {
    return next({
      name: "login",
    });
  }
};
export default checkAuth;
