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
  const [isModalOpen, toggle] = useState(false);
  const [modalType, toggleModalType] = useState("FEL");
  const [referenciaObj, setReferenciaObj] = useState({
    companyName: "",
    description: "",
  });
  const [referenciakJson, setReferenciakJson] = useState(null);

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === "/admin/referenciak") {
      getReferenciak();
    }
  }, [window.location.pathname]);

  const getReferenciak = () => {
    Services.listReferenciak().then((res) => {
      if (!res.err) {
        console.log(res);
        setReferenciakJson(res);
      }
    });
  };

  const addReferencia = () => {
    Services.addReferenciak(referenciaObj).then((res) => {
      if (!res.err) {
        toggleModal();
        props.createNotification("success", res.msg);
        getReferenciak();
      } else {
        props.createNotification("error", res.msg);
      }
    });
  };

  const renderModalTitle = () => {
    switch (modalType) {
      case "FEL":
        return "Referencia hozzáadása";
      case "MOD":
        return "Referencia módosítása";
      default: return "";
    }
  };

  const renderModal = () => {
    return (
      <React.Fragment>
        <InputGroup>
          <Label>Cégnév:</Label>
          <Input
            name="companyName"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={referenciaObj.companyName}
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
          // onClick={() => handleViewClick(cell)}
        >
          <i key={rowIndex + 1} className="fa fa-eye" />
        </Button>
        <Button
          key={rowIndex + 2}
          color="link"
          // onClick={() => handleEditClick(cell)}
        >
          <i key={rowIndex + 3} className="fa fa-pencil" />
        </Button>
        <Button
          key={rowIndex + 4}
          color="link"
          // onClick={() => handleDeleteClick(cell)}
        >
          <i key={rowIndex + 5} className="fa fa-trash" />
        </Button>
      </React.Fragment>
    );
  };

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
        <Button color="primary" onClick={() => toggleModal()}>
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
          <Button color="success" type="submit" onClick={() => addReferencia()}>
            Mentés
          </Button>
          <Button color="secondary" onClick={() => toggleModal()}>
            Mégsem
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    </div>
  );
}

export default ReferenciakContent;
