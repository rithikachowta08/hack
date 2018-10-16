import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       localStorage.getItem("jwt") ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

async function checkAuth() {
  let token = localStorage.getItem("jwt");
  let headers = {
    Authorization: `Bearer ${token}`
  };
  return axios
    .post("/authorize", null, { headers })
    .then(response => {
      if (response.status === 200) return true;
      else return false;
    })
    .catch(err => false);
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  checkAuth().then(function(response) {
    return (
      <Route
        {...rest}
        render={props =>
          response ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/whatevr",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  });
};

export default PrivateRoute;
