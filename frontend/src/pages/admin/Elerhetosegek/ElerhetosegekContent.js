/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import Services from "./Services";

function ElerhetosegekContent(props) {
  const [isModalOpen, toggle] = useState(false);
  const [isViewModalOpen, toggleViewModal] = useState(false);
  const [modalType, toggleModalType] = useState("FEL");
  const [currentId, setCurrentId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [elerhetosegObj, setElerhetosegObj] = useState({
    titulus: "",
    vezeteknev: "",
    keresztnev: "",
    orszag: '',
    irszam: '',
    telepules: '',
    kozterulet: "",
    hazszam: "",
    hrsz: "",
    postafiok: "",
    epulet: "",
    emelet: "",
    ajto: "",
    telefon: "",
    email: "",
  });
  const [elerhetosegekJson, setElerhetosegekJson] = useState([]);
  const [orszagok, setOrszagok] = useState([]);
  const [telepulesek, setTelepulesek] = useState([]);

  const isIrszamTyped = () => {
    if (elerhetosegObj.irszam && elerhetosegObj.irszam.length === 4) {
      return true;
    } else {
      return false;
    }
  };

  const setDefault = (orszagok) => {
    const lang = navigator.language;

    if (lang === 'hu-HU') {
        orszagok.forEach((orsz) => {
            if (orsz.orszagkod === 'hun') {
                setElerhetosegObj({
                    ...elerhetosegObj,
                    orszag: orsz.id
                });
            }
        });
    }
}

  const init = () => {
    Services.listOrszagok().then((res, err) => {
      if (!err) {
        setOrszagok(res);
        setDefault(res);
      } else {
        props.notification('error', res.msg)
      }
        
    });
    Services.listTelepulesek().then((res, err) => {
        setTelepulesek(res);
    });
}

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isIrszamTyped()) {
      const id = elerhetosegObj.irszam;
      Services.getTelepules(id).then((res, err) => {
        if (!err) {
          setElerhetosegObj({
            ...elerhetosegObj,
            telepules: res[0].id
          });
        } else {
          props.notification('error', res.msg)
        }
      });
    }
  }, [isIrszamTyped()]);

  const renderOrszagokOptions = () => {
    if (orszagok.length !== 0) {
      return orszagok.map((orszag) => {
        return (
          <option key={orszag.id} value={orszag.id}>
            {orszag.orszagnev}
          </option>
        );
      });
    }
  };

  const renderTelepulesekOptions = () => {
    if (telepulesek.length !== 0) {
      return telepulesek.map((telepules) => {
        return (
          <option key={telepules.id} value={telepules.id}>
            {telepules.telepulesnev}
          </option>
        );
      });
    }
  };

  const getElerhetosegek = (id) => {
    if (id) {
      Services.getElerhetoseg(id).then((res) => {
        if (!res.err) {
          setElerhetosegObj(res[0]);
        }
      });
    } else {
      Services.listElerhetosegek().then((res) => {
        if (!res.err) {
          setElerhetosegekJson(res);
        }
      });
    }
  };

  const toggleView = () => {
    toggleViewModal(!isViewModalOpen);
  };

  const handleNewClick = () => {
    setDefaultOrszag();
    toggleModalType("FEL");
    toggleModal();
  };

  const handleViewClick = (cell) => {
    setCurrentId(cell);
    getElerhetosegek(cell);
    toggleView();
  };

  const handleEditClick = (cell) => {
    toggleModalType("MOD");
    setCurrentId(cell);
    getElerhetosegek(cell);
    toggleModal();
  };

  const toggleDelete = () => {
    toggleDeleteModal(!isDeleteModalOpen);
  };

  const handleDeleteClick = (cell) => {
    setDeleteId(cell);
    toggleDelete();
  };

  const addElerhetoseg = () => {
    Services.addElerhetoseg(elerhetosegObj).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getElerhetosegek();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const editElerhetoseg = () => {
    Services.editElerhetoseg(elerhetosegObj, currentId).then((res) => {
      if (!res.err) {
        toggleModal();
        props.notification("success", res.msg);
        getElerhetosegek();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const deleteElerhetoseg = () => {
    Services.deleteElerhetoseg(deleteId).then((res) => {
      if (!res.err) {
        toggleDelete();
        props.notification("success", res.msg);
        getElerhetosegek();
      } else {
        props.notification("error", res.err);
      }
    });
  };

  const renderModalTitle = () => {
    switch (modalType) {
      case "FEL":
        return "Elérhetőség hozzáadása";
      case "MOD":
        return "Elérhetőség módosítása";
      default:
        return "";
    }
  };

  const renderViewModal = () => {
    return (
      <Modal isOpen={isViewModalOpen} toggle={toggleView}>
        <ModalHeader>Elérhetőség megtekintése</ModalHeader>
        <ModalBody>
          <div>Név: {nevFormatter(elerhetosegObj)}</div>
          <br />
          <div>Cím: {cimFormatter(elerhetosegObj)}</div>
          <br />
          <div>Telefonszám: {elerhetosegObj.telefon}</div>
          <br />
          <div>Email: {elerhetosegObj.email}</div>
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
        <ModalHeader>Elérhetőség törlése</ModalHeader>
        <ModalBody>Valóban törölni kívánja a kiválasztott tételt?</ModalBody>
        <ModalFooter>
          <Button
            className="button--danger"
            type="submit"
            onClick={() => deleteElerhetoseg()}
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
      <div className="row">
        <div className="col-md-2">
          <InputGroup>
            <Label>Titulus:</Label>
            <Input
              name="titulus"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.titulus}
            />
          </InputGroup>
        </div>
        <div className="col-md-5">
          <InputGroup>
            <Label>Vezetéknév:</Label>
            <Input
              name="vezeteknev"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.vezeteknev}
            />
          </InputGroup>
        </div>
        <div className="col-md-5">
          <InputGroup>
            <Label>Keresztnév:</Label>
            <Input
              name="keresztnev"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.keresztnev}
            />
          </InputGroup>
        </div>
        <div className="col-md-5">
          <InputGroup>
            <Label>Ország:</Label>
            <Input
              type="select"
              id="orszag"
              name="orszag"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.orszag}
            >
              <option key="default" value="">
                {"Kérjük válasszon országot..."}
              </option>
              {renderOrszagokOptions()}
            </Input>
          </InputGroup>
        </div>
        <div className="col-md-2">
          <InputGroup>
            <Label>Irányítószám:</Label>
            <Input
              name="irszam"
              id="irszam"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.irszam}
            />
          </InputGroup>
        </div>
        <div className="col-md-5">
          <InputGroup>
            <Label>Település:</Label>
            <Input
              type="select"
              name="telepules"
              id="telepules"
              disabled={
                !elerhetosegObj.irszam ||
                (elerhetosegObj.irszam && elerhetosegObj.irszam.length !== 4)
              }
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.telepules}
            >
              <option key="default" value="">
                {"Kérjük válasszon települést..."}
              </option>
              {renderTelepulesekOptions()}
            </Input>
          </InputGroup>
        </div>
        <div className="col-md-3">
          <InputGroup>
            <Label>Közterület:</Label>
            <Input
              name="kozterulet"
              id="kozterulet"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.kozterulet}
            />
          </InputGroup>
        </div>
        <div className="col-md-3">
          <InputGroup>
            <Label>Házszám:</Label>
            <Input
              name="hazszam"
              id="hazszam"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.hazszam}
            />
          </InputGroup>
        </div>
        <div className="col-md-3">
          <InputGroup>
            <Label>Helyrajzi szám:</Label>
            <Input
              name="hrsz"
              id="hrsz"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.hrsz}
            />
          </InputGroup>
        </div>
        <div className="col-md-3">
          <InputGroup>
            <Label>Postafiók:</Label>
            <Input
              name="postafiok"
              id="postafiok"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.postafiok}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          <InputGroup>
            <Label>Épület:</Label>
            <Input
              name="epulet"
              id="epulet"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.epulet}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          <InputGroup>
            <Label>Emelet:</Label>
            <Input
              name="emelet"
              id="emelet"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.emelet}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          <InputGroup>
            <Label>Ajtó:</Label>
            <Input
              name="ajto"
              id="ajto"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.ajto}
            />
          </InputGroup>
        </div>
        <div className="col-md-6">
          <InputGroup>
            <Label>Telefon:</Label>
            <Input
              name="telefon"
              id="telefon"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.telefon}
            />
          </InputGroup>
        </div>
        <div className="col-md-6">
          <InputGroup>
            <Label>Email:</Label>
            <Input
              name="email"
              id="email"
              type="email"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.email}
            />
          </InputGroup>
        </div>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setElerhetosegObj({
      ...elerhetosegObj,
      [e.target.name]: value,
    });
  };

  const toggleModal = () => {
    toggle(!isModalOpen);
  };

  const undefinedToNull = (value) => {
    if (value === "undefined") {
      return null;
    } else {
      return value;
    }
  };

  const cimFormatter = (row) => {
    if (undefinedToNull(row.hazszam)) {
      if (undefinedToNull(row.emelet)) {
        if (undefinedToNull(row.epulet)) {
          return `${row.irszam}, ${row.telepules.telepulesnev}, ${row.kozterulet} ${row.hazszam}. ${row.epulet} ép. ${row.emelet}/${row.ajto}.`;
        } else {
          return `${row.irszam}, ${row.telepules.telepulesnev}, ${row.kozterulet} ${row.hazszam}. ${row.emelet}/${row.ajto}.`;
        }
      } else {
        return `${row.irszam}, ${row.telepules.telepulesnev}, ${row.kozterulet} ${row.hazszam}.`;
      }
    } else if (undefinedToNull(row.postafiok)) {
      return `${row.irszam}, ${row.telepules.telepulesnev}, ${row.postafiok}.`;
    } else {
      return `${row.irszam}, ${row.telepules.telepulesnev}, ${row.hrsz}.`;
    }
  };

  const nevFormatter = (row) => {
    return `${row.titulus} ${row.vezeteknev} ${row.keresztnev}`;
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
        addElerhetoseg();
        break;
      }
      case "MOD": {
        editElerhetoseg();
        break;
      }
      default: {
        break;
      }
    }
  };

  // const renderTable = () => {
  //   const columns = [
  //     {
  //       dataField: "nev",
  //       text: "Név",
  //       formatter: (cell, row) => nevFormatter(row),
  //     },
  //     {
  //       dataField: "irszam",
  //       text: "Cím",
  //       formatter: (cell, row) => cimFormatter(row),
  //     },
  //     {
  //       dataField: "telefon",
  //       text: "Telefon",
  //     },
  //     {
  //       dataField: "email",
  //       text: "E-mail",
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
  //       noDataIndication="Ez a tábla még üres..."
  //       wrapperClasses="table-responsive"
  //       keyField="id"
  //       data={elerhetosegekJson}
  //       columns={columns}
  //     />
  //   );
  // };

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-5">
          <Button className="button--primary" onClick={() => handleNewClick()}>
            + Elérhetőség hozzáadása
          </Button>
        </div>
        <div className="col-md-7" />
        <div className="col-md-12" />
        <br />
        {/* <div className="col-md-12">{elerhetosegekJson && renderTable()}</div> */}
        <Modal isOpen={isModalOpen} toggle={toggleModal} size="xl">
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

export default ElerhetosegekContent;
