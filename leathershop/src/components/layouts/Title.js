import React from "react";

export default function Title(props) {
  const {title, icon, description} = props;
  return (
    <div className="app-title">
      <div>
        <h1>
          <i className={icon} /> {title}
        </h1>
        <p>{description}</p>
      </div>
      <ul className="app-breadcrumb breadcrumb">
        <li className="breadcrumb-item">
          <i className="fa fa-home fa-lg" />
        </li>
        <li className="breadcrumb-item">
          <a href="#">{title}</a>
        </li>
      </ul>
    </div>
  );
}
