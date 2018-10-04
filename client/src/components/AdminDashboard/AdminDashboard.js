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

  //logout button click handler

  logout = () => {
    fire.auth().signOut();
    window.location.assign("/");
  };

  // create new test button click handler

  displayModal = modalName => {
    this.setState({
      [modalName]: true
    });
  };

  // modal close button click handler

  removeModal = modalName => {
    this.setState({
      [modalName]: false
    });
  };

  // update state with test details from database
  componentDidMount() {
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
    //       var headers = {
    //         "Content-Type": "application/json"
    //       };
    //       const data = {
    //         clientId: "eaf5d02e0106c43d533594b300366743",
    //         clientSecret:
    //           "6faab0531e48a67cedc676a7baeb1bfae1e30f8abdd8510c593a94a97c6fceeb",
    //         script: "print('hello')",
    //         language: "python3",
    //         versionIndex: "0"
    //       };

    //   axios  //api jdoodle doesnt allow cross origin
    //     .post("https://api.jdoodle.com/execute", data, { headers: headers })
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(e => console.log(e));
    // });

    //   axios   // jsonplaceholder allows cross origin requests
    //     .get("http://jsonplaceholder.typicode.com/posts/1")
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(e => console.log(e));
    // });
    // }
  }

  // render modal when displayCreateModal flag true and render spinner while getting test details
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
              <tbody>
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
              </tbody>
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
