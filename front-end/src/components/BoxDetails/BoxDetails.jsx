import React, { Component } from "react";
import getBoxDetails from "../../services/IndexService";
import "./BoxDetails.scss";
import Card from "react-bootstrap/Card";
import SimpleMap from "../Maps/Map";
import CardMaterial from "./CardMaterial/CardMaterial";
import CardComment from "./CommentsContainer/CardComment/CardComment";
import CommentsContainerDetail from "./CommentsContainer/CommentsContainerDetail";
import CommentInput from "./CardMaterial/CommentInput/CommentInput";

class BoxDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { box: {} };
    this.services = new getBoxDetails();
  }

  componentDidMount = () => this.getBoxDetails();

  getBoxDetails = () => {
    this.services
      .getBoxDetails(this.props.match.params.id)
      .then(oneBox => this.setState({ box: oneBox }))
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.box.boxDetails) {
      const { boxDetails } = this.state.box;
      const machinesArr = boxDetails.material.machines;
      const commentsObj = boxDetails.comments;
      const { userInSession } = this.props;
      const restArr = boxDetails.material.rest;
      return (
        <div className="BoxDetails">
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
                        <i className="material-icons">house</i> Box
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#coaches" data-toggle="tab">
                        <i className="material-icons">face</i> Coaches
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#material"
                        data-toggle="tab"
                      >
                        <i className="material-icons">fitness_center</i>{" "}
                        Material
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#messages"
                        data-toggle="tab"
                      >
                        <i className="material-icons">chat</i> Messages
                      </a>
                    </li>
                    <li className="nav-item">
                      <div className="nav-link">{boxDetails.boxName}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body ">
              <div className="tab-content text-center">
                <div className="tab-pane active" id="profile">
                  <div className="row">
                    <Card className="col data">
                      <div className="map">
                        <SimpleMap pos={boxDetails.position} marker={true} />
                      </div>
                      <h4>Schedule</h4>
                      <div className="schedule">
                        <div>
                          <div>
                            <h5>Monday-Friday</h5>
                            <small>
                              {boxDetails.schedule.mondayToFriday.start}
                            </small>
                            {"-"}
                            <small>
                              {boxDetails.schedule.mondayToFriday.end}
                            </small>
                          </div>
                        </div>
                        <div>
                          <div>
                            <h5>Saturday</h5>
                            <small>{boxDetails.schedule.saturday.start}</small>
                            {"-"}
                            <small>{boxDetails.schedule.saturday.end}</small>
                          </div>
                          <div>
                            <h5>Sunday</h5>
                            <small>{boxDetails.schedule.sunday.start}</small>
                            {"-"}
                            <small>{boxDetails.schedule.sunday.end}</small>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Card className="col data">
                      <div className="mini-data">test2</div>
                      <div className="mini-data">test3</div>
                    </Card>
                  </div>
                </div>
                <div className="tab-pane" id="coaches">
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam itaque blanditiis ipsum! Minima totam vero
                    voluptatibus in. Iusto consectetur, tempore molestiae
                    suscipit, minus vel quaerat excepturi delectus quae
                    reprehenderit quia!
                  </p>
                </div>
                <div className="tab-pane" id="material">
                  <div className="mini-data row">
                    <div className="col">
                      <h3>Machines</h3>
                      {machinesArr.map(machine => (
                        <CardMaterial
                          key={machine.name}
                          {...machine}
                        ></CardMaterial>
                      ))}
                    </div>
                    <div className="col">
                      <h3>Material</h3>
                      {restArr.map(rest => (
                        <CardMaterial key={rest.name} {...rest} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="messages">
                  <CommentInput
                    userInSession={userInSession}
                    boxId={boxDetails._id}
                  />
                  <CommentsContainerDetail
                    commentsArrDetails={commentsObj}
                  ></CommentsContainerDetail>
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
}

export default BoxDetails;
