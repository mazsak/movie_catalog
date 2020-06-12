import React from 'react';
import './ItemStyle.css';
import { Row, Col } from 'react-bootstrap';

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

    render() {
        return (
            <div class='item-film'>
            <Row>
                <Col xs ='auto'>
                    <img src={this.state.poster} />
                </Col>
                <Col>
                    <h3>
                        {this.state.title}
                    </h3>
                    <h6>
                    {this.state.titleOrg}
                    </h6>
                    <h6>
                         | {this.state.genres.toString().replace(',', ' | ')} | ( {this.state.year} )
                    </h6>
                </Col>
            </Row>
            </div>
        );
    }
}

export default FilmSimpleItem;