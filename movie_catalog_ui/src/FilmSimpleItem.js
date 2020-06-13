import React from 'react';
import './ItemStyle.css';
import { Row, Col } from 'react-bootstrap';
import { BsFilm } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";

class FilmSimpleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.item.title,
            titleOrg: this.props.item.title_org,
            year: this.props.item.year,
            poster: this.props.item.poster,
            votes: this.props.item.votes,
            rate: this.props.item.rate,
            genres: this.props.item.genres,
            duration: this.props.item.duration,
            description: this.props.item.description
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
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
                        {this.state.poster == "null" ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }}>
                                <BsFilm />
                            </div>
                        ) : (
                                <img src={this.state.poster} />
                            )}
                    </Col>
                    <Col>
                        <h3 style={{marginTop: '20px'}}>
                            {this.state.title}
                        </h3>
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
                                    <BsFillStarFill  color="gray" size="40px" />
                                    <p style={{ position:'relative', bottom: '28px', textAlign: 'center' }}>{this.state.rate != "NaN" ? Number(parseFloat(this.state.rate)).toFixed(2) : "0.0"}</p>
                                </div>
                            </Row>
                            <Row>
                                <p style={{ fontSize: '12px', marginTop:'30px', textAlign: 'center'}}>{this.state.votes}</p>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FilmSimpleItem;