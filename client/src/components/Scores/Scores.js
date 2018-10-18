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

  // back button click handler

  redirect = () => {
    this.setState({ redirect: true });
  };

  // get scores for clicked test from db and update to state

  componentDidMount() {
    let scores = [];
    let query = db
      .collection("codes")
      .where("testId", "==", this.props.location.testId);
    query.get().then(querySnapshot => {
      if (querySnapshot.docs.length === 0) this.setState({ scores: "nodata" });
      else {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          scores.push(data);
        });
        this.setState({ scores });
      }
    });
  }

  render() {
    let scores;
    if (this.state.scores === "nodata") {
      scores = <p>Nothing to show!</p>;
    } else if (this.state.scores.length !== 0) {
      scores = (
        <table className="table-header">
          <tbody>
            <tr>
              <th>Candidate</th>
              <th>Score</th>
            </tr>
            {this.state.scores.map(score => (
              <tr key={`${score.id}`}>
                <td className="no-capitalize">{score.candidateName}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      scores = <Spinner />;
    }

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
