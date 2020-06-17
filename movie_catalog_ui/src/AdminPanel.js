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
      key: "list_films"
    }

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
              <AddFilm/>
            </Tab>
            <Tab class="panel" eventKey="add_actor" title="Add actor">
              <AddActor />
            </Tab>
          </Tabs>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default AdminPanel;
