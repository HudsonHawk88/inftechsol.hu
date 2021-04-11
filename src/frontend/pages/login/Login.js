import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardHeader,
  CardFooter,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvInput,
  AvFeedback,
  AvGroup,
} from "availity-reactstrap-validation";
import Services from "./Services";
import Dropzone from "react-dropzone";

function Login(props) {
  const [formType, setFormType] = useState("login");
  const [buttonText, setButtonText] = useState("Regisztráció");
  const [avatar, setAvatar] = useState([]);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    vezeteknev: "",
    keresztnev: "",
  });

  const getUserData = (email, password) => {
    Services.getUserData(email, password).then((res) => {
      if (!res[0].error) {
        document.cookie = `token=${res[0].token}`;
        document.cookie = `auth=${true}`;
        document.cookie = `isAdmin=${res[0].is_admin}`;
        window.location.replace("/admin");
      } else {
        props.notification("error", res.err);
        props.onChange(false, null);
        window.history.replaceState(null, null, window.location.pathname);
      }
    });
  };

  const renderLoginTitle = () => {
    switch (formType) {
      case "login": {
        return "Bejelentkezés";
      }
      case "register": {
        return "Regisztráció";
      }
      default: {
        return;
      }
    }
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  const handleInputFile = (e) => {
    const target = e.target;
    const value = target.value;
    console.log(value);
  };

  const onDrop = (files) => {
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(
          {
            avatar: [...avatar, { id: "01", src: e.target.result }],
          },
          () => console.log(avatar)
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const renderLoginForm = () => {
    const previewStyle = {
      display: "inline",
      width: 300,
      height: 300,
    };
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-8">
                <AvGroup>
                  <Label for="email">Email:</Label>
                  <AvInput
                    type="email"
                    name="email"
                    id="email"
                    value={inputs.email}
                    required
                    onChange={(e) => handleInputChange(e)}
                  />
                  <AvFeedback>Mező kitöltése kötelező!</AvFeedback>
                </AvGroup>
              </div>
              <div className="col-md-2" />
              <div className="col-md-2" />
              <div className="col-md-8">
                <AvGroup>
                  <Label for="password">Jelszó:</Label>
                  <AvInput
                    type="password"
                    name="password"
                    id="password"
                    value={inputs.password}
                    required
                    onChange={(e) => handleInputChange(e)}
                  />
                  <AvFeedback>Mező kitöltése kötelező!</AvFeedback>
                </AvGroup>
              </div>
              <div className="col-md-2" />
              {formType === "register" && (
                <React.Fragment>
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <AvGroup>
                      <Label for="vezeteknev">Vezetéknév:</Label>
                      <AvInput
                        type="vezeteknev"
                        name="vezeteknev"
                        id="vezeteknev"
                        value={inputs.vezeteknev}
                        required
                        onChange={(e) => handleInputChange(e)}
                      />
                      <AvFeedback>Mező kitöltése kötelező!</AvFeedback>
                    </AvGroup>
                  </div>
                  <div className="col-md-2" />
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <AvGroup>
                      <Label for="vezeteknev">Keresztnév:</Label>
                      <AvInput
                        type="keresztnev"
                        name="keresztnev"
                        id="keresztnev"
                        value={inputs.keresztnev}
                        required
                        onChange={(e) => handleInputChange(e)}
                      />
                      <AvFeedback>Mező kitöltése kötelező!</AvFeedback>
                    </AvGroup>
                  </div>
                  <div className="col-md-2" />
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <Label for="avatar">Avatár feltöltése:</Label>
                    {avatar.length < 1 && (
                      <Dropzone
                        className="loginform__dropzone"
                        onDrop={this.onDrop}
                        accept="image/png"
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps({
                              className: "loginform__dropzone",
                            })}
                          >
                            <input {...getInputProps()} />
                            Kattintson ide a kép feltöltéséhez!
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {avatar.length !== 0 &&
                      avatar.map((item) => {
                        return (
                          <Card key={item.id}>
                            <CardBody>
                              <img src={item.src} style={previewStyle} />
                            </CardBody>
                            <CardFooter>
                              <Button
                                color="danger"
                                style={{ width: "100%" }}
                                onClick={() => setAvatar({ avatar: [] })}
                              >
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                &nbsp; Törlés
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                  </div>
                  <div className="col-md-2" />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const toggleButtonText = () => {
    let newType;
    let text;
    if (formType === "register") {
      newType = "login";
      text = "Regisztráció";
    } else {
      newType = "register";
      text = "Bejelentkezés";
    }
    setFormType(newType);
    setButtonText(text);
  };

  const submitLoginForm = async () => {
    if (formType === "login") {
      getUserData(inputs.email, inputs.password);
    }
    if (formType === "register") {
      let submitObj = {};
      submitObj.email = inputs.email;
      submitObj.username = inputs.username;
      submitObj.password = inputs.password;
      submitObj.keresztnev = inputs.keresztnev;
      submitObj.vezeteknev = inputs.vezeteknev;
      submitObj.avatar = avatar;
      let response = await Services.addUser(submitObj);
      response.json().then((value) => {
        if (this.props.notification) {
          if (response.status === 200) {
            this.props.notification("success", value.msg);
          } else {
            this.props.notification("error", value.msg);
          }
        }
      });
    }
  };

  return (
    <div className="loginform">
      <AvForm onValidSubmit={() => submitLoginForm()}>
        <Card className="loginform__card">
          <CardHeader className="loginform__card-header">
            <Button color="primary" onClick={() => toggleButtonText()}>
              {buttonText}
            </Button>
          </CardHeader>
          <CardBody className="loginform__card-body">
            <CardTitle>{renderLoginTitle()}</CardTitle>
            {renderLoginForm()}
          </CardBody>
          <CardFooter className="loginform__card-footer">
            {formType === "register" ? (
              <Button type="submit" color="info">
                Regisztrálok
              </Button>
            ) : (
              <Button type="submit" color="info">
                Bejelentkezés
              </Button>
            )}
          </CardFooter>
        </Card>
      </AvForm>
    </div>
  );
}
export default Login;
