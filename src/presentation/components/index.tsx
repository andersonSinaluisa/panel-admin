import React from "react";
import logo from "./logo.svg";
import Login from "./auth/login";
import { Route, Routes } from "react-router-dom";
import PrivateLayout from "../container/private-layout-container";
import AuthProviderContainer from "../container/auth/auth-provider-container";
import PublicLayout from "./public-layout";
import routes from "./routes";

function Application() {
  return (
    <AuthProviderContainer>
      <Routes>
        <Route path="/" index={false} element={<PublicLayout />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="inicio" element={<PrivateLayout />} >
          {routes.map((e, i) => {
            return <Route path={e.relative_path} key={i} element={e.element} />;
          })}
        </Route>
      </Routes>
    </AuthProviderContainer>
  );
}

export default Application;
