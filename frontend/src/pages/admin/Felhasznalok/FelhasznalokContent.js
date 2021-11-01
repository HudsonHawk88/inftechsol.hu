/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  Label,
  InputGroup,
  Input
} from "reactstrap";
import Services from "./Services";
// import DataTable from 'react-data-table-component';
import { BootstrapTable } from '../../../commons/BootstrapTable';
import { DataTable, SelectColumnFilter } from '../../../commons/DataTable'

function FelhasznalokContent(props) {
  const [isModalOpen, toggle] = useState(false);
  const [isViewOpen, toggleView] = useState(false);
  const [isDeleteModalOpen, toggleDelete] = useState(false);
  const [userObj, setUserObj] = useState({
    nev: "",
    cim: "",
    telefon: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
    token: "",
    roles: []
  });
  const [usersJson, setUserJson] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formType, setFormType] = useState("FEL");

  useEffect(() => {
    getUsers();
  }, []);

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

  const getUsers = (id) => {
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
    getUsers(id);
    toggleViewModal();
  };

  const handleEditClick = (id) => {
    setFormType("MOD");
    setCurrentId(id);
    getUsers(id);
    toggleModal();
  };

  const handleNewClick = () => {
    setUserObj({
      nev: "",
      cim: "",
      telefon: "",
      username: "",
      password: "",
      email: "",
      avatar: "",
      token: "",
      roles: []
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
        getUsers();
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
    Services.addUser(felvitelObj).then((res) => {
      if (!res.err) {
        toggleModal();
        getUsers();
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
        getUsers();
        props.notification("success", res.msg);
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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

  const tableIconFormatter = (id, index) => {
    return (
      <div key={index}>
        <Button
          color="link"
          onClick={() => handleViewClick(id)}
        >
          <i className="fa fa-eye" />
        </Button>
        <Button
          color="link"
          onClick={() => handleEditClick(id)}
        >
          <i className="fa fa-pencil" />
        </Button>
        <Button
          color="link"
          onClick={() => handleDeleteClick(id)}
        >
          <i className="fa fa-trash" />
        </Button>
      </div>
    );
  };

  const nevFormatter = (cell) => {
    return cell.titulus + " " + cell.vezeteknev + " " + cell.keresztnev;
  };

  const renderViewForm = () => {
    return (
      <React.Fragment>
        <b>Teljes név:</b>
        <br />
        <div>{nevFormatter(userObj.nev)}</div>
        <br />
        <b>Felhasználónév:</b>
        <br />
        <div>{userObj && userObj.username}</div>
        <br />
        <b>Email:</b>
        <br />
        <div>{userObj && userObj.email}</div>
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
        <InputGroup>
          <Label>Vezetéknév:</Label>
          <Input
            type="text"
            name="vezeteknev"
            id="vezeteknev"
            onChange={(e) => handleInputChange(e)}
            value={userObj.nev.vezeteknev}
          />
        </InputGroup>
        <InputGroup>
          <Label>Keresztnév:</Label>
          <Input
            type="text"
            id="keresztnev"
            name="keresztnev"
            onChange={(e) => handleInputChange(e)}
            value={userObj.nev.keresztnev}
          />
        </InputGroup>
        <InputGroup>
          <Label>Felhasználónév: *</Label>
          <Input
            type="text"
            name="username"
            id="username"
            required
            onChange={(e) => handleInputChange(e)}
            value={userObj.username}
          />
        </InputGroup>
        <InputGroup>
          <Label>Jelszó: *</Label>
          <Input
            type="text"
            name="password"
            id="password"
            required
            onChange={(e) => handleInputChange(e)}
            value={userObj.password}
          />
        </InputGroup>
        <InputGroup>
          <Label>Email: *</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => handleInputChange(e)}
            value={userObj.email}
          />
        </InputGroup>
        {/* <InputGroup>
          <Label>Jogosultságok: *</Label>
          <Input
            type="select"
            name="roles"
            id="roles"
            required
            onChange={(e) => handleInputChange(e)}
            value={userObj.roles}
          />
        </InputGroup> */}
        {/* <InputGroup>
          <Label>Profilkép:</Label>
          <Input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => this.onAvatarChange(e)}
            value={userObj.avatar}
          />
        </InputGroup> */}
      </React.Fragment>
    );
  };

  const renderTable = () => {
    const data = JSON.parse(JSON.stringify(usersJson)).map((user, index) => {
      const userDatas = user;
      userDatas.nev = nevFormatter(user.nev);
      userDatas.id = tableIconFormatter(user.id, index);
      return userDatas;
    });

    const cols = [
      {
        Header: 'Név',
        accessor: 'nev'
      },
      {
        Header: 'Email',
        accessor: 'email',
        Filter: SelectColumnFilter
      },
      {
        Header: 'Műveletek',
        accessor: 'id',
        disableFilters: true
      }
    ]

    return <DataTable cols={cols} data={data} />
  }

  return (
    <div className="row">
      <div className="col-md-5 col">
        <Button className="button--primary" onClick={() => handleNewClick()}>
          Felhasználó hozzáadása
        </Button>
      </div>
      <div className="col-md-7" />
      <div className="col-md-12" />
      <br />
      <div className="col-md-12">{renderTable()}</div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <Form onSubmit={onSubmit}>
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
        </Form>
      </Modal>
      <Modal isOpen={isViewOpen} toggle={toggleViewModal}>
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
