import React from 'react';
import NavBar from './NavBar';
import { Row, Col, ListGroup, Tab, Tabs, Alert, Button, Form } from 'react-bootstrap';

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
              
            </Tab>
            <Tab class="panel" eventKey="list_actors" title="List actors">

            </Tab>
            <Tab class="panel" eventKey="add_film" title="Add film">

            </Tab>
            <Tab class="panel" eventKey="add_actor" title="Add actor">

            </Tab>
          </Tabs>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default AdminPanel;
