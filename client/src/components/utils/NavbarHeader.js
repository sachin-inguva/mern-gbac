import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "@blueprintjs/core";

import { useAuth } from "../../context/auth-context";

export function NavbarHeader() {
  const { user } = useAuth();

  const links = user?.permission?.tabs || [];
  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>Group based Authentication</Navbar.Heading>
        <Navbar.Divider />
        {links.map((link) => (
          <Fragment key={link}>
            <NavLink to={`/${link}`}>{link}</NavLink>
            <Navbar.Divider />
          </Fragment>
        ))}
        <Link to="/logout">Logout</Link>
      </Navbar.Group>
    </Navbar>
  );
}
