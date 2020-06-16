import React from 'react';
import NavBar from './NavBar';
import { Col, Row, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import rest from './index';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      key: "login",
      nameR: "",
      loginR: "",
      passwordR: "",
      passwordRepetitionR: "",
      errorLogin: false,
      errorRegister: false,
      register: false
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(){
    const response = await rest.register({ mail: this.state.loginR, password: this.state.passwordR, username: this.state.nameR, role: "normal"});
    if (response) {
      this.setState({
        register: true,
        errorRegister: false,
        loginR:"",
        passwordR: "",
        nameR:""
      });
    }else{
      this.setState({
        register: false,
        errorRegister: true
      });
    }
  }

  async login(){
    const response = await rest.login(this.state.login, this.state.password);
    if (!response){
      this.setState({
        errorLogin: true
      });
    }else{
      window.location= "http://localhost:3000/";
    }
  }

  render() {
    return (
      <div >
        <div class='container'>
          <div style={{ marginTop: "200px" }}>
            <Row>
              <Col xs>
                <div class="panel">
                  <Tabs defaultActiveKey="profile" activeKey={this.state.key} onSelect={(key) => this.setState({ key: key })}>
                    <Tab class="panel" eventKey="login" title="Login">
                      <div style={{ backgroundColor: '#101010' }}>
                        <Row style={{ justifyContent: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <Alert key='error-login' show={this.state.errorLogin} variant="danger">
                            Username or password is incorrect!
                          </Alert>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <span>Name</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={name => this.setState({ login: name.target.value })} type="text" placeholder="Name" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Password</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ password: pass.target.value })} type="password" placeholder="Password" />
                        </Row>
                        <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right', backgroundColor: '#101010' }}>
                          <Button variant="secondary" disabled={this.state.password === "" || this.state.login === ""} onClick={this.login} >Login</Button>
                        </Row>
                      </div>
                    </Tab>
                    <Tab class="panel" eventKey="register" title="Register">
                      <div>
                        <Row style={{ justifyContent: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <Alert key='error-register' show={this.state.errorRegister} variant="danger">
                            User with this username already exists!
                          </Alert>
                        </Row>
                        <Row style={{ justifyContent: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <Alert show={this.state.register} variant="success">
                            User successfully created!
                          </Alert>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <span>Name</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={name => this.setState({ nameR: name.target.value })} type="text" placeholder="Name" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Email</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={email => this.setState({ loginR: email.target.value })} type="email" placeholder="Email" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Password</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ passwordR: pass.target.value })} type="password" placeholder="Password" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Password repetition</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ passwordRepetitionR: pass.target.value })} type="password" placeholder="Password repetition" />
                        </Row>
                        <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right' }}>
                          <Button variant="secondary" disabled={this.state.passwordR === "" || this.state.nameR === "" || this.state.passwordR < 6 || this.state.passwordR !== this.state.passwordRepetitionR} onClick={this.register}>Register</Button>
                        </Row>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </Col>
              <Col>
                <div class="info">
                  <h1>The best database with films and actors</h1>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Login;
