import React, { Component, Fragment } from "react";
import Button from "../../layout/Button/Button";
import Header from "../../layout/Header/Header";
import { db } from "../../config/fire";
import "firebase/firestore";
import { withRouter, Redirect } from "react-router-dom";
import { logout } from "../../config/functions";
import Spinner from "../../layout/Spinner/Spinner";

class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      redirect: false
    };
  }

  redirect = () => {
    this.setState({ redirect: true });
  };

  // update state with test details from database

  componentDidMount() {
    let scores = [];
    let query = db
      .collection("codes")
      .where("testId", "==", this.props.location.testId);
    query.get().then(querySnapshot => {
      console.log(querySnapshot);
      querySnapshot.forEach(doc => {
        let data = doc.data();
        scores.push(data);
      });
      this.setState({ scores });
    });
  }

  // render modal when displayCreateModal flag true and render spinner while getting test details

  render() {
    let scores =
      this.state.scores.length !== 0 ? (
        <table className="table-header">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
            {this.state.scores.map(score => (
              <tr key={`${score.id}`}>
                <td>{score.candidateName}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      );

    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper">
          <h2>Scores</h2>
          {scores}
          <Button click={this.redirect} class="float">
            {this.state.redirect ? (
              <Redirect
                to={{
                  pathname: "/dashboard",
                  testId: this.state.testId
                }}
              />
            ) : null}
            ←
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Scores);
