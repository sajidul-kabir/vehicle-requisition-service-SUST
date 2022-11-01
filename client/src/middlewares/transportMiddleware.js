import store from "@/store";
const checkTransport = (next) => {
  if (
    !store.getters["auth/authenticated"] ||
    store.getters["auth/role"] !== "transport"
  ) {
    return next({
      name: "login",
    });
  }
};
export default checkTransport;
