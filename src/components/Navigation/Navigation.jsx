import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.Nav}>
      <NavLink to="/" style={{ marginRight: "20px" }}>
        Home
      </NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
}
