import React, { Component, Fragment } from "react";
import fire, { db } from "../../config/fire";
import "firebase/firestore";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";
import Button from "../../layout/Button/Button";
import Spinner from "../../layout/Spinner/Spinner";
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.database = fire.database().ref();
    this.state = {
      tests: null,
      displayCreateModal: false
    };
  }

  logout = () => {
    fire.auth().signOut();
  };

  displayModal = modalName => {
    this.setState({
      [modalName]: true
    });
  };

  removeModal = modalName => {
    this.setState({
      [modalName]: false
    });
  };

  componentDidMount() {
    console.log(this.props.userId);
    let arr = [];
    db.collection("tests")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          arr.push({
            name: data.name,
            status: data.status,
            profile: data.profile,
            date: data.date
          });
        });
        this.setState({ tests: arr });
      });
  }

  render() {
    return (
      <Fragment>
        {this.state.displayCreateModal ? (
          <CreateTestModal closeFunc={this.removeModal} />
        ) : null}
        <Header logout={this.logout} />
        <div className="content-wrapper">
          <h2>Tests</h2>
          {this.state.tests ? (
            <table className="table-header">
              <tr>
                <th>Name</th>
                <th>Date created</th>
                <th>Profile</th>
                <th>Status</th>
              </tr>
              {this.state.tests.map((test, index) => (
                <tr key={`test${index}`}>
                  <td>{test.name}</td>
                  <td>{test.date}</td>
                  <td>{test.profile}</td>
                  <td>{test.status}</td>
                </tr>
              ))}
            </table>
          ) : (
            <Spinner />
          )}
          <Button
            title="Create test"
            class="float"
            click={this.displayModal}
            param="displayCreateModal"
          >
            +
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default AdminDashboard;

// adding data
// db.collection("users")
//   .add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   })
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });
