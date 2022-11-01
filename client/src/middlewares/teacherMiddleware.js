import store from "@/store";
const checkTeacher = (next) => {
  if (
    !store.getters["auth/authenticated"] ||
    store.getters["auth/role"] !== "teacher"
  ) {
    return next({
      name: "login",
    });
  }
};
export default checkTeacher;
