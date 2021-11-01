import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardHeader,
  Form,
  Input
} from "reactstrap";
import Services from "./Services";

function Login(props) {
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setLoginObj({
      ...loginObj,
      [e.target.name]: value,
    });
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    Services.login(loginObj).then((res, err) => {
        if(!err) {
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('token', res.token);
            props.setUser(res.user);
            window.location.href = '/admin';
        } else {
          props.notification('error', res.msg)
        }
    });
  };

  const renderLoginForm = () => {
    return (
      <div className='loginform'>
      
        <Card className='loginfrom__card'>
        <Form onSubmit={submitLoginForm}>
          <CardHeader>
            <CardTitle>Bejelentkezés</CardTitle>
          </CardHeader>
          <CardBody>
            
              <Input type='email' name='email' id='email' placeholder='Email cím' onChange={handleInputChange} value={loginObj.email}  />
              <br />
              <Input type='password' name='password' id='password' placeholder='Jelszó' onChange={handleInputChange} value={loginObj.password}  />
              <br />
              <Button type="submit" color='success'>Bejelentkezése</Button>
          </CardBody>
          </Form>
        </Card>
      
      </div>
    );
  };

  return (
      renderLoginForm()
  );
}
export default Login;
