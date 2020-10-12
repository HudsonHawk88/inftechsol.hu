import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvInput,
  AvFeedback,
  AvGroup,
} from "availity-reactstrap-validation";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Services from "./Services";
import BootstrapTable from "react-bootstrap-table-next";
import { LoadingPage } from "../../commons/Components";
import Full from "../../components/Full/Full";

class Admin extends Component {
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
      loading: true,
      teszt: [],
    };
  }

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

  componentWillReceiveProps = (props) => {
    console.log(props);
    if (props !== {}) {
      this.setState({ user: props.data.user, loading: false }, () => {
        this.setCookie("auth", true, 1);
        this.setCookie("userId", this.state.user.id, 1);
      });
    }
  };

  createNotification = (type, message) => {
    switch (type) {
      case "info":
        NotificationManager.info(message, "");
        break;
      case "success":
        NotificationManager.success(message, "");
        break;
      case "warning":
        NotificationManager.warning(message, "");
        break;
      case "error":
        NotificationManager.error(message, "");
        break;
      default: {
        return;
      }
    }
  };

  componentDidMount() {
    if (window.location.pathname === "/admin/users") {
      this.getUsersFromServer();
    }
  }

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  toggleDeleteModal = () => {
    this.setState((prevState) => ({
      isDeleteModalOpen: !prevState.isDeleteModalOpen,
    }));
  };

  onIdChange = (e) => {
    let value = e.target.value;
    let newObj = this.state.modositObj;
    newObj.id = parseInt(value, 10);
    this.setState({ modositObj: newObj });
  };

  onVezeteknevChange = (e) => {
    let value = e.target.value;
    let newObj = this.state.modositObj;
    newObj.vezeteknev = value;
    this.setState({ modositObj: newObj });
  };

  onKeresztnevChange = (e) => {
    let value = e.target.value;
    let newObj = this.state.modositObj;
    newObj.keresztnev = value;
    this.setState({ modositObj: newObj });
  };

  onUsernameChange = (e) => {
    let value = e.target.value;
    let newObj = this.state.modositObj;
    newObj.username = value;
    this.setState({ modositObj: newObj });
  };

  onPasswordChange = (e) => {
    let value = e.target.value;
    let newObj = this.state.modositObj;
    newObj.password = value;
    this.setState({ modositObj: newObj });
  };

  onAvatarChange = (e) => {
    console.log(e.target.value);
  };

  handleViewClick = async (id) => {
    const response = await Services.getUser(id);
    const data = await response;
    this.setState({
      modositObj: data,
      formType: "VIEW",
      modalCim: "Felhasználó megtekintése",
    });
    this.toggleModal();
  };

  handleEditClick = async (id) => {
    const response = await Services.getUser(id);
    const data = await response;
    this.setState({
      modositObj: data,
      formType: "MOD",
      modalCim: "Felhasználó módosítása",
    });
    this.toggleModal();
  };

  handleNewClick = () => {
    this.setState({
      modositObj: {},
      formType: "FEL",
      modalCim: "Felhasználó hozzáadása",
    });
    this.toggleModal();
  };

  handleDeleteClick = async (id) => {
    this.setState({ formType: "delete", currentId: id });
    this.toggleDeleteModal();
  };

  deleteUser = async () => {
    let response = await Services.deleteUser(this.state.currentId);
    response.json().then((value) => {
      if (response.status === 200) {
        this.createNotification("success", value.msg);
      } else {
        this.createNotification("error", value.msg);
      }
    });
    this.getUsersFromServer();
    this.toggleDeleteModal();
  };

  onSubmit = async () => {
    const formType = this.state.formType;
    if (formType === "FEL") {
      let response = await Services.addUser(this.state.modositObj);

      response.json().then((value) => {
        if (response.status === 200) {
          this.createNotification("success", value.msg);
        } else {
          this.createNotification("error", value.msg);
        }
      });
      this.getUsersFromServer();
      this.toggleModal();
    }
    if (formType === "MOD") {
      let response = await Services.editUser(this.state.modositObj);
      response.json().then((value) => {
        if (response.status === 200) {
          this.createNotification("success", value.msg);
        } else {
          this.createNotification("error", value.msg);
        }
      });
      this.getUsersFromServer();
      this.toggleModal();
    }
  };

  tableIconFormatter(cell, row, rowIndex) {
    return (
      <React.Fragment>
        <Button
          key={rowIndex}
          color="link"
          onClick={() => this.handleViewClick(cell)}
        >
          <i key={rowIndex + 1} className="fa fa-eye" />
        </Button>
        <Button
          key={rowIndex + 2}
          color="link"
          onClick={() => this.handleEditClick(cell)}
        >
          <i key={rowIndex + 3} className="fa fa-pencil" />
        </Button>
        <Button
          key={rowIndex + 4}
          color="link"
          onClick={() => this.handleDeleteClick(cell)}
        >
          <i key={rowIndex + 5} className="fa fa-trash" />
        </Button>
      </React.Fragment>
    );
  }

  renderForm = () => {
    const { modositObj } = this.state;
    if (this.state.formType === "VIEW") {
      return (
        <React.Fragment>
          <b>Teljes név:</b>
          <br />
          <div>{modositObj.vezeteknev + " " + modositObj.keresztnev}</div>
          <br />
          <b>Felhasználónév:</b>
          <br />
          <div>{modositObj.username}</div>
          <br />
          <b>Jelszó:</b>
          <br />
          <div>{modositObj.password}</div>
          <br />
          {/* <b>Profilkép:</b>
          <br />
          <div>{modositObj.avatar}</div>
          <br /> */}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <AvGroup>
            <Label>Vezetéknév:</Label>
            <AvInput
              type="text"
              name="vezeteknev"
              onChange={(e) => this.onVezeteknevChange(e)}
              value={modositObj && modositObj.vezeteknev}
            />
            <AvFeedback>Ez a mezőő kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Keresztnév:</Label>
            <AvInput
              type="text"
              name="keresztnev"
              onChange={(e) => this.onKeresztnevChange(e)}
              value={modositObj && modositObj.keresztnev}
            />
            <AvFeedback>Ez a mezőő kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Felhasználónév: *</Label>
            <AvInput
              type="text"
              name="username"
              required
              onChange={(e) => this.onUsernameChange(e)}
              value={modositObj && modositObj.username}
            />
            <AvFeedback>Ez a mezőő kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Jelszó: *</Label>
            <AvInput
              type="text"
              name="password"
              required
              onChange={(e) => this.onPasswordChange(e)}
              value={modositObj && modositObj.password}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
          {/* <AvGroup>
            <Label>Profilkép:</Label>
            <AvInput
              type="file"
              name="avatar"
              required
              onChange={(e) => this.onAvatarChange(e)}
              value={modositObj && modositObj.avatar}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup> */}
        </React.Fragment>
      );
    }
  };

  renderUsersTable = () => {
    let users = this.state.usersJson;
    const columns = [
      {
        dataField: "teljesNev",
        text: "Teljes név",
      },
      {
        dataField: "username",
        text: "Felhasználónév",
      },
      {
        dataField: "password",
        text: "Jelszó",
      },
      {
        dataField: "id",
        text: "Műveletek",
        formatter: (cell, row, rowIndex) =>
          this.tableIconFormatter(cell, row, rowIndex),
      },
    ];

    return <BootstrapTable keyField="id" data={users} columns={columns} />;
  };

  getUsersFromServer = () => {
    Services.listUsers(12).then((result) => {
      this.setState({
        teszt: result[0],
      });
    });
  };

  render() {
    const { user } = this.state;
    console.log(this.state.teszt);
    return (
      <div>
        <NotificationContainer />
        <div>My App</div>
        <br />
        {/* <h1>{`Helló ${user.username}`}</h1> */}
        <br />
        <div>
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
        <div>
          <Button color="primary" onClick={() => this.handleNewClick()}>
            Felhasználó hozzáadása
          </Button>
        </div>
        <br />
        <div className="col-md-12">{this.renderUsersTable()}</div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <AvForm onValidSubmit={this.onSubmit}>
            <ModalHeader>{this.state.modalCim}</ModalHeader>
            <ModalBody>{this.renderForm()}</ModalBody>
            <ModalFooter>
              {this.state.formType === "VIEW" ? (
                <Button color="primary" onClick={this.toggleModal}>
                  OK
                </Button>
              ) : (
                <React.Fragment>
                  <Button color="success" type="submit">
                    Mentés
                  </Button>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Mégse
                  </Button>
                </React.Fragment>
              )}
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.isDeleteModalOpen}
          toggle={this.toggleDeleteModal}
        >
          <ModalHeader>Felhasználó törlése</ModalHeader>
          <ModalBody>Biztosan törölni kivánja a kiválasztott tételt?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteUser}>
              Igen
            </Button>
            <Button color="secondary" onClick={this.toggleDeleteModal}>
              Nem
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Admin;
