/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  Form,
  Label,
} from "reactstrap";
import { serializer } from "@organw/wysiwyg-editor";
import { Wysiwyg } from "../../../commons/Components";
import Services from "./Services";

function GdprContent(props) {
  const [isModalOpen, toggle] = useState(false);
  const [isViewModalOpen, toggleViewModal] = useState(false);
  const [modalType, toggleModalType] = useState("FEL");
  const [currentId, setCurrentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [gdprObj, setGdprObj] = useState({
    nev: "",
    tartalom: serializer.deserialize(
      '<p align="left" style="font-size:17px"></p>'
    ),
  });
  const [gdprJson, setGdprJson] = useState([]);
  // const [editorValue, setEditorValue] = useState(
  //   serializer.deserialize('<p align="left" style="font-size:17px"></p>')
  // );
  // ValueJson.fromJSON({ editorDefault })

  useEffect(() => {
    getGdpr();
  }, []);

  const getGdpr = (id) => {
    if (id) {
      Services.getGdpr(id).then((res) => {
        if (!res.err) {
          setGdprObj({
            nev: res[0].nev,
            tartalom: serializer.deserialize(res[0].tartalom),
          });
        }
      });
    } else {
      Services.listGdpr().then((res) => {
        if (!res.err) {
          setGdprJson(res);
        }
      });
    }
  };

  const onChangeEditor = ({ value }) => {
    setGdprObj({
      ...gdprObj,
      tartalom: value,
    });
  };

  const toggleView = () => {
    toggleViewModal(!isViewModalOpen);
  };

  const handleNewClick = () => {
    setGdprObj({
      nev: "",
      tartalom: serializer.deserialize(
        '<p align="left" style="font-size:17px"></p>'
      ),
    });
    toggleModalType("FEL");
    toggleModal();
  };

  const handleViewClick = (cell) => {
    setCurrentId(cell);
    getGdpr(cell);
    toggleView();
  };

  const handleEditClick = (cell) => {
    toggleModalType("MOD");
    setCurrentId(cell);
    getGdpr(cell);
    toggleModal();
  };

  const toggleDelete = () => {
    toggleDeleteModal(!isDeleteModalOpen);
  };

  const handleDeleteClick = (cell) => {
    setDeleteId(cell);
    toggleDelete();
  };

  const addGdpr = () => {
    let felvitelObj = {
      nev: gdprObj.nev,
      tartalom: serializer.serialize(gdprObj.tartalom),
    };
    Services.addGdpr(felvitelObj).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getGdpr();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const editGdpr = () => {
    let modositoObj = {
      nev: gdprObj.nev,
      tartalom: serializer.serialize(gdprObj.tartalom),
    };
    Services.editGdpr(modositoObj, currentId).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getGdpr();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const deleteGdpr = () => {
    Services.deleteGdpr(deleteId).then((res) => {
      if (!res.err) {
        toggleDelete();
        props.notification("success", res.msg);
        getGdpr();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const renderModalTitle = () => {
    switch (modalType) {
      case "FEL":
        return "GDPR hozzáadása";
      case "MOD":
        return "GDPR módosítása";
      default:
        return "";
    }
  };

  const renderViewModal = () => {
    return (
      <Modal isOpen={isViewModalOpen} toggle={toggleView} size="xl">
        <ModalHeader>GDPR megtekintése</ModalHeader>
        <ModalBody>
          <div>Dokumentum neve: {gdprObj.nev}</div>
          <br />
          <div>
            Leírás:
            <br />
            <Wysiwyg value={gdprObj.tartalom} contentEditable={false} />
          </div>
          <br />
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
        <ModalHeader>GDPR törlése</ModalHeader>
        <ModalBody>Valóban törölni kívánja a kiválasztott tételt?</ModalBody>
        <ModalFooter>
          <Button
            className="button--danger"
            type="submit"
            onClick={() => deleteGdpr()}
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
            onChange={(e) => handleInputChange(e)}
            value={gdprObj.nev}
          />
        </InputGroup>
        <InputGroup>
          <Label>Leírás:</Label>
          <Wysiwyg
            fontId="Editor1"
            value={gdprObj.tartalom}
            onChange={onChangeEditor}
          />
        </InputGroup>
      </React.Fragment>
    );
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setGdprObj({
      ...gdprObj,
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
    switch (modalType) {
      case "FEL": {
        addGdpr();
        return;
      }
      case "MOD": {
        editGdpr();
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
  //       text: "Dokumentum neve",
  //     },
  //     // {
  //     //   dataField: "",
  //     //   text: "Leírás",
  //     // },
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
  //       data={gdprJson}
  //       columns={columns}
  //       noDataIndication={"Nincs megjeleníthető adat!"}
  //     />
  //   );
  // };

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-5">
          <Button className="button--primary" onClick={() => handleNewClick()}>
            + GDPR hozzáadása
          </Button>
        </div>
        <div className="col-md-7" />
        <div className="col-md-12" />
        <br />
        {/* <div className="col-md-12">{renderTable()}</div> */}
        <Modal isOpen={isModalOpen} toggle={toggleModal} size="xl">
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

export default GdprContent;
