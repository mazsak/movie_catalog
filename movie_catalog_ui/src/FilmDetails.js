import React from 'react';
import NavBar from './NavBar';
import rest from './index';
import './ItemStyle.css';
import { Row, Col, Button, Carousel, Card, Form } from 'react-bootstrap';
import { BsFilm } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Cookie from "js-cookie"
import FilmSimpleItem from './FilmSimpleItem';

class FilmDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      date: new Date().getDate() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getFullYear(),
      comment: "",
      rate: 0,
      username: "",
      item: {},
      comments: {},
      isLogin: false,
      isAdmin: false
    };
    this.getFilm();
    this.check();
    this.getUsername();

    this.addComment = this.addComment.bind(this);
    this.toWatch = this.toWatch.bind(this);
    this.watched = this.watched.bind(this);
    this.removeFilm = this.removeFilm.bind(this);
  }

  async check() {
    await rest.checkLogin().then((r) => this.setState(r));
    console.log(this.state)
  }

  async getUsername(){
    await rest.decodeUser().then((r)=>{
      if (Object.keys(r).length !== 0 && r.constructor === Object) {
        this.setState({username: r.username});
      }else{
        this.setState({username: "Unknown"});
      }
  });
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  async getFilm() {

    let item = await rest.getFilm(this.state.id);
    console.log("item",item);
    this.setState({
      item: item.film,
      comments: item.comments
    });
  }

  async addComment() {
    if (this.state.comment !== "") {
      await rest.addComment({
        name: this.state.username,
        rate: this.state.rate,
        comment: this.state.comment,
        date: this.state.date,
        idFilm: this.state.id

      });
      this.setState({
        comment: ""
      })

      this.getFilm();
    }
  }

  async toWatch() {
    console.log('add to watch')
    //TODO
  }

  async watched() {
    console.log('add watched')
    //TODO
  }

  async removeFilm() {
    console.log('remove film')
    //TODO
  }

  viewActors() {
    const items = [];
    for (var i = 0; i < this.state.item.cast.length; i++) {
      items.push(
        <div style={{ width: '190px', float: 'left' }}>
          <Card bg='dark' style={{ width: '180px' }} class='item-film' text='white'>
            <Card.Img style={{ width: '180px', height: '200px' }} src={this.state.item.cast[i].poster} />
            <Card.Body>
              <Card.Title style={{ justifyContent: 'center' }} xs='auto'>{this.state.item.cast[i].name}</Card.Title>
              <Card.Text style={{ justifyContent: 'center' }} xs='auto'>{this.state.item.cast[i].role}</Card.Text>
            </Card.Body>
          </Card>
        </div>
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
            <Card.Header style={{ fontWeight: 'bold' }} >{this.state.comments[i].name}({this.state.comments[i].date.replace(/-/g, ".")})</Card.Header>
            <Card.Body>
              {/* <Card.Title>{variant} Card Title </Card.Title> */}
              <Card.Text>{this.state.comments[i].comment}</Card.Text>
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
        <div>
          <div class="container">
            <Row>
              <Col>
                <FilmSimpleItem item={this.state.item} />
              </Col>
              <Col xs='auto'>
                <div class='item-film' style={{ padding: '10px' }}>
                  {this.state.isLogin ? (
                    <Row>
                      <Col>
                        <Button style={{ margin: '5px', width: '80%' }} variant="secondary" onClick={this.toWatch}>Add to watch</Button>
                      </Col>
                      <Col>
                        <Button style={{ margin: '5px', width: '80%' }} variant="secondary" onClick={this.watched}>Add watched</Button>
                      </Col>
                      {this.state.isAdmin ? (
                        <Col>
                          <Button style={{ margin: '5px', width: '80%' }} variant="secondary" onClick={this.removeFilm}>Remove film</Button>
                        </Col>
                      ) : (
                          <div />
                        )}
                    </Row>
                  ) : (
                      <div />
                    )}
                  <Row style={{ marginTop: '20px' }}>
                    <Col>
                      <h6>
                        Duration: <br /> {this.state.item.duration !== "NaN" ? this.state.item.duration : "Unknown"}
                      </h6>
                    </Col>
                    <Col>
                      <h6>
                        Premiere:
                     </h6>
                      <h6>
                        {this.state.item.premiereLocal !== "null" ? this.state.item.premiereLocal.replace(/-/g, '.') : "Unknown"} <br /> {this.state.item.premiere !== "null" ? this.state.item.premiere.replace(/-/g, '.') : "Unknown"}
                      </h6>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <div class='item-film'>
                <h3 style={{ padding: '30px', paddingBottom: '10px' }}>
                  Description
                </h3>
                <p style={{ margin: '20px' }}>{this.state.item.description}</p>
              </div>
            </Row>
            <Row>
              {/* actors */}
            </Row>
            <Row>
              <div class='item-film'>
                <h3 style={{ padding: '30px', paddingBottom: '10px', paddingTop: '10px' }}>
                  Comments
              </h3>
              </div>
              {this.state.isLogin ? (
                <div class='item-film'>
                  <Form.Group controlId="exampleForm.ControlTextarea1" style={{ padding: '30px', paddingBottom: '10px'}}>
                    <Form.Label>{this.state.username}</Form.Label>
                    <Form.Control as="textarea" />
                    <Button style={{margin:'10px', float: 'right', width:'100px'}} variant='secondary' type="submit">Add</Button>
                  </Form.Group>
                </div>
              ) : (
                  <div />
                )}
            </Row>
            {/* {this.viewComments()} */}
          </div>
          <NavBar />
        </div >
      );
      // return (
      //   <div >
      //       <div style={{ float: 'right' }}>
      //           <Button style={{ margin: '15px' }} variant="secondary" onClick={this.register}>Register</Button>
      //           <Button style={{ margin: '15px', marginRight: '30px' }} variant="secondary" onClick={this.register}>Register</Button>
      //       </div>
      //     <div class='container'>
      //       <div class='item-film'>
      //         <Row style={{ paddingTop: '15px' }}>
      //           <Col xs='auto'>
      //             <Link to={"/films/details/" + this.state.id} style={{ marginTop: '20px', color: 'white' }}>
      //               {this.state.item.poster === "null" ? (
      //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '130px', height: '180px' }}>
      //                   <BsFilm />
      //                 </div>
      //               ) : (
      //                   <img src={this.state.item.poster} alt="" />
      //                 )}
      //             </Link>
      //           </Col>
      //           <Col >
      //             <Link to={"/films/details/" + this.state.item.id} style={{ marginTop: '20px', color: 'white' }}>
      //               <h3>
      //                 {this.state.item.title}
      //               </h3>
      //             </Link>
      //             <h6>
      //               {this.state.item.titleOrg}
      //             </h6>
      //             <h6>
      //               | {this.state.item.genres.toString().replace(',', ' | ')} | ( {this.state.item.year} )
      //               </h6>
      //             <Row>
      //               <Col xs="auto">
      //                 <span>
      //                   Premiere:
      //                 </span>
      //               </Col>
      //               <Col xs="auto">
      //                 <span>
      //                   {this.state.item.premiereLocal} <br /> {this.state.item.premiere}
      //                 </span>
      //               </Col>
      //             </Row>
      //           </Col>
      //           <Col xs='auto'>
      //             <Row style={{ margin: '80px' }}>
      //               <h6>
      //                 Duration: {this.state.item.duration}
      //               </h6>
      //             </Row>
      //           </Col>
      //           <Col xs='auto'>
      //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '180px' }}>
      //               <Row>
      //                 <div>
      //                   <BsFillStarFill color="gray" size="40px" />
      //                   <p style={{ position: 'relative', bottom: '28px', textAlign: 'center' }}>{this.state.item.rate !== "NaN" ? Number(parseFloat(this.state.item.rate)).toFixed(2) : "0.0"}</p>
      //                 </div>
      //               </Row>
      //               <Row>
      //                 <p style={{ fontSize: '12px', marginTop: '30px', textAlign: 'center' }}>{this.state.item.votes}</p>
      //               </Row>
      //             </div>
      //           </Col>
      //         </Row>
      //         <Row>
      //           <p style={{ margin: '50px', marginTop: '30px' }}>{this.state.item.description}</p>
      //         </Row>
      //       </div>
      //     <div style={{overflowX: 'scroll'}}>
      //       {this.viewActors()}
      //     </div>
      //       <Row>
      //         <Card bg='dark' text='white' style={{ width: '100%', margin: '5px' }}>
      //               <Card.Header style={{ fontWeight: 'bold' }} >{this.state.username}({this.state.date.replace(/-/g, ".")})</Card.Header>
      //           <Card.Body>
      //             <Card.Text>
      //               <Form.Control rows="3" value={this.state.comment} onKeyPress={e => {if(e.key === "Enter"){this.addComment()}}} onChange={comment => this.setState({ comment: comment.target.value })} />
      //               <Button style={{ marginTop: '15px', float: 'reight' }} variant="secondary" onClick={this.addComment}>Add comment</Button>
      //             </Card.Text>
      //           </Card.Body>
      //         </Card>
      //       </Row>
      //       <Col>
      //         {this.viewComments()}
      //       </Col>
      //     </div>
      //     <NavBar />
      //   </div>
      // );
    }
    return null;
  }
}

export default FilmDetails;