import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardHeader,
  CardFooter,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvInput,
  AvFeedback,
  AvGroup,
  AvField,
} from "availity-reactstrap-validation";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Services from "./Services";
import { SHA256 } from "crypto-js";
import Dropzone from "react-dropzone";
import "../../App.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usersJson: [],
      user: {},
      modositObj: {},
      // formType login/register
      formType: "login",
      isModalOpen: false,
      isDeleteModalOpen: false,
      modalCim: "",
      currentId: null,
      userId: null,
      authenticated: false,
      buttonText: "Bejelentkezés",
      currentUser: {},
      avatar: [],
    };
  }

  // componentDidMount = () => {
  //   this.getUsersData();
  // };

  getUserData = (username, password) => {
    let isPassWrong = false;
    let token = SHA256(username + password);

    Services.getUserData(token, (res, err) => {
      console.log(res[0]);
    });
    let response = Services.getUserData('tg').then((res) => {
      let user = res[0];
      if (user) {
        if (user.username === username) {
          if (user.password === password) {
            return user;
          } else {
            isPassWrong = true;
            return null;
          }
        } else {
          this.props.notification("error", "A megadott felhasználónév hibás!");
          return null;
        }
      } else {
        this.props.notification(
          "error",
          "A megadott felhasználónév vagy jelszó hibás!"
        );
        this.props.onChange(false, null);
        window.history.replaceState(null, null, window.location.pathname);
      }
    });
    return response;
  };

  checkUser = (username, password) => {
    let uname = username;
    let pass = password;
    let data = this.getUserData(uname, pass);
    if (data) {
      if (this.props.onChange) {
        this.props.onChange(true, data);
      }
    }
  };

  renderLoginTitle = () => {
    const { formType } = this.state;
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleInputFile = (e) => {
    const target = e.target;
    const value = target.value;
    console.log(value);
  };

  onDrop = (files) => {
    console.log(files);
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState(
          (prevState) => ({
            avatar: [...prevState.avatar, { id: "01", src: e.target.result }],
          }),
          () => {
            console.log(this.state.avatar);
          }
        );
      };
      reader.readAsDataURL(file);
    });
  };

  renderLoginForm = () => {
    const { username, password, vezeteknev, keresztnev, avatar } = this.state;
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
                  <Label for="username">Felhasználónév:</Label>
                  <AvInput
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    required
                    onChange={(e) => this.handleInputChange(e)}
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
                    value={password}
                    required
                    onChange={(e) => this.handleInputChange(e)}
                  />
                  <AvFeedback>Mező kitöltése kötelező!</AvFeedback>
                </AvGroup>
              </div>
              <div className="col-md-2" />
              {this.state.formType === "register" && (
                <React.Fragment>
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <AvGroup>
                      <Label for="vezeteknev">Vezetéknév:</Label>
                      <AvInput
                        type="vezeteknev"
                        name="vezeteknev"
                        id="vezeteknev"
                        value={vezeteknev}
                        required
                        onChange={(e) => this.handleInputChange(e)}
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
                        value={keresztnev}
                        required
                        onChange={(e) => this.handleInputChange(e)}
                      />
                      <AvFeedback>Mező kitöltése kötelező!</AvFeedback>
                    </AvGroup>
                  </div>
                  <div className="col-md-2" />
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <Label for="avatar">Avatár feltöltése:</Label>
                    {this.state.avatar.length < 1 && (
                      <Dropzone
                        className="dropzone"
                        onDrop={this.onDrop}
                        accept="image/png"
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: "dropzone" })}>
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
                                onClick={() => this.setState({ avatar: [] })}
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

  toggleButtonText = () => {
    const { formType } = this.state;
    let newType;
    let text;
    if (formType === "register") {
      newType = "login";
      text = "Regisztráció";
    } else {
      newType = "register";
      text = "Bejelentkezés";
    }
    this.setState({
      formType: newType,
      buttonText: text,
    });
  };

  submitLoginForm = async () => {
    const { username, password, vezeteknev, keresztnev, avatar } = this.state;
    if (this.state.formType === "login") {
      this.checkUser(username, password);
    }
    if (this.state.formType === "register") {
      let submitObj = {};
      submitObj.username = username;
      submitObj.password = password;
      submitObj.keresztnev = keresztnev;
      submitObj.vezeteknev = vezeteknev;
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

  render() {
    const { formType, buttonText } = this.state;
    return (
      <div className="loginform">
        <AvForm onValidSubmit={this.submitLoginForm}>
          <Card>
            <CardHeader>
              <Button color="primary" onClick={this.toggleButtonText}>
                {buttonText}
              </Button>
            </CardHeader>
            <CardBody>
              <CardTitle>{this.renderLoginTitle()}</CardTitle>
              {this.renderLoginForm()}
            </CardBody>
            <CardFooter>
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
}
export default Login;
