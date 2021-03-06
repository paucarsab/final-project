import React from "react";
// import { Link } from "react-router-dom";
// import IndexService from "../../services/IndexService";
import { Link } from "react-router-dom";
import "./Boxes.scss";
import BoxDetails from "../BoxDetails/BoxDetails";
import BoxCard from "../BoxCard/BoxCard";
import SearchInput from "../Search/SearchInput";
import { Container } from "@material-ui/core";

function Boxes(props) {
  const { boxes } = props.allBoxes;
  if (boxes) {
    console.log(boxes);
    return (
      <div className="Boxes">
        <div className="card card-nav-tabs">
          <div className="card-header card-header-primary">
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <ul className="nav nav-tabs" data-tabs="tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#profile"
                      data-toggle="tab"
                    >
                      <i className="material-icons">face</i> Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#messages" data-toggle="tab">
                      <i className="material-icons">chat</i> Messages
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#settings" data-toggle="tab">
                      <i className="material-icons">build</i> Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body ">
            <div className="tab-content text-center">
              <div className="tab-pane active" id="profile">
                <div className="cont-box-card">
                  {boxes.map(box => (
                    <BoxCard key={box._id} {...box} />
                  ))}
                </div>
              </div>
              <div className="tab-pane" id="messages">
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam itaque blanditiis ipsum! Minima totam vero
                  voluptatibus in. Iusto consectetur, tempore molestiae
                  suscipit, minus vel quaerat excepturi delectus quae
                  reprehenderit quia!
                </p>
              </div>
              <div className="tab-pane" id="settings">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugiat aliquid iusto illo et sed culpa possimus explicabo
                  libero nostrum! Mollitia fuga fugit cumque blanditiis amet
                  minus quae distinctio commodi deserunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
export default Boxes;
