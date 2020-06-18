import React from 'react';
import NavBar from './NavBar';
import { Col, Row, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import rest from './index';


class Account extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      oldPassword:"",
      newPassword:"",
      newPasswordRepetition:"",
      newMail:"",
      errorUpdate: false,
      user:null,
      username:""
    };
      this.getUser();
    }

    async getUser() {

      let userDetails = await rest.decodeUser();
      console.log("user",userDetails);
      this.setState({
        user: userDetails,
        username: userDetails.username,
      });
    }  

  render() {
    return (
      <div >
        <div class='container'>
        <div style={{ marginTop: "20px", textAlign: "center", color:"white"}}>
          <h1>Hello, {this.state.username}</h1>
        </div>
      <div style={{ marginTop: "200px" }}>
            <Row>
              <Col xs>
                <div class="panel">
                      <div style={{ backgroundColor: '#101010' }}>
                        <Row style={{ justifyContent: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <Alert key='error-login' show={this.state.errorUpdate} variant="danger">
                            Password is incorrect!
                          </Alert>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <span>Mail</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ newMail: pass.target.value })} type="email" placeholder="mail" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>New Password</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ newPassword: pass.target.value })} type="password" placeholder="Password" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Repeat Password</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ newPasswordRepetition: pass.target.value })} type="password" placeholder="Password" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                          <span>Old Password</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                          <Form.Control onChange={pass => this.setState({ oldPassword: pass.target.value })} type="password" placeholder="Password" />
                        </Row>
                        <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right', backgroundColor: '#101010' }}>
                          <Button variant="secondary" disabled={this.state.password === "" || this.state.login === ""} onClick={this.login} >Update</Button>
                        </Row>
                      </div>
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

export default Account;
