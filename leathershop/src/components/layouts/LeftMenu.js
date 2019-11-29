import React from "react";
import { Link, Route } from "react-router-dom";

const menus = [
  {
    to: "/",
    label: "Dashboard",
    exact: true,
    icon: "fa-dashboard"
  },
  {
    to: "/users",
    label: "Users",
    exact: false,
    icon: "fa-users"
  },
  {
    to: "/customers",
    label: "Customers",
    exact: false,
    icon: "fa-address-book"
  },
  {
    to: "/employees",
    label: "Employees",
    exact: false,
    icon: "fa-briefcase"
  },
  {
    to: "/categories",
    label: "Categories",
    exact: false,
    icon: "fa-snowflake-o"
  },
  {
    to: "/products",
    label: "Products",
    exact: false,
    icon: "fa-product-hunt"
  },
  {
    to: "/orders",
    label: "Orders",
    exact: false,
    icon: "fa-shopping-cart"
  }
];

const MenuLi = ({ label, to, activeOnlyWhenExact, icon }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        var active = match ? "active" : "";
        return (
          <li>
            <Link to={to} className={`${active} app-menu__item`}>
              <i className={`app-menu__icon fa ${icon}`} />
              <span className="app-menu__label">{label}</span>
            </Link>
          </li>
        );
      }}
    />
  );
};

const LeftMenu = () => {
  const menuLis = menus.map(({ to, exact, label, icon }, index) => (
    <MenuLi
      to={to}
      activeOnlyWhenExact={exact}
      label={label}
      icon={icon}
      key={index}
    />
  ));
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__user">
        <img
          className="app-sidebar__user-avatar"
          src="https://firebasestorage.googleapis.com/v0/b/projectdemo-e3434.appspot.com/o/images%2Favartar.jpg?alt=media&token=11675bd5-2465-4123-a5b6-90dee7be6d77"
          alt="User"
          width="65px"
          height="65px"
        />
        <div>
          <p className="app-sidebar__user-name">Trang Ly</p>
          <p className="app-sidebar__user-designation">Full Stack Developer</p>
        </div>
      </div>
      <ul className="app-menu">{menuLis}</ul>
    </aside>
  );
};

export default LeftMenu;
