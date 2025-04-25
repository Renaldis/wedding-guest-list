import Cookies from "js-cookie";

export const logout = () => {
  Cookies.remove("token");
  window.location.href = "/dashboard/login";
};
