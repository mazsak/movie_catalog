import React from 'react';
import NavBar from './NavBar';
import { Tabs, Tab } from 'react-bootstrap';
import FilmSimpleItem from './FilmSimpleItem';
import rest from './index';

class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: "to_watch",
      dataToWatch: [],
      dataWatched: []
    };
    this.getUserFilms();
  }

  async getUserFilms(){
    this.setState({
      dataToWatch: await rest.getFilmsToWatch(),
      dataWatched: await rest.getFilmsWatched()
    })
    console.log("userFilms", this.state)
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <div >
        <div class='container'>
          <Tabs defaultActiveKey="profile" activeKey={this.state.key} onSelect={(key) => this.setState({ key: key })}>
            <Tab eventKey="to_watch" title="To watch">
              {this.state.dataToWatch.length > 0 ? (
                this.state.dataToWatch.map(film => 
                  (<FilmSimpleItem item={film} />))
              ):(
                <h3>No films</h3>
              )}
            </Tab>
            <Tab eventKey="watched" title="Watched">
            {this.state.dataWatched.length > 0 ? (
                this.state.dataWatched.map(film => 
                  (<FilmSimpleItem item={film} />))
              ):(
                <h3>No films</h3>
              )}
            </Tab>
          </Tabs>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Catalog;
