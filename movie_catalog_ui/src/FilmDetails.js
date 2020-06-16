import React from 'react';
import NavBar from './NavBar';
import rest from './index';
import './ItemStyle.css';
import { Row, Col, Button, Carousel, Card, Form } from 'react-bootstrap';
import { BsFilm } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

class FilmDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      date: new Date().getDate() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getFullYear(),
      comment: "",
      rate: 0,
      item: {}
    };
    this.getFilm();

    this.addComment = this.addComment.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  async getFilm() {
    let item = await rest.getFilm(this.state.id);
    this.setState({
      item: item.film,
      comments: item.comments
    });
  }

  async addComment() {
    if (this.state.comment !== "") {
      await rest.addComment({
        name: "",
        rate: this.state.rate,
        comment: this.state.comment,
        date: this.state.date,
        idFilm: this.state.id
      });
      // window.location= "http://localhost:3000/films/details/"+this.state.id;
      this.getFilm();
    }
  }

  viewActors() {
    const items = [];
    for (var i = 0; i < this.state.item.cast.length; i++) {
      items.push(
        <Col>
          <Card bg='dark' style={{ width: '180px' }} class='item-film' text='white'>
            <Card.Img style={{ width: '180px', height: '200px' }} src={this.state.item.cast[i].poster} />
            <Card.Body>
              <Card.Title style={{ justifyContent: 'center' }} xs='auto'>{this.state.item.cast[i].name}</Card.Title>
              <Card.Text style={{ justifyContent: 'center' }} xs='auto'>{this.state.item.cast[i].role}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return items;
  }

  viewComments() {
    const items = [];
    for (var i = 0; i < this.state.comments.length; i++) {
      items.push(
        <Row>
          <Card bg='dark' text='white' style={{ width: '100%', margin: '5px' }}>
            <Card.Header style={{ fontWeight: 'bold' }} >{this.state.comments[i].name}</Card.Header>
            <Card.Body>
              {/* <Card.Title>{variant} Card Title </Card.Title> */}
              <Card.Text>{this.state.comments[i].comment}</Card.Text>
              <Card.Text>
                <small style={{ float: 'right' }} className="text-muted">{this.state.comments[i].date}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      );
    }
    return items;

  }

  render() {
    if (Object.keys(this.state.item).length !== 0 && this.state.item.constructor === Object) {
      return (
        <div >
          <div class='container'>
            <div class='item-film'>
              <Row style={{ float: 'right' }}>
                <Button style={{ margin: '15px' }} variant="secondary" onClick={this.register}>Register</Button>
                <Button style={{ margin: '15px', marginRight: '30px' }} variant="secondary" onClick={this.register}>Register</Button>
              </Row>
              <Row style={{ paddingTop: '15px' }}>
                <Col xs='auto'>
                  <Link to={"/films/details/" + this.state.id} style={{ marginTop: '20px', color: 'white' }}>
                    {this.state.item.poster === "null" ? (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }}>
                        <BsFilm />
                      </div>
                    ) : (
                        <img src={this.state.item.poster} alt="" />
                      )}
                  </Link>
                </Col>
                <Col >
                  <Link to={"/films/details/" + this.state.item.id} style={{ marginTop: '20px', color: 'white' }}>
                    <h3>
                      {this.state.item.title}
                    </h3>
                  </Link>
                  <h6>
                    {this.state.item.titleOrg}
                  </h6>
                  <h6>
                    | {this.state.item.genres.toString().replace(',', ' | ')} | ( {this.state.item.year} )
                    </h6>
                  <Row>
                    <Col xs="auto">
                      <span>
                        Premiere:
                      </span>
                    </Col>
                    <Col xs="auto">
                      <span>
                        {this.state.item.premiereLocal} <br /> {this.state.item.premiere}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col xs='auto'>
                  <Row style={{ margin: '80px' }}>
                    <h6>
                      Duration: {this.state.item.duration}
                    </h6>
                  </Row>
                </Col>
                <Col xs='auto'>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '180px' }}>
                    <Row>
                      <div>
                        <BsFillStarFill color="gray" size="40px" />
                        <p style={{ position: 'relative', bottom: '28px', textAlign: 'center' }}>{this.state.item.rate !== "NaN" ? Number(parseFloat(this.state.item.rate)).toFixed(2) : "0.0"}</p>
                      </div>
                    </Row>
                    <Row>
                      <p style={{ fontSize: '12px', marginTop: '30px', textAlign: 'center' }}>{this.state.item.votes}</p>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <p style={{ margin: '50px', marginTop: '30px' }}>{this.state.item.description}</p>
              </Row>
            </div>
          </div>
          <Row>
            {this.viewActors()}
          </Row>
          <div class='container'>
            <Row>
              <Card bg='dark' text='white' style={{ width: '100%', margin: '5px' }}>
                <Card.Header style={{ fontWeight: 'bold' }} >My name</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Form.Control as="textarea" rows="3" onChange={comment => this.setState({ comment: comment.target.value })} />
                    <Button style={{ marginTop: '15px', float: 'reight' }} variant="secondary" onClick={this.addComment}>Add comment</Button>
                    <small style={{ float: 'right', marginTop: '20px' }} className="text-muted">{this.state.date}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
            <Col>
              {this.viewComments()}
            </Col>
          </div>
          <NavBar />
        </div>
      );
    }
    return null;
  }
}

export default FilmDetails;