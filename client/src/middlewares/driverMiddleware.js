import store from "@/store";
const checkDriver = (next) => {
  if (
    !store.getters["auth/authenticated"] ||
    store.getters["auth/role"] !== "driver"
  ) {
    return next({
      name: "login",
    });
  }
};
export default checkDriver;
