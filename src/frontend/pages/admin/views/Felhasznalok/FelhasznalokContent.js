import React, { Component, useEffect, useState } from "react";
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
import Services from "../../Services";

function FelhasznalokContent(props) {
  const [user, setuser] = useState(null);
  const [isModalOpen, toggle] = useState(false);
  const [isDeleteModalOpen, toggleDelete] = useState(false);
  const [modositoObj, setModositoObj] = useState(null);
  const [userJson, setUserJson] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [formType, setFormType] = useState("FEL");
  const [loading, setLoading] = useState(true);

  useEffect = () => {
    if (window.location.pathname === "/admin/users") {
      props.history.push("/admin/users");
      getUsersFromServer();
      setuser(this.props && this.props.data.user);
    }
  };

  const toggleModal = () => {
    toggle(!isModalOpen);
  };

  const toggleDeleteModal = () => {
    toggleDelete(!isDeleteModalOpen);
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setModositoObj({
      ...modositoObj,
      [e.target.name]: value,
    });
  };

  const renderModalTitle = () => {
    switch (formType) {
      case "VIEW":
        return "Felhasználó megtekintése";
      case "FEL":
        return "Felhasználó hozzáadása";
      case "MOD":
        return "Felhasználó módosítása";
    }
  };

  // onIdChange = (e) => {
  //   let value = e.target.value;
  //   let newObj = this.state.modositObj;
  //   newObj.id = parseInt(value, 10);
  //   this.setState({ modositObj: newObj });
  // };

  // onVezeteknevChange = (e) => {
  //   let value = e.target.value;
  //   let newObj = this.state.modositObj;
  //   newObj.vezeteknev = value;
  //   this.setState({ modositObj: newObj });
  // };

  // onKeresztnevChange = (e) => {
  //   let value = e.target.value;
  //   let newObj = this.state.modositObj;
  //   newObj.keresztnev = value;
  //   this.setState({ modositObj: newObj });
  // };

  // onUsernameChange = (e) => {
  //   let value = e.target.value;
  //   let newObj = this.state.modositObj;
  //   newObj.username = value;
  //   this.setState({ modositObj: newObj });
  // };

  // onPasswordChange = (e) => {
  //   let value = e.target.value;
  //   let newObj = this.state.modositObj;
  //   newObj.password = value;
  //   this.setState({ modositObj: newObj });
  // };

  // onEmailChange = (e) => {
  //   let value = e.target.value;
  //   let newObj = this.state.modositObj;
  //   newObj.email = value;
  //   this.setState({ modositObj: newObj });
  // };

  const onAvatarChange = (e) => {
    console.log(e.target.value);
  };

  const handleViewClick = (id) => {
    Services.getUser(id).then((res) => {
      setModositoObj(res[0]);
      setFormType("VIEW");
      toggleModal();
    });
  };

  const handleEditClick = async (id) => {
    Services.getUser(id).then((res) => {
      setModositoObj(res[0]);
      setFormType("MOD");
      toggleModal();
    });
  };

  const handleNewClick = () => {
    setModositoObj(null);
    setFormType("FEL");
    toggleModal();
  };

  const handleDeleteClick = (id) => {
    setFormType("delete");
    setCurrentId(id);
    toggleDeleteModal();
  };

  const deleteUser = () => {
    Services.deleteUser(currentId).then((res) => {
      if (!res.err) {
        props.createNotification("success", res.msg);
      } else {
        props.createNotification("error", res.msg);
      }
    });
    getUsersFromServer();
    toggleDeleteModal();
  };

  const onSubmit = () => {
    if (formType === "FEL") {
      let felvitelObj = {};
      felvitelObj = JSON.parse(JSON.stringify(modositObj));
      felvitelObj.created_on = Services.addUser(modositObj).then((res) => {
        if (!res.err) {
          getUsersFromServer();
          toggleModal();
          props.createNotification("success", res.msg);
        } else {
          props.createNotification("error", res.msg);
        }
      });
    }
    if (formType === "MOD") {
      Services.editUser(modositObj).then((res) => {
        if (!res.err) {
          getUsersFromServer();
          toggleModal();
          props.createNotification("success", res.msg);
        } else {
          props.createNotification("error", res.msg);
        }
      });
    }
  };

  const tableIconFormatter = (cell, row, rowIndex) => {
    return (
      <React.Fragment>
        <Button
          key={rowIndex}
          color="link"
          onClick={() => handleViewClick(cell)}
        >
          <i key={rowIndex + 1} className="fa fa-eye" />
        </Button>
        <Button
          key={rowIndex + 2}
          color="link"
          onClick={() => handleEditClick(cell)}
        >
          <i key={rowIndex + 3} className="fa fa-pencil" />
        </Button>
        <Button
          key={rowIndex + 4}
          color="link"
          onClick={() => handleDeleteClick(cell)}
        >
          <i key={rowIndex + 5} className="fa fa-trash" />
        </Button>
      </React.Fragment>
    );
  };

  const nevFormatter = (value, cell) => {
    return value + " " + cell.keresztnev;
  };

  const renderForm = () => {
    if (formType === "VIEW") {
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
              onChange={(e) => handleInputChange(e)}
              value={modositObj && modositObj.vezeteknev}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Keresztnév:</Label>
            <AvInput
              type="text"
              name="keresztnev"
              onChange={(e) => handleInputChange(e)}
              value={modositObj && modositObj.keresztnev}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Felhasználónév: *</Label>
            <AvInput
              type="text"
              name="username"
              required
              onChange={(e) => handleInputChange(e)}
              value={modositObj && modositObj.username}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Jelszó: *</Label>
            <AvInput
              type="password"
              name="password"
              required
              onChange={(e) => handleInputChange(e)}
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
              onChange={(e) => handleInputChange(e)}
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

  const renderUsersTable = () => {
    const columns = [
      {
        dataField: "vezeteknev",
        text: "Teljes név",
        formatter: nevFormatter,
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
          tableIconFormatter(cell, row, rowIndex),
      },
    ];

    return (
      <BootstrapTable keyField="token" data={usersJson} columns={columns} />
    );
  };

  const getUsersFromServer = () => {
    Services.listUsers().then((res) => {
      console.log("UsersJson: ", res);
      setUserJson(res);
    });
  };

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
            if (props && props.logOut) {
              props.logOut();
            }
          }}
        >
          Kijelentkezés
        </Button>
      </div>
      <div>
        <Button color="primary" onClick={() => handleNewClick()}>
          Felhasználó hozzáadása
        </Button>
      </div>
      <br />
      <div className="col-md-12">{renderUsersTable()}</div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <AvForm onValidSubmit={onSubmit}>
          <ModalHeader>{renderModalTitle()}</ModalHeader>
          <ModalBody>{renderForm()}</ModalBody>
          <ModalFooter>
            {formType === "VIEW" ? (
              <Button color="primary" onClick={toggleModal}>
                OK
              </Button>
            ) : (
              <React.Fragment>
                <Button color="success" type="submit">
                  Mentés
                </Button>
                <Button color="secondary" onClick={toggleModal}>
                  Mégse
                </Button>
              </React.Fragment>
            )}
          </ModalFooter>
        </AvForm>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader>Felhasználó törlése</ModalHeader>
        <ModalBody>Biztosan törölni kivánja a kiválasztott tételt?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteUser}>
            Igen
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Nem
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FelhasznalokContent;
