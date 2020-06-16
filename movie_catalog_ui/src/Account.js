import React from 'react';
import NavBar from './NavBar';
import rest from './index';
import { Row, Card} from 'react-bootstrap';



class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
    this.getLinkByUsername();
  }

  async getLinkByUsername() {
    let item = await rest.getCommentsByUsername();
    if (Object.keys(item).length !== 0 && item.constructor === Object){
    this.setState({
      item: item._links.self
    });
  }

    console.log("state ", this.state)
    console.log(item)
  }

  viewComments() {
    const items = [];
    for (var i = 0; i < this.state.item.length; i++) {
      items.push(
        <Row>
          <Card bg='dark' text='white' style={{ width: '100%', margin: '5px' }}>
            <Card.Header style={{ fontWeight: 'bold' }} >Link</Card.Header>
            <Card.Body>
              {/* <Card.Title>{variant} Card Title </Card.Title> */}
              <Card.Text>{this.state.item[i].href}</Card.Text>
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
          {this.viewComments()}
        </div>
        <NavBar />
      </div>
    );
  }
  return null;
}
}

export default Account;
