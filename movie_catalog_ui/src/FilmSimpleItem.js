import React from 'react';
import './ItemStyle.css';
import { Row, Col } from 'react-bootstrap';
import { BsFilm } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

class FilmSimpleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.id,
            title: this.props.item.title,
            titleOrg: this.props.item.titleOrg,
            year: this.props.item.year,
            poster: this.props.item.poster,
            votes: this.props.item.votes,
            rate: this.props.item.rate,
            genres: this.props.item.genres,
            duration: this.props.item.duration,
            description: this.props.item.description
        };
        console.log(this.state.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                id: this.props.item.id,
                title: this.props.item.title,
                titleOrg: this.props.item.titleOrg,
                year: this.props.item.year,
                poster: this.props.item.poster,
                votes: this.props.item.votes,
                rate: this.props.item.rate,
                genres: this.props.item.genres,
                duration: this.props.item.duration,
            });
        }
    }

    render() {
        return (
            <div class='item-film'>
                <Row>
                    <Col xs='auto'>
                        <Link to={"/films/details/" + this.state.id} style={{ marginTop: '20px', color: 'white' }}>
                            {this.state.poster === "null" ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }}>
                                    <BsFilm />
                                </div>
                            ) : (
                                    <img src={this.state.poster} alt="" />
                                )}
                        </Link>
                    </Col>
                    <Col >
                        <Link to={"/films/details/" + this.state.id} style={{ marginTop: '20px', color: 'white' }}>
                            <h3>
                                {this.state.title}
                            </h3>
                        </Link>
                        <h6>
                            {this.state.titleOrg}
                        </h6>
                        <h6>
                            | {this.state.genres.toString().replace(',', ' | ')} | ( {this.state.year} )
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

export default FilmSimpleItem;