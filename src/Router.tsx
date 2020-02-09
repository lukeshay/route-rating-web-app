import { AuthRoutes, Routes } from "./routes";
import { Route, Switch } from "react-router";
import React from "react";

const HomePage = React.lazy(() => import("./modules/homepage/HomePage"));
const NotFoundPage = React.lazy(() => import("./modules/NotFoundPage"));
const ProfilePage = React.lazy(() => import("./modules/profile"));
const GymsPage = React.lazy(() => import("./modules/gyms"));
const AboutPage = React.lazy(() => import("./modules/about"));

const Router: React.FC = (): JSX.Element => {
  return (
    <React.Suspense fallback={<div />}>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/index" component={HomePage} />
        <Route path={Routes.PROFILE} component={ProfilePage} />
        <Route path={Routes.GYMS} component={GymsPage} />
        <Route path={Routes.ABOUT} component={AboutPage} />
        <Route path={AuthRoutes.WALLS} component={GymsPage} />
        <Route path={AuthRoutes.ROUTES} component={GymsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Suspense>
  );
};

export default Router;
