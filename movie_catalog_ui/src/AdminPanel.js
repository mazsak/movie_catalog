import React from 'react';
import NavBar from './NavBar';
import { Row, Col, ListGroup, Tab, Tabs, Alert, Button, Form, Pagination } from 'react-bootstrap';
import rest from './index';
import ListUpdate from './ListUpdate';

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
              <ListUpdate />
            </Tab>
            <Tab class="panel" eventKey="list_actors" title="List actors">
              <h6>casd3</h6>
            </Tab>
            <Tab class="panel" eventKey="add_film" title="Add film">
              <h6>casd1</h6>
            </Tab>
            <Tab class="panel" eventKey="add_actor" title="Add actor">
              <h6>casd3</h6>
            </Tab>
          </Tabs>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default AdminPanel;
