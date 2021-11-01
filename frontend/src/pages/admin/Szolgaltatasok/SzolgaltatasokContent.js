/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  InputGroup,
  Input,
  Label,
} from "reactstrap";
import Services from "./Services";

const SzolgaltatasokContent = (props) => {
  const [isModalOpen, toggle] = useState(false);
  const [isViewModalOpen, toggleViewModal] = useState(false);
  const [modalType, toggleModalType] = useState("FEL");
  const [currentId, setCurrentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [szolgaltatasObj, setSzolgaltatasObj] = useState({
    nev: "",
    kategoria: "",
    leiras: "",
    ar: ""
  });
  const [szolgaltatasokJson, setSzolgaltatasokJson] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/admin/szolgaltatasok") {
        getSzolgaltasok();
    }
  }, [window.location.pathname]);

  const getSzolgaltasok = (id) => {
    if (id) {
      Services.getSzolgaltatas(id).then((res) => {
        if (!res.err) {
            setSzolgaltatasObj(res);
        }
      });
    } else {
      Services.listSzolgaltatasok().then((res) => {
        if (!res.err) {
            setSzolgaltatasokJson(res);
        }
      });
    }
  };

  const toggleView = () => {
    toggleViewModal(!isViewModalOpen);
  };

  const handleNewClick = () => {
    setSzolgaltatasObj({
      nev: "",
      kategoria: "",
      leiras: "",
      ar: ""
    });
    toggleModalType("FEL");
    toggleModal();
  };

  const handleViewClick = (cell) => {
    setCurrentId(cell);
    getSzolgaltasok(cell);
    toggleView();
  };

  const handleEditClick = (cell) => {
    toggleModalType("MOD");
    setCurrentId(cell);
    getSzolgaltasok(cell);
    toggleModal();
  };

  const toggleDelete = () => {
    toggleDeleteModal(!isDeleteModalOpen);
  };

  const handleDeleteClick = (cell) => {
    setDeleteId(cell);
    toggleDelete();
  };

  const addSzolgatatas = () => {
    Services.addSzolgaltatas(szolgaltatasObj).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getSzolgaltasok();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const editSzolgaltatas = () => {
    Services.editSzolgaltatas(szolgaltatasObj, currentId).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getSzolgaltasok();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const deleteSzolgaltatas = () => {
    Services.deleteSzolgaltatas(deleteId).then((res) => {
      if (!res.err) {
        toggleDelete();
        props.notification("success", res.msg);
        getSzolgaltasok();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const renderModalTitle = () => {
    switch (modalType) {
      case "FEL":
        return "Szolgáltatás hozzáadása";
      case "MOD":
        return "Szolgáltatás módosítása";
      default:
        return "";
    }
  };

  const renderViewModal = () => {
    return (
      <Modal isOpen={isViewModalOpen} toggle={toggleView}>
        <ModalHeader>Szolgáltatás megtekintése</ModalHeader>
        <ModalBody>
          <div>Szolgáltatás neve: {szolgaltatasObj.nev}</div>
          <br />
          <div>Kategória: {szolgaltatasObj.kategoria}</div>
          <br />
          <div>Leírás: {szolgaltatasObj.leiras}</div>
          <br />
          <div>Ár: {szolgaltatasObj.ar}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleView()}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const renderDeleteModal = () => {
    return (
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete}>
        <ModalHeader>Szolgáltatás törlése</ModalHeader>
        <ModalBody>Valóban törölni kívánja a kiválasztott tételt?</ModalBody>
        <ModalFooter>
          <Button
            className="button--danger"
            type="submit"
            onClick={() => deleteSzolgaltatas()}
          >
            Törlés
          </Button>
          <Button className="button--secondary" onClick={() => toggleDelete()}>
            Mégsem
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const renderModal = () => {
    return (
      <React.Fragment>
        <InputGroup>
          <Label>Név:</Label>
          <Input
            name="nev"
            id="nev"
            type="text"
            onChange={handleInputChange}
            value={szolgaltatasObj.nev}
          />
        </InputGroup>
        <InputGroup>
          <Label>Kategória:</Label>
          <Input
            name="kategoria"
            id="kategoria"
            type="text"
            onChange={handleInputChange}
            value={szolgaltatasObj.kategoria}
          />
        </InputGroup>
        <InputGroup>
          <Label>Leírás:</Label>
          <Input
            name="leiras"
            id="leiras"
            type="text"
            onChange={handleInputChange}
            value={szolgaltatasObj.leiras}
          />
        </InputGroup>
        <InputGroup>
          <Label>Ár:</Label>
          <Input
            name="ar"
            id="ar"
            type="text"
            onChange={handleInputChange}
            value={szolgaltatasObj.ar}
          />
        </InputGroup>
      </React.Fragment>
    );
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSzolgaltatasObj({
      ...szolgaltatasObj,
      [e.target.name]: value,
    });
  };

  const toggleModal = () => {
    toggle(!isModalOpen);
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

  const onSubmit = (e) => {
    e.preventDefault();
    switch (modalType) {
      case "FEL": {
        addSzolgatatas();
        return;
      }
      case "MOD": {
        editSzolgaltatas();
        return;
      }
      default: {
        return;
      }
    }
  };

  // const renderTable = () => {
  //   const columns = [
  //     {
  //       dataField: "nev",
  //       text: "Szolgáltatás neve",
  //     },
  //     {
  //       dataField: "kategoria",
  //       text: "Kategória",
  //     },
  //     {
  //       dataField: "leiras",
  //       text: "Leírás",
  //     },
  //     {
  //       dataField: "ar",
  //       text: "Ár",
  //     },
  //     {
  //       dataField: "id",
  //       text: "Műveletek",
  //       formatter: (cell, row, rowIndex) =>
  //         tableIconFormatter(cell, row, rowIndex),
  //     },
  //   ];

  //   return (
  //     <BootstrapTable
  //       bootstrap4
  //       striped
  //       bordered
  //       wrapperClasses="table-responsive"
  //       keyField="id"
  //       data={szolgaltatasokJson}
  //       columns={columns}
  //     />
  //   );
  // };

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-5">
          <Button className="button--primary" onClick={() => handleNewClick()}>
            + Szolgáltatás hozzáadása
          </Button>
        </div>
        <div className="col-md-7" />
        <div className="col-md-12" />
        <br />
        {/* <div className="col-md-12">{szolgaltatasokJson && renderTable()}</div> */}
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <Form onSubmit={onSubmit}>
          <ModalHeader>{renderModalTitle()}</ModalHeader>
          <ModalBody>
            {renderModal()}
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit">
              Mentés
            </Button>
            <Button color="secondary" onClick={() => toggleModal()}>
              Mégsem
            </Button>
          </ModalFooter>
          </Form>
        </Modal>
        {renderDeleteModal()}
        {renderViewModal()}
      </div>
    </div>
  );
}

export default SzolgaltatasokContent;
