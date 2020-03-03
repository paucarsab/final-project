import React, { Component } from "react";
// import { Link } from "react-router-dom";

import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="main main-raised">
        <div className="profile-content">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <div className="profile">
                  <div className="avatar">
                    <img
                      alt="name"
                      src="/assets/img/faces/christian.jpg"
                      className="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <div className="name">
                    <h3 className="title">Christian Louboutin</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="description text-center">
              <p>
                An artist of considerable range, Chet Faker &#x2014; the name
                taken by Melbourne-raised, Brooklyn-based Nick Murphy &#x2014;
                writes, performs and records all of his own music, giving it a
                warm, intimate feel with a solid groove structure.{" "}
              </p>
            </div>
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <div className="profile-tabs">
                  <ul
                    className="nav nav-pills nav-pills-icons justify-content-center"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#studio"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">camera</i> Studio
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#works"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">palette</i> Work
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#favorite"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">favorite</i> Favorite
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content tab-space">
              <div className="tab-pane active text-center gallery" id="studio">
                <div className="row">
                  <div className="col-md">
                    <img
                      alt="name"
                      src="/assets/img/examples/studio-1.jpg"
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane text-center gallery" id="works">
                <div className="row">
                  <div className="col-md">
                    <img
                      alt="name"
                      src="/assets/img/examples/olu-eletu.jpg"
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane text-center gallery" id="favorite">
                <div className="row">
                  <div className="col-md">
                    <img
                      alt="name"
                      src="/assets/img/examples/mariya-georgieva.jpg"
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;