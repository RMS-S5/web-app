import { CContainer, CFade } from "@coreui/react";
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "../../components/common/ProtectedRoute";
// routes config
import routes from "../../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const MContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <ProtectedRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    isLoggedIn={route.isLoggedIn}
                    userType={route.accountType}
                    render={(props) => (
                      <CFade>
                        <route.component
                          {...{ accountType: route.accountType, ...props }}
                        />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/manager" to="/manager/dashboard" />{" "}
            {/*todo:update routes*/}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(MContent);
