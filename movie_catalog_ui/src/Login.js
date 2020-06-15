import React from 'react';
import NavBar from './NavBar';
import { Col, Row, Form, Button, Tabs, Tab } from 'react-bootstrap';
import RestController from './RestController';

const rest = new RestController();

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      key: "login",
      nameR:"",
      loginR:"",
      passwordR: "",
      passwordRepetitionR: ""
    };
  }

  componentDidUpdate() {
    console.log(this.state)
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
                      <div style={{backgroundColor: '#101010'}}>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Email</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={email => this.setState({ login: email.target.value })} type="email" placeholder="Email" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Password</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ password: pass.target.value })} type="password" placeholder="Password" />
                        </Row>
                        <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right', backgroundColor: '#101010' }}>
                          <Button variant="secondary" disabled={this.state.password === "" || this.state.login === ""} onClick={event => rest.login(this.state.login, this.state.password)} >Login</Button>
                        </Row>
                      </div>
                    </Tab>
                    <Tab class="panel" eventKey="register" title="Register">
                      <div>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Name and surname</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={name =>  this.setState({ nameR: name.target.value })} type="text" placeholder="Name and surname" />
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
                          <Form.Control onChange={pass => this.setState({ passwordRepetitionR: pass.target.value })}type="password" placeholder="Password repetition" />
                        </Row>
                        <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right' }}>
                          <Button variant="secondary" disabled={this.state.passwordR === "" || this.state.loginR === "" || this.state.passwordR < 6 || this.state.passwordR !== this.state.passwordRepetitionR} onClick={event => rest.register({email:this.state.loginR, password:this.state.passwordR, name: this.state.nameR})} >Register</Button>
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
