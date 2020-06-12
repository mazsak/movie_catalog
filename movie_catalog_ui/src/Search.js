import React from 'react';
import NavBar from './NavBar';
import FilmSimpleItem from './FilmSimpleItem';
import RestController from './RestController';
import { Col, Row, Pagination, ButtonGroup, Button, DropdownButton, Dropdown, Form } from 'react-bootstrap';

const rest = new RestController();

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      sortBy: "title",
      data: [],
      totalPages: 0,
      searchTitle: ""
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.findFilmByTitle = this.findFilmByTitle.bind(this);
  }


  async getPage() {
    let items = "";
    if(this.state.searchTitle == ""){
      items = await rest.getPage(
        this.state.page,
        this.state.size,
        this.state.sortBy
      );
    }else {
      items = await rest.findFilmsByTitle(
        this.state.searchTitle,
        this.state.page,
        this.state.size,
        this.state.sortBy
      );
    }
    this.setState({
      page: Number(items.currentPage),
      totalPages: Number(items.totalPages),
      data: items.films
    });
    console.log("In get page", this.state)
  }

  componentDidMount() {
    this.getPage();
  }

  async pageChanged(e) {
    this.setState({
      page: await Number(e.target.id)
    });

    this.getPage();
  }

  async sizeChange(e) {
    this.setState({
      size: await Number(e.target.id)
    });

    this.getPage();
  }

  async sortChange(e) {
    this.setState({
      sortBy: await e.target.id
    });

    this.getPage();
  }

  async findFilmByTitle(e) {
    console.log(e.target.value)
    this.setState({
      searchTitle: await e.target.value
    });

    this.getPage();
  }

  viewPagination() {
    const items = []
    if (this.state.page > this.state.totalPages - 4) {
      items.push(<Pagination.Item class={this.state.page != this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis class={this.state.page != this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} disabled />);
      for (var i = 5; i > 0; i--) {
        items.push(<Pagination.Item id={
          this.state.totalPages - i} class={this.state.page != this.state.totalPages - i ? 'item-paging' : 'item-paging-active'}>{this.state.totalPages - i + 1}</Pagination.Item>);
      }
    } else if (this.state.page <= 2) {
      for (var i = 0; i < 5; i++) {
        items.push(<Pagination.Item class={i != this.state.page ? 'item-paging' : 'item-paging-active'} id={
          i}>{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis class={this.state.page != this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} disabled />);
      items.push(<Pagination.Item class={this.state.page != this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} id={this.state.totalPages - 1}>{this.state.totalPages}</Pagination.Item>);
    } else {
      items.push(<Pagination.Item class='item-paging' id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis class='item-paging' disabled />);
      for (var i = this.state.page - 2; i < this.state.page + 3; i++) {
        items.push(<Pagination.Item class={i != this.state.page ? 'item-paging' : 'item-paging-active'} id={i} >{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis class='item-paging' disabled />);
      items.push(<Pagination.Item class='item-paging' id={this.state.totalPages - 1}>{this.state.totalPages}</Pagination.Item>);
    }
    return items
  }

  render() {
    return (
      <div >
        <div class='container'>
          <Row>
            <div class='search' >
              <Col xs='auto'>
                <DropdownButton
                  className='element'
                  key='Secondary'
                  title='Sort By'
                >
                  <Dropdown.Item onClick={this.sortChange} id="title">Title</Dropdown.Item>
                  <Dropdown.Item onClick={this.sortChange} id="titleOrg">Title Orginal</Dropdown.Item>
                  <Dropdown.Item onClick={this.sortChange} id="year">Year</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.sortChange} id="title,desc">Title Desc</Dropdown.Item>
                  <Dropdown.Item onClick={this.sortChange} id="titleOrg,desc">Title Orginal Desc</Dropdown.Item>
                  <Dropdown.Item onClick={this.sortChange} id="year,desc">Year Desc</Dropdown.Item>
                </DropdownButton>
              </Col>
            </div>
            <Col>
              <div className='search-input'>
                <Form.Control onChange={this.findFilmByTitle} type="text" placeholder="Search" />
              </div>
              <div>
                {Array.isArray(this.state.data) && this.state.data.length > 0 ? (
                  <div>
                    <Row>
                      <Col>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Pagination onClick={this.pageChanged}>
                            {this.viewPagination()}
                          </Pagination>
                        </div>
                      </Col>
                      <Col xs='auto'>
                        <div style={{ display: 'flex', justifyContent: 'left' }}>
                          <Pagination onClick={this.sizeChange}>
                            <Pagination.Item class={this.state.size != 10 ? 'item-paging' : 'item-paging-active'} active={this.state.size == 10} id={10}>{10}</Pagination.Item>
                            <Pagination.Item class={this.state.size != 25 ? 'item-paging' : 'item-paging-active'} active={this.state.size == 25} id={25}>{25}</Pagination.Item>
                            <Pagination.Item class={this.state.size != 50 ? 'item-paging' : 'item-paging-active'} active={this.state.size == 50} id={50}>{50}</Pagination.Item>
                          </Pagination>
                        </div>
                      </Col>
                    </Row>
                    {this.state.data.map(film => (
                      <div>
                        <FilmSimpleItem item={film} />
                      </div>
                    ))}
                    <Row>
                      <Col>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                          <Pagination onClick={this.pageChanged}>
                            {this.viewPagination()}
                          </Pagination>
                        </div>
                      </Col>
                      <Col xs='auto'>
                        <div style={{ display: 'flex', justifyContent: 'left', marginTop: '30px' }}>
                          <Pagination onClick={this.sizeChange}>
                            <Pagination.Item class={this.state.size != 10 ? 'item-paging' : 'item-paging-active'} active={this.state.size == 10} id={10}>{10}</Pagination.Item>
                            <Pagination.Item class={this.state.size != 25 ? 'item-paging' : 'item-paging-active'} active={this.state.size == 25} id={25}>{25}</Pagination.Item>
                            <Pagination.Item class={this.state.size != 50 ? 'item-paging' : 'item-paging-active'} active={this.state.size == 50} id={50}>{50}</Pagination.Item>
                          </Pagination>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                    <h1>No item</h1>
                  )
                }
              </div>
            </Col>
          </Row>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Search;
