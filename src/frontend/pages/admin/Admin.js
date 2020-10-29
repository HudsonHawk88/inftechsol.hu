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
import BootstrapTable from "react-bootstrap-table-next";
import Services from "./Services";


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

  componentDidMount() {
    if (window.location.pathname === "/admin/users") {
      this.getUsersFromServer();
      this.setState({ user: this.props && this.props.data.user })
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

  onEmailChange = (e) => {
    let value = e.target.value;
    let newObj = this.state.modositObj;
    newObj.email = value;
    this.setState({ modositObj: newObj });
  }

  onAvatarChange = (e) => {
    console.log(e.target.value);
  };

  handleViewClick = (id) => {
    Services.getUser(id).then((res) => {
      this.setState({
        modositObj: res[0],
        formType: "VIEW",
        modalCim: "Felhasználó megtekintése",
      });
      this.toggleModal();
    });
  };

  handleEditClick = async (id) => {
    Services.getUser(id).then((res) => {
      this.setState({
        modositObj: res[0],
        formType: "MOD",
        modalCim: "Felhasználó módosítása",
      });
      this.toggleModal();
    })
  };

  handleNewClick = () => {
    this.setState({
      modositObj: {},
      formType: "FEL",
      modalCim: "Felhasználó hozzáadása",
    });
    this.toggleModal();
  };

  handleDeleteClick = (id) => {
    this.setState({ formType: "delete", currentId: id });
    this.toggleDeleteModal();
  };

  deleteUser = () => {
    Services.deleteUser(this.state.currentId).then((res) => {
      if (!res.err) {
        this.props.createNotification("success", res.msg);
      } else {
        this.props.createNotification("error", res.msg);
      }
    });
    this.getUsersFromServer();
    this.toggleDeleteModal();
  };

  onSubmit = () => {
    const { formType } = this.state;
    if (formType === "FEL") {
      let felvitelObj = {};
      felvitelObj = JSON.parse(JSON.stringify(this.state.modositObj));
      felvitelObj.created_on = 
      Services.addUser(this.state.modositObj).then((res) => {
        if (!res.err) {
          this.getUsersFromServer();
          this.toggleModal();
          this.props.createNotification("success", res.msg);
        } else {
          this.props.createNotification("error", res.msg);
        }
      });
    }
    if (formType === "MOD") {
      Services.editUser(this.state.modositObj).then((res) => {
        if (!res.err) {
          this.getUsersFromServer();
          this.toggleModal();
          this.props.createNotification("success", res.msg);
        } else {
          this.props.createNotification("error", res.msg);
        }
      });
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

  nevFormatter = (value, cell) => {
    return value + ' ' + cell.keresztnev;
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
          <b>Email:</b>
          <br />
          <div>{modositObj.email}</div>
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
              type="password"
              name="password"
              required
              onChange={(e) => this.onPasswordChange(e)}
              value={modositObj && modositObj.password}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Email: *</Label>
            <AvInput
              type="email"
              name="email"
              required
              onChange={(e) => this.onEmailChange(e)}
              value={modositObj && modositObj.email}
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
    const columns = [
      {
        dataField: "vezeteknev",
        text: "Teljes név",
        formatter: this.nevFormatter
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
        dataField: "token",
        text: "Műveletek",
        formatter: (cell, row, rowIndex) =>
          this.tableIconFormatter(cell, row, rowIndex),
      },
    ];

    return <BootstrapTable keyField="token" data={this.state.usersJson} columns={columns} />;
  };

  getUsersFromServer = () => {
    Services.listUsers().then((res) => {
      console.log("UsersJson: ", res)
      this.setState({
        usersJson: res,
      });
    });
  };

  render() {
    return (
      <div>
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
