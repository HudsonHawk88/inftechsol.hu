/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvField,
  AvFeedback,
} from "availity-reactstrap-validation";
import BootstrapTable from "react-bootstrap-table-next";
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
    orszag: {
      orszagnev: "",
      orszagid: null,
    },
    irszam: null,
    telepules: {
      id: "",
      telepulesnev: "",
    },
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
  const [orszagokJson, setOrszagokJson] = useState([]);
  const [telepulesekJson, setTelepulesekJson] = useState([]);
  const [telepulesekOptions, setTelepulesekOptions] = useState([]);
  const defaultOrszagKod = "hun";

  const isIrszamTyped = () => {
    if (elerhetosegObj.irszam && elerhetosegObj.irszam.length === 4) {
      return true;
    } else {
      return false;
    }
  };

  const setDefaultOrszag = () => {
    let orszagJson = elerhetosegObj.orszag;
    orszagokJson.forEach((orszag) => {
      if (orszag.orszagkod === defaultOrszagKod) {
        orszagJson.orszagid = orszag.id;
        orszagJson.orszagnev = orszag.orszagnev;
        setElerhetosegObj({
          titulus: "",
          vezeteknev: "",
          keresztnev: "",
          orszag: orszagJson,
          irszam: null,
          telepules: {
            id: "",
            telepulesnev: "",
          },
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
      }
    });
  };

  useEffect(() => {
    if (window.location.pathname === "/admin/elerhetosegek") {
      getElerhetosegek();
      getOrszagok();
      getTelepulesek();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (isIrszamTyped()) {
      const id = elerhetosegObj.irszam;
      getTelepulesek(id);
    }
  }, [isIrszamTyped()]);

  const getOrszagok = () => {
    Services.listOrszagok().then((res) => {
      if (!res.err) {
        setOrszagokJson(res);
      }
    });
  };

  const getTelepulesek = (id) => {
    if (id) {
      telepulesekJson.forEach((telepules) => {
        if (telepules.irszam === id) {
          let telepulesArray = [];
          telepulesArray.push(telepules);
          setTelepulesekOptions(telepulesArray);
        }
      });
    } else {
      Services.listTelepulesek().then((res) => {
        if (!res.err) {
          setTelepulesekJson(res);
        }
      });
    }
  };

  const renderOrszagokOptions = () => {
    if (orszagokJson.length !== 0) {
      return orszagokJson.map((orszag) => {
        return (
          <option key={orszag.id} value={orszag.id} label={orszag.orszagnev}>
            {orszag.orszagnev}
          </option>
        );
      });
    }
  };

  const renderTelepulesekOptions = () => {
    if (telepulesekOptions.length !== 0) {
      return telepulesekOptions.map((telepules) => {
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
          setTelepulesekOptions([res[0].telepules]);
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
          <AvGroup>
            <Label>Titulus:</Label>
            <AvInput
              name="titulus"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.titulus}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-5">
          <AvGroup>
            <Label>Vezetéknév:</Label>
            <AvInput
              name="vezeteknev"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.vezeteknev}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-5">
          <AvGroup>
            <Label>Keresztnév:</Label>
            <AvInput
              name="keresztnev"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.keresztnev}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-5">
          <AvGroup>
            <Label>Ország:</Label>
            <AvField
              type="select"
              id={elerhetosegObj.orszag.orszagnev}
              name="orszag"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.orszag.orszagid}
            >
              <option key="default" value="">
                {"Kérjük válasszon országot..."}
              </option>
              {renderOrszagokOptions()}
            </AvField>
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-2">
          <AvGroup>
            <Label>Irányítószám:</Label>
            <AvField
              name="irszam"
              type="number"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.irszam}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Ez a mező kitöltése kötelező!",
                },
                minLength: {
                  value: 4,
                  errorMessage:
                    "Az irányítószámnak pontosan 4 számjegyűnek kell lennie!",
                },
                maxLength: {
                  value: 4,
                  errorMessage:
                    "Az irányítószámnak pontosan 4 számjegyűnek kell lennie!",
                },
              }}
            />
          </AvGroup>
        </div>
        <div className="col-md-5">
          <AvGroup>
            <Label>Település:</Label>
            <AvField
              type="select"
              name="telepules"
              disabled={
                !elerhetosegObj.irszam ||
                (elerhetosegObj.irszam && elerhetosegObj.irszam.length !== 4)
              }
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.telepules.id}
            >
              <option key="default" value="">
                {"Kérjük válasszon települést..."}
              </option>
              {renderTelepulesekOptions()}
            </AvField>
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-3">
          <AvGroup>
            <Label>Közterület:</Label>
            <AvInput
              name="kozterulet"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.kozterulet}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-3">
          <AvGroup>
            <Label>Házszám:</Label>
            <AvInput
              name="hazszam"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.hazszam}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-3">
          <AvGroup>
            <Label>Helyrajzi szám:</Label>
            <AvInput
              name="hrsz"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.hrsz}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-3">
          <AvGroup>
            <Label>Postafiók:</Label>
            <AvInput
              name="postafiok"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.postafiok}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-4">
          <AvGroup>
            <Label>Épület:</Label>
            <AvInput
              name="epulet"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.epulet}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-4">
          <AvGroup>
            <Label>Emelet:</Label>
            <AvInput
              name="emelet"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.emelet}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-4">
          <AvGroup>
            <Label>Ajtó:</Label>
            <AvInput
              name="ajto"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.ajto}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-6">
          <AvGroup>
            <Label>Telefon:</Label>
            <AvInput
              name="telefon"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.telefon}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
        <div className="col-md-6">
          <AvGroup>
            <Label>Email:</Label>
            <AvInput
              name="email"
              type="email"
              onChange={(e) => handleInputChange(e)}
              value={elerhetosegObj.email}
            />
            <AvFeedback>Ez a mező kitöltése kötelező!</AvFeedback>
          </AvGroup>
        </div>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.name === "orszag") {
      let orszagJson = elerhetosegObj.orszag;
      orszagJson.orszagid = value;
      orszagokJson.forEach((orszag) => {
        if (value === orszag.id) {
          orszagJson.orszagnev = orszag.orszagnev;
        }
      });
      setElerhetosegObj({
        ...elerhetosegObj,
        [e.target.name]: orszagJson,
      });
    } else if (e.target.name === "telepules") {
      let telepulesJson = elerhetosegObj.telepules;
      telepulesJson.id = value;
      telepulesekJson.forEach((telepules) => {
        if (value === telepules.id) {
          telepulesJson.telepulesnev = telepules.telepulesnev;
        }
      });
      setElerhetosegObj({
        ...elerhetosegObj,
        [e.target.name]: telepulesJson,
      });
    } else {
      setElerhetosegObj({
        ...elerhetosegObj,
        [e.target.name]: value,
      });
    }
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

  const onSubmit = () => {
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

  const renderTable = () => {
    const columns = [
      {
        dataField: "nev",
        text: "Név",
        formatter: (cell, row) => nevFormatter(row),
      },
      {
        dataField: "irszam",
        text: "Cím",
        formatter: (cell, row) => cimFormatter(row),
      },
      {
        dataField: "telefon",
        text: "Telefon",
      },
      {
        dataField: "email",
        text: "E-mail",
      },
      {
        dataField: "id",
        text: "Műveletek",
        formatter: (cell, row, rowIndex) =>
          tableIconFormatter(cell, row, rowIndex),
      },
    ];

    return (
      <BootstrapTable
        noDataIndication="Ez a tábla még üres..."
        wrapperClasses="table-responsive"
        keyField="id"
        data={elerhetosegekJson}
        columns={columns}
      />
    );
  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-12" />
        <br />
        <div className="col-md-5">
          <Button className="button--primary" onClick={() => handleNewClick()}>
            + Elérhetőség hozzáadása
          </Button>
        </div>
        <div className="col-md-7" />
        <div className="col-md-12" />
        <br />
        <div className="col-md-12">{elerhetosegekJson && renderTable()}</div>
        <Modal isOpen={isModalOpen} toggle={toggleModal} size="xl">
          <ModalHeader>{renderModalTitle()}</ModalHeader>
          <ModalBody>
            <AvForm>{renderModal()}</AvForm>
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

export default ElerhetosegekContent;
