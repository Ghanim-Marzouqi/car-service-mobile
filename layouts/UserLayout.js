import React from "react";
import { Redirect, Route, Switch } from "react-router-native";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Garages from "../pages/Garages";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";

export default function User() {
  return (
    <Switch>
      <Route path="/user/dashboard" component={Dashboard} />
      <Route path="/user/profile" component={Profile} />
      <Route path="/user/services" component={Services} />
      <Route path="/user/service-details/:id" component={ServiceDetails} />
      <Route path="/user/garages" component={Garages} />
      <Route path="/user/booking/:id" component={Booking} />
      <Route path="/user/my-bookings" component={MyBookings} />
      <Redirect from="/user" to="/user/dashboard" />
    </Switch>
  );
}
