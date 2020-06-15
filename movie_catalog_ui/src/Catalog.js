import React from 'react';
import NavBar from './NavBar';
import { Tabs, Tab } from 'react-bootstrap';

class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: "to_watch"
    };
  }

  render() {
    return (
      <div >
        <div class='container'>
          <Tabs defaultActiveKey="profile" activeKey={this.state.key} onSelect={(key) => this.setState({ key: key })}>
            <Tab eventKey="to_watch" title="To watch">
              <div>cos</div>
            </Tab>
            <Tab eventKey="watched" title="Watched">
              <div>cos</div>
            </Tab>
          </Tabs>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Catalog;
