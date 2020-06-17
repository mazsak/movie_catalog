import React from 'react';
import { Row, Alert, Form, Button, Col, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { BsPersonFill } from "react-icons/bs";

class AddFilm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: "",
            titleOrg: "",
            premiere: "",
            premiereLocal: "",
            rate: "",
            votes: "",
            year: 0,
            duration:0,
            poster:"",
            genres:[],
            allGenres:"",
            cast:[],
            description:"",
        };
console.log("add film",this.state);

        // if (Object.keys(this.state.id === String){

        // }

        this.addFilm = this.addFilm.bind(this);
    }

    async addFilm(){
        console.log("film", this.state);
    }

    viewGenres() {
        const items = ["Short", "Documentary", "Western", "Drama", "Adventure", "Comedy", "Action", "Sports", "Crime", "Romance", "Mystery", "Spy", "Fantasy", "War", "Horror", "Silent", "Thriller", "Historical", "Musical", "Animated", "Science Fiction"];
        const allGenres = [];
        for (var i = 0; i < items.length; i++) {
            allGenres.push(<Dropdown.Item onClick={genre => {
                const index = this.state.genres.indexOf(genre.target.id)
                if (index > -1) {
                    this.state.genres.splice(index, 1);
                } else {
                    this.state.genres.push(genre.target.id);
                }
                this.setState({allGenres:this.state.genres.toString()})
            }} id={items[i]}>{items[i]}</Dropdown.Item>);
        }
    
        return allGenres;
      }

    render() {
        return (
            <div class="panel">
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
                            <span>Title</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Form.Control onChange={title => this.setState({ title: title.target.value })} type="text" placeholder="Title" />
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                            <span>Original title</span>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Form.Control onChange={titleOrg => this.setState({ titleOrg: titleOrg.target.value })} type="text" placeholder="Original title" />
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                    <Col>
                        <span>Premiere date</span>
                    </Col>
                    <Col>
                        <span>Local premiere date</span>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Col>
                        <Form.Control onChange={premiere => this.setState({ premiere: premiere.target.value })} type="date" placeholder="Premiere Date" />
                    </Col>
                    <Col>
                        <Form.Control onChange={premiereLocal => this.setState({ premiereLocal: premiereLocal.target.value })} type="date" placeholder="Premiere Local Date" />
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                    <Col>
                        <span>Year</span>
                    </Col>
                    <Col>
                        <span>Duration</span>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Col>
                        <Form.Control onChange={year => this.setState({year: year})} min={1900} max={2020} type="number" placeholder="Year" />  
                    </Col>
                    <Col>
                        <Form.Control onChange={duration => this.setState({duration: duration})} min={0} max={300} type="number" placeholder="Duration" />
                    </Col>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px'  }}>
                    <span>Genres</span>
                </Row>
                <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <DropdownButton
                        as={ButtonGroup}
                        className='sort'
                        size="xs"
                        title={this.state.allGenres}
                        key='Secondary'
                        variant='secondary'
                    >
                        {this.viewGenres()}
                    </DropdownButton>
                </Row>
                <Row style={{ marginRight: '10px', marginTop: '20px', float: 'right' }}>
                    <Button variant="secondary" disabled={this.state.name === ""} onClick={this.addFilm}>Add</Button>
                </Row>
            </div>
        );
    }
}

export default AddFilm;