/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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

function FelhasznalokContent(props) {
  const [isModalOpen, toggle] = useState(false);
  const [isViewOpen, toggleView] = useState(false);
  const [isDeleteModalOpen, toggleDelete] = useState(false);
  const [userObj, setUserObj] = useState({
    vezeteknev: "",
    keresztnev: "",
    username: "",
    password: "",
    email: "",
    // avatar: []
  });
  const [usersJson, setUserJson] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formType, setFormType] = useState("FEL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/admin/users") {
      getUsersFromServer();
    }
  }, [window.location.pathname]);

  const toggleModal = () => {
    toggle(!isModalOpen);
  };

  const toggleViewModal = () => {
    toggleView(!isViewOpen);
  };

  const toggleDeleteModal = () => {
    toggleDelete(!isDeleteModalOpen);
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserObj({
      ...userObj,
      [e.target.name]: value,
    });
  };

  const renderModalTitle = () => {
    switch (formType) {
      case "FEL":
        return "Felhasználó hozzáadása";
      case "MOD":
        return "Felhasználó módosítása";
      default:
        return;
    }
  };

  const getUsersFromServer = (id) => {
    if (id) {
      Services.getUser(id).then((res) => {
        setUserObj(res[0]);
      });
    } else {
      Services.listUsers().then((res) => {
        setUserJson(res);
      });
    }
  };

  const handleViewClick = (id) => {
    getUsersFromServer(id);
    toggleViewModal();
  };

  const handleEditClick = (id) => {
    setFormType("MOD");
    setCurrentId(id);
    getUsersFromServer(id);
    toggleModal();
  };

  const handleNewClick = () => {
    setUserObj({
      vezeteknev: "",
      keresztnev: "",
      username: "",
      password: "",
      email: "",
      // avatar: []
    });
    setFormType("FEL");
    toggleModal();
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    toggleDeleteModal();
  };

  const deleteUser = () => {
    Services.deleteUser(deleteId).then((res) => {
      if (!res.err) {
        toggleDeleteModal();
        getUsersFromServer();
        props.notification("success", res.msg);
      } else {
        props.notification("error", res.msg);
      }
    });
  };

  const addUser = () => {
    let felvitelObj = {};
    felvitelObj = JSON.parse(JSON.stringify(userObj));
    felvitelObj.created_on = new Date();
    Services.addUser(userObj).then((res) => {
      if (!res.err) {
        toggleModal();
        getUsersFromServer();
        props.notification("success", res.msg);
      } else {
        props.notification("error", res.msg);
      }
    });
  };

  const editUser = () => {
    Services.editUser(userObj, currentId).then((res) => {
      if (!res.err) {
        toggleModal();
        getUsersFromServer();
        props.notification("success", res.msg);
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const onSubmit = () => {
    switch (formType) {
      case "FEL": {
        addUser();
        break;
      }
      case "MOD": {
        editUser();
        break;
      }
      default:
        break;
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

  const renderViewForm = () => {
    return (
      <React.Fragment>
        <b>Teljes név:</b>
        <br />
        <div>{userObj.vezeteknev + " " + userObj.keresztnev}</div>
        <br />
        <b>Felhasználónév:</b>
        <br />
        <div>{userObj.username}</div>
        <br />
        <b>Email:</b>
        <br />
        <div>{userObj.email}</div>
        <br />
        {/* <b>Profilkép:</b>
        <br />
        <div>{userObj.avatar}</div>
        <br /> */}
      </React.Fragment>
    );
  };

  const renderForm = () => {
    return (
      <React.Fragment>
        <AvGroup>
          <Label>Vezetéknév:</Label>
          <AvInput
            type="text"
            name="vezeteknev"
            onChange={(e) => handleInputChange(e)}
            value={userObj.vezeteknev}
          />
          <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
        </AvGroup>
        <AvGroup>
          <Label>Keresztnév:</Label>
          <AvInput
            type="text"
            name="keresztnev"
            onChange={(e) => handleInputChange(e)}
            value={userObj.keresztnev}
          />
          <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
        </AvGroup>
        <AvGroup>
          <Label>Felhasználónév: *</Label>
          <AvInput
            type="text"
            name="username"
            autoComplete=""
            required
            onChange={(e) => handleInputChange(e)}
            value={userObj.username}
          />
          <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
        </AvGroup>
        <AvGroup>
          <Label>Jelszó: *</Label>
          <AvInput
            type="text"
            name="password"
            autoComplete=""
            required
            onChange={(e) => handleInputChange(e)}
            value={userObj.password}
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
            value={userObj.email}
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
            value={userObj.avatar}
          />
          <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
        </AvGroup> */}
      </React.Fragment>
    );
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

  return (
    <div className="row">
      <div className="col-md-12" />
      <br />
      <div className="col-md-5 col">
        <Button className="button--primary" onClick={() => handleNewClick()}>
          Felhasználó hozzáadása
        </Button>
      </div>
      <div className="col-md-7" />
      <div className="col-md-12" />
      <br />
      <div className="col-md-12">{renderUsersTable()}</div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <AvForm onValidSubmit={onSubmit}>
          <ModalHeader>{renderModalTitle()}</ModalHeader>
          <ModalBody>{renderForm()}</ModalBody>
          <ModalFooter>
            <Button className="button--success" type="submit">
              Mentés
            </Button>
            <Button className="button--secondary" onClick={() => toggleModal()}>
              Mégse
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      <Modal isOpen={isViewOpen} toggle={toggleViewModal}>
        <AvForm onValidSubmit={onSubmit}>
          <ModalHeader>Felhasználó megtekintése</ModalHeader>
          <ModalBody>{renderViewForm()}</ModalBody>
          <ModalFooter>
            <Button
              className="button--primary"
              onClick={() => toggleViewModal()}
            >
              OK
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader>Felhasználó törlése</ModalHeader>
        <ModalBody>Biztosan törölni kivánja a kiválasztott tételt?</ModalBody>
        <ModalFooter>
          <Button className="button--danger" onClick={() => deleteUser()}>
            Igen
          </Button>
          <Button
            className="button--secondary"
            onClick={() => toggleDeleteModal()}
          >
            Nem
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FelhasznalokContent;
