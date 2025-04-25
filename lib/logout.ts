import Cookies from "js-cookie";

export const logout = () => {
  Cookies.remove("token", { path: "/" });
  window.location.href = "/dashboard/login";
};
