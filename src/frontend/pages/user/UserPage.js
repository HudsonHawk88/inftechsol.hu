import React, { Component } from "react";
import { Button } from "reactstrap";
import { LoadingPage } from "../../commons/Components";

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersJson: [],
      modositObj: {},
      formType: "FEL",
      isModalOpen: false,
      isDeleteModalOpen: false,
      modalCim: "",
      currentId: null,
      user: {},
      avatar: {},
      loading: true,
    };
  }

  setCookie = (name, value, daysToLive) => {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);

    if (typeof daysToLive === "number") {
      /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
      cookie += "; max-age=" + daysToLive * 24 * 60 * 60;

      document.cookie = cookie;
    }
  };

  // componentWillReceiveProps = (props) => {
  //   if (props !== {}) {
  //     this.setState({ user: props.data.user, loading: false }, () => {
  //       this.setCookie("auth", true, 1);
  //       this.setCookie("userId", this.state.user.id, 1);
  //     });
  //     if (this.state.user === {}) {
  //       this.setState({ loading: true });
  //     }
  //   } else {
  //     this.setState({ loading: true });
  //   }
  // };

  setCookie = (name, value, daysToLive) => {
    // Encode value in order to escape semicolons, commas, and whitespace
    let cookie = name + "=" + decodeURIComponent(value);

    if (typeof daysToLive === "number") {
      /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
      cookie += "; max-age=" + daysToLive * 24 * 60 * 60;

      document.cookie = cookie;
    }
  };

  render() {
    const { user } = this.state;
    return !this.state.loading ? (
      <div>
        <h1>{`Üdvözöllek ${user.vezeteknev} ${user.keresztnev}!`}</h1>
        <br />
        <Button
          color="primary"
          onClick={() => {
            if (this.props && this.props.logOut) {
              this.props.logOut();
            }
          }}
        >
          Kijelentkezés
        </Button>
      </div>
    ) : (
      <LoadingPage />
    );
  }
}
export default UserPage;
