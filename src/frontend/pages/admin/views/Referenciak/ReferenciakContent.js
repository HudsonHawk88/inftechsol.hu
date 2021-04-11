/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Label,
  Input,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Services from "./Services";

function ReferenciakContent(props) {
  const [ isModalOpen, toggle ] = useState(false);
  const [ isViewModalOpen, toggleViewModal ] = useState(false);
  const [ modalType, toggleModalType ] = useState("FEL");
  const [ currentId, setCurrentId ] = useState(null);
  const [ deleteId, setDeleteId ] = useState(null);
  const [ isDeleteModalOpen, toggleDeleteModal ] = useState(false);
  const [referenciaObj, setReferenciaObj] = useState({
    company_name: "",
    description: "",
  });
  const [referenciakJson, setReferenciakJson] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/admin/referenciak") {
      getReferenciak();
    }
  }, [window.location.pathname]);

  const getReferenciak = (id) => {
    if (id) {
      Services.getReferencia(id).then((res) => {
        if (!res.err) {
          console.log(res);
          setReferenciaObj(res[0]);
        }
      });
    } else {
      Services.listReferenciak().then((res) => {
        if (!res.err) {
          setReferenciakJson(res);
        }
      });
    }
  };

  const toggleView = () => {
    toggleViewModal(!isViewModalOpen);
  }

  const handleNewClick = () => {
    setReferenciaObj({
      company_name: "",
      description: ""
    })
    toggleModalType("FEL");
    toggleModal();
  }

  const handleViewClick = (cell) => {
    setCurrentId(cell);
    getReferenciak(cell);
    toggleView();
  }

  const handleEditClick = (cell) => {
    toggleModalType("MOD");
    setCurrentId(cell);
    getReferenciak(cell);
    toggleModal();
  }

  const toggleDelete = () => {
    toggleDeleteModal(!isDeleteModalOpen);
  }

  const handleDeleteClick = (cell) => {
    setDeleteId(cell);
    toggleDelete();
  }

  const addReferencia = () => {
    Services.addReferenciak(referenciaObj).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getReferenciak();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const editReferencia = () => {
    Services.editReferenciak(referenciaObj, currentId).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getReferenciak();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const deleteReferencia = () => {
    Services.deleteReferencia(deleteId).then((res) => {
      if(!res.err) {
        toggleDelete();
        props.notification("success", res.msg);
        getReferenciak();
      } else {
        props.notification("error", res.err);
      }
    })
  }



  const renderModalTitle = () => {
    switch (modalType) {
      case "FEL":
        return "Referencia hozzáadása";
      case "MOD":
        return "Referencia módosítása";
      default: return "";
    }
  };

  const renderViewModal = () => {
    return(
      <Modal isOpen={isViewModalOpen} toggle={toggleView}>
        <ModalHeader>Referencia megtekintése</ModalHeader>
        <ModalBody>
          <div>Cégnév: {referenciaObj.company_name}</div><br />
          <div>Leírás: {referenciaObj.description}</div><br />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleView()}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  const renderDeleteModal = () => {
    return(
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete}>
        <ModalHeader>Referencia törlése</ModalHeader>
        <ModalBody>Valóban törölni kívánja a kiválasztott tételt?</ModalBody>
        <ModalFooter>
          <Button className="button--danger" type="submit" onClick={() => deleteReferencia()}>
            Törlés
          </Button>
          <Button className="button--secondary" onClick={() => toggleDelete()}>
            Mégsem
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  const renderModal = () => {
    return (
      <React.Fragment>
        <InputGroup>
          <Label>Cégnév:</Label>
          <Input
            name="company_name"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={referenciaObj.company_name}
          />
        </InputGroup>
        <InputGroup>
          <Label>Leírás:</Label>
          <Input
            name="description"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={referenciaObj.description}
          />
        </InputGroup>
      </React.Fragment>
    );
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setReferenciaObj({
      ...referenciaObj,
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

  const onSubmit = () => {
    switch(modalType) {
      case "FEL": {
        addReferencia();
        break;
      }
      case "MOD": {
        editReferencia();
        break;
      }
      default: {
        break;
      }
    }
  }

  const renderTable = () => {
    const columns = [
      {
        dataField: "company_name",
        text: "Cégnév",
      },
      {
        dataField: "description",
        text: "Leírás",
      },
      {
        dataField: "id",
        text: "Műveletek",
        formatter: (cell, row, rowIndex) =>
          tableIconFormatter(cell, row, rowIndex),
      },
    ];

    return (
      <BootstrapTable bootstrap4 striped bordered wrapperClasses="table-responsive" keyField="id" data={referenciakJson} columns={columns} />
    );
  };

  return (
    <div className="card">
      <div className="row">
      <div className="col-md-3">
        <Button className="button--primary" onClick={() => handleNewClick()}>
          + Referencia hozzáadása
        </Button>
      </div>
      <div className="col-md-9" />
      <div className="col-md-12">{referenciakJson && renderTable()}</div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader>{renderModalTitle()}</ModalHeader>
        <ModalBody>
          <Form>{renderModal()}</Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={() => onSubmit()}>
            Mentés
          </Button>
          <Button color="secondary" onClick={() => toggleModal()}>
            Mégsem
          </Button>
        </ModalFooter>
      </Modal>
      {renderDeleteModal()}
      {renderViewModal()}
      </div>
    </div>
  );
}

export default ReferenciakContent;
