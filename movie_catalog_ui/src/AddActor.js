import React from 'react';
import { Row, Alert, Form, Button, Col } from 'react-bootstrap';
import { BsPersonFill } from "react-icons/bs";

class AddActor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            birthDate: "",
            birthPlace: "",
            poster: "",
            sex: "W",
            nameFull: "",
            height: 0,
            error: false,
            success: false
        };

        this.addActor = this.addActor.bind(this);
    }

    async addActor(){
        console.log("actor", this.state);
    }

    render() {
        return (
            <div class="panel">
                <Row style={{ justifyContent: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                    <Alert key='error-register' show={this.state.error} variant="danger">
                        Actor with this name already exists!
                          </Alert>
                </Row>
                <Row style={{ justifyContent: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                    <Alert show={this.state.success} variant="success">
                        Actor successfully created!
                          </Alert>
                </Row>
                <Row>
                    <Col xs="auto">
                        {this.state.poster === "" ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }}>
                                <BsPersonFill />
                            </div>
                        ) : (
                                <img style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }} src={this.state.poster} alt="" />
                            )}
                    </Col>
                    <Col>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <span>Link to poster</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Form.Control onChange={poster => this.setState({ poster: poster.target.value })} type="text" placeholder="Link to poster" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px'  }}>
                            <span>Name</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Form.Control onChange={name => this.setState({ name: name.target.value })} type="text" placeholder="Name" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                            <span>Name Full</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Form.Control onChange={nameF => this.setState({ nameFull: nameF.target.value })} type="text" placeholder="Name Full" />
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                    <Col>
                        <span>Birth Date</span>
                    </Col>
                    <Col>
                        <span>Birth Place</span>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Col>
                        <Form.Control onChange={birthD => this.setState({ birthPlace: birthD.target.value })} type="date" placeholder="Birth Date" />
                    </Col>
                    <Col>
                        <Form.Control onChange={birthP => this.setState({ birthPlace: birthP.target.value })} type="text" placeholder="Birth Place" />
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                    <Col>
                        <span>Sex</span>
                    </Col>
                    <Col>
                        <span>Height</span>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Col>
                        <Form.Control as="select" onInput={value  => this.setState({sex: value})} type="password" placeholder="Password repetition" >
                            <option value="M">Men</option>
                            <option value="W">Women</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control onChange={height => this.setState({height: height})} min={0} max={300} type="number" placeholder="Height" />
                    </Col>
                </Row>
                <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right' }}>
                    <Button variant="secondary" disabled={this.state.name === ""} onClick={this.addActor}>Add</Button>
                </Row>
            </div>
        );
    }
}

export default AddActor;