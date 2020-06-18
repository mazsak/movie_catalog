import React from 'react';
import NavBar from './NavBar';
import rest from '.';
import { Card, Carousel, Row } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      actors: []
    };

    this.getTopFilms();
    this.getTopActors();

    this.getTopFilms = this.getTopFilms.bind(this);
    this.getTopActors = this.getTopActors.bind(this);

  }

  async getTopFilms() {
    this.setState({
      films: await rest.getTop()
    });

    console.log(this.state);
  }

  async getTopActors() {
    this.setState({
      actors: await rest.getTopActors()
    });

    console.log("actor",this.state);
  }

  viewActors() {
    const itemsPage = [];
    let items = [];
    for (var i = 0; i < this.state.actors.length; i++) {
      items.push(
        <div style={{ width: '190px', float: 'left' }}>
          <Card bg='dark' style={{ width: '180px' }} class='item-film' text='white'>
            <Card.Img style={{ width: '180px', height: '200px' }} src={this.state.actors[i].poster} />
            <Card.Body>
              <Card.Title style={{ justifyContent: 'center' }} xs='auto'>{this.state.actors[i].name}</Card.Title>
              <Card.Text style={{ justifyContent: 'center' }} xs='auto'>{this.state.actors[i].role}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );

      if (i % 6 === 5) {
        itemsPage.push(
          <Carousel.Item>
            {items}
          </Carousel.Item>
        );
        items = [];
      }
    }
    if (items.length !== 0) {
      itemsPage.push(
        <Carousel.Item>
          {items}
        </Carousel.Item>
      );
      items = [];
    }
    return itemsPage;
  }

  viewFilms() {
    const itemsPage = [];
    let items = [];
    for (var i = 0; i < this.state.films.length; i++) {
      items.push(
        <div style={{ width: '190px', float: 'left' }}>
          <Card bg='dark' style={{ width: '180px' }} class='item-film' text='white'>
            <Card.Img style={{ width: '180px', height: '200px' }} src={this.state.films[i].poster} />
            <Card.Body>
              <Card.Title style={{ justifyContent: 'center' }} xs='auto'>{this.state.films[i].title}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      );

      if (i % 6 === 5) {
        itemsPage.push(
          <Carousel.Item>
            {items}
          </Carousel.Item>
        );
        items = [];
      }
    }
    if (items.length !== 0) {
      itemsPage.push(
        <Carousel.Item>
          {items}
        </Carousel.Item>
      );
      items = [];
    }
    return itemsPage;
  }

  render() {
    return (
      <div >
        <div class='container'>
          <Row>
            <h2 style={{color:'white'}}>
              Top Films
          </h2>
          </Row>
          <Row>
            <Carousel style={{ width: '100%' }}>
              {this.viewFilms()}
            </Carousel>
          </Row>
          <Row>
            <h2 style={{color:'white', marginTop:'50px'}}>
              Top Actors
          </h2>
          </Row>
          <Row>
            <Carousel style={{ width: '100%' }}>
              {this.viewActors()}
            </Carousel>
          </Row>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Home;
