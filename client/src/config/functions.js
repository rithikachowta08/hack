import fire from "./fire";
//logout button click handler

export const logout = () => {
  fire.auth().signOut();
  window.location.assign("/");
};
