import React from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown, Nav, NavDropdown } from "react-bootstrap";
import { MenuItem } from "bootstrap";
const Profile = ({ imagepath, showarrow, path }) => {
  return (
    //   <div className="dropdown text-end me-2"  >
    //     {/* <a

    //       className="d-block link-dark text-decoration-none dropdown-toggle"
    //       id="dropdownMenuButton1"
    //       data-bs-toggle="dropdown"
    //       aria-expanded="false"
    //     >
    //       <img
    //         src={imagepath}
    //         alt="mdo"
    //         width="32"
    //         height="32"
    //         className="rounded-circle"
    //       />
    //       {!showarrow && <Badge pill className="position-absolute top-0 end-0"  bg="danger" style={{fontSize: "7px"}}>1</Badge>}
    //     </a> */}
    //     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    //   Dropdown button
    // </button>
    //     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    //   <li><a className="dropdown-item" href="#">Action</a></li>
    //   <li><a className="dropdown-item" href="#">Another action</a></li>
    //   <li><a className="dropdown-item" href="#">Something else here</a></li>
    // </ul>
    //   </div>
    // );

    // <Dropdown>

    //   <Dropdown.Menu>
    //     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>

    <Dropdown >
      <Dropdown.Toggle style={{backgroundColor:"white", border:"white"}} id="dropdown-basic">
        <img
          src={imagepath}
          alt="mdo"
          width="32"
          height="32"
          className="rounded-circle"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/dashboard/home">Dashboard</Dropdown.Item>
        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Profile;
