import React from 'react';
import './ItemStyle.css';
import { Row, Col } from 'react-bootstrap';
import { BsPersonFill } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

class ActorSimpleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.id,
            name: this.props.item.name,
            birthDate: this.props.item.birthDate,
            birthPlace: this.props.item.birthPlace,
            nameFull: this.props.item.nameFull,
            poster: this.props.item.poster,
            votes: this.props.item.votes,
            rate: this.props.item.rate,
        };
        console.log(this.state.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                id: this.props.item.id,
                name: this.props.item.name,
                birthDate: this.props.item.birthDate,
                birthPlace: this.props.item.birthPlace,
                nameFull: this.props.item.nameFull,
                poster: this.props.item.poster,
                votes: this.props.item.votes,
                rate: this.props.item.rate,
            });
        }
    }

    render() {
        return (
            <div class='item-film'>
                <Row>
                    <Col xs='auto'>
                        <div style={{ marginTop: '20px', color: 'white' }}>
                            {this.state.poster === "null" ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }}>
                                    <BsPersonFill />
                                </div>
                            ) : (
                                    <img src={this.state.poster} alt="" />
                                )}
                        </div>
                    </Col>
                    <Col >
                        <div style={{ marginTop: '20px', color: 'white' }}>
                            <h3>
                                {this.state.name}
                            </h3>
                        </div>
                        <h6>
                            {this.state.nameFull !== "null" ? this.state.nameFull : ""}
                        </h6>
                        <h6>
                            ( {this.state.birthDate!== "null"? this.state.birthDate: "Unknown"},  {this.state.birthPlace !== "null"? this.state.birthPlace : "Unknown"})
                    </h6>
                    </Col>
                    <Col xs='auto'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '180px' }}>
                            <Row>
                                <div>
                                    <BsFillStarFill color="gray" size="40px" />
                                    <p style={{ position: 'relative', bottom: '28px', textAlign: 'center' }}>{this.state.rate !== "NaN" ? Number(parseFloat(this.state.rate)).toFixed(2) : "0.0"}</p>
                                </div>
                            </Row>
                            <Row>
                                <p style={{ fontSize: '12px', marginTop: '30px', textAlign: 'center' }}>{this.state.votes}</p>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ActorSimpleItem;