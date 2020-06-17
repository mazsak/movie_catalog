import React from 'react';
import NavBar from './NavBar';
import { Row, Col, ListGroup, Tab, Tabs, Alert, Button, Form, Pagination } from 'react-bootstrap';
import rest from './index';
import ListUpdateFilms from './ListUpdateFilms';
import ListUpdateActors from './ListUpdateActors';
import AddActor from './AddActor';
import AddFilm from './AddFilm';

class AdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type,
      id: this.props.match.params.id,
      key: Object.keys(this.props.match.params).length !== 0 && this.props.match.params.constructor === Object ? "add_" + this.props.match.params.type : "list_films"
    }
    console.log("in constructir", this.state)
  }

  render() {
    return (
      <div >
        <div class='container'>
          <Tabs defaultActiveKey="profile" activeKey={this.state.key} onSelect={(key) => this.setState({ key: key })}>
            <Tab class="panel" eventKey="list_films" title="List films">
              <ListUpdateFilms />
            </Tab>
            <Tab class="panel" eventKey="list_actors" title="List actors">
              <ListUpdateActors />
            </Tab>
            <Tab class="panel" eventKey="add_film" title="Add film">
              {this.state.type === "actor" ? (
                <AddFilm id={this.state.id} />
              ) : (
                  <AddFilm id={null} />
                )}
            </Tab>
            <Tab class="panel" eventKey="add_actor" title="Add actor">
              {this.state.type === "actor" ? (
                <AddActor id={this.state.id} />
              ) : (
                  <AddActor  id={null} />
                )}
            </Tab>
          </Tabs>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default AdminPanel;
