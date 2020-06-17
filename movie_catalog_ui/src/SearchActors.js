import React from 'react';
import NavBar from './NavBar';
import { Col, Row, Pagination, ButtonGroup, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import rest from './index';
import ActorSimpleItem from './ActorSimpleItem';


class SearchActors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      sortBy: "name",
      desc: true,
      data: [],
      totalPages: 0,
      name: "",
      rateFor: 0,
      rateTo: 10
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.findActorsByName = this.findActorsByName.bind(this);
    this.findFilmByRateFor = this.findFilmByRateFor.bind(this);
    this.findFilmByRateTo = this.findFilmByRateTo.bind(this);
  }

  componentDidUpdate(preProps) {
    if (preProps !== this.props) {
      this.getPage();
    }
  }

  async getPage() {
    let items = "";
    console.log("check login", rest.checkLogin())
    if (this.state.rateFor !== 0 || this.state.rateTo !== 10) {
      items = await rest.findActorsBetweenRate(
        this.state.rateFor,
        this.state.rateTo,
        this.state.page,
        this.state.size,
        this.state.sortBy,
        this.state.desc
      );
    } else {
      items = await rest.findActorsByName(
        this.state.name,
        this.state.page,
        this.state.size,
        this.state.sortBy,
        this.state.desc
      );
    }
    this.setState({
      page: Number(items.currentPage),
      totalPages: Number(items.totalPages),
      data: items.actors
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
    switch (await Number(e.target.id)) {
      case 0:
        this.setState({
          sortBy: "name",
          desc: false
        });
        break;
      case 1:
        this.setState({
          sortBy: "nameFull",
          desc: false
        });
        break;
      case 2:
        this.setState({
          sortBy: "birthDate",
          desc: false
        });
        break;
      case 3:
        this.setState({
          sortBy: "rate",
          desc: false
        });
        break;
      case 4:
        this.setState({
          sortBy: "name",
          desc: true
        });
        break;
      case 5:
        this.setState({
          sortBy: "nameFull",
          desc: true
        });
        break;
      case 6:
        this.setState({
          sortBy: "birthDate",
          desc: true
        });
        break;
      case 7:
        this.setState({
          sortBy: "rate",
          desc: true
        });
        break;
      default:
        this.setState({
          sortBy: "name",
          desc: false
        });
        break;
    }

    this.getPage();
  }

  async findActorsByName(e) {
    this.setState({
      name: await e.target.value,
      genres: [],
      rateFor: 0,
      rateTo:10,
      page: 0
    });

    this.getPage();
  }

  async findFilmByRateFor(e) {
    this.setState({
      rateFor: await  e.target.value,
      name: "",
      page: 0
    });

    this.getPage();
  }

  async findFilmByRateTo(e) {
    this.setState({
      rateTo: await e.target.value,
      name: "",
      page: 0
    });

    this.getPage();
  }

  viewPagination() {
    const items = []
    if (this.state.totalPages <= 5) {
      for (var i = 0; i < this.state.totalPages; i++) {
        items.push(<Pagination.Item class={i !== this.state.page ? 'item-paging' : 'item-paging-active'} id={i} >{i + 1}</Pagination.Item>);
      }
    } else if (this.state.page > this.state.totalPages - 4) {
      items.push(<Pagination.Item class={this.state.page !== this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis class={this.state.page !== this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} disabled />);
      for (i = 5; i > 0; i--) {
        items.push(<Pagination.Item id={
          this.state.totalPages - i} class={this.state.page !== this.state.totalPages - i ? 'item-paging' : 'item-paging-active'}>{this.state.totalPages - i + 1}</Pagination.Item>);
      }
    } else if (this.state.page <= 2) {
      for (i = 0; i < 5; i++) {
        items.push(<Pagination.Item class={i !== this.state.page ? 'item-paging' : 'item-paging-active'} id={
          i}>{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis class={this.state.page !== this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} disabled />);
      items.push(<Pagination.Item class={this.state.page !== this.state.totalPages - i ? 'item-paging' : 'item-paging-active'} id={this.state.totalPages - 1}>{this.state.totalPages}</Pagination.Item>);
    } else {
      items.push(<Pagination.Item class='item-paging' id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis class='item-paging' disabled />);
      for (i = this.state.page - 2; i < this.state.page + 3; i++) {
        items.push(<Pagination.Item class={i !== this.state.page ? 'item-paging' : 'item-paging-active'} id={i} >{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis class='item-paging' disabled />);
      items.push(<Pagination.Item class='item-paging' id={this.state.totalPages - 1}>{this.state.totalPages}</Pagination.Item>);
    }
    return items
  }

  render() {
    return (
      <div >
        <div className='container'>
          <Row>
            <div className='search' >
              <h4 style={{ display: 'flex', justifyContent: 'center' }}>Sort By</h4>
              <DropdownButton
                as={ButtonGroup}
                className='sort'
                size="xs"
                title={this.state.desc === true ? this.state.sortBy.replace(this.state.sortBy.charAt(0), this.state.sortBy.charAt(0).toUpperCase()) + " Desc" : this.state.sortBy.replace(this.state.sortBy.charAt(0), this.state.sortBy.charAt(0).toUpperCase())}
                key='Secondary'
                variant='secondary'
              >
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "name" && !this.state.desc} id="0">Name</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "nameFull" && !this.state.desc} id="1">Name Full</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "birthDate" && !this.state.desc} id="2">Birth Date</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "rate" && !this.state.desc} id="3">Rate</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "name" && this.state.desc} id="4">Name Desc</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "nameFull" && this.state.desc} id="5">Name Full Desc</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "birthDate" && this.state.desc} id="6">Birth Date Desc</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy === "rate" && this.state.desc} id="7">Rate Desc</Dropdown.Item>
              </DropdownButton>
              <h4 style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>Rate</h4>
              <Row>
                <Col>
                  <div>
                    <Form.Control onChange={this.findFilmByRateFor} min={0} max={10} type="number" placeholder="For" />
                  </div>
                </Col>
                <Col>
                  <div>
                    <Form.Control onChange={this.findFilmByRateTo} min={0} max={10} type="number" placeholder="To" />
                  </div>
                </Col>
              </Row>
            </div>
            <Col>
              <div className='search-input'>
                <Form.Control onChange={this.findActorsByName} type="text" placeholder="Search" />
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
                            <Pagination.Item class={this.state.size !== 10 ? 'item-paging' : 'item-paging-active'} active={this.state.size === 10} id={10}>{10}</Pagination.Item>
                            <Pagination.Item class={this.state.size !== 25 ? 'item-paging' : 'item-paging-active'} active={this.state.size === 25} id={25}>{25}</Pagination.Item>
                            <Pagination.Item class={this.state.size !== 50 ? 'item-paging' : 'item-paging-active'} active={this.state.size === 50} id={50}>{50}</Pagination.Item>
                          </Pagination>
                        </div>
                      </Col>
                    </Row>
                    {this.state.data.map(actor => (
                      <div>
                        <ActorSimpleItem item={actor} />
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
                            <Pagination.Item class={this.state.size !== 10 ? 'item-paging' : 'item-paging-active'} active={this.state.size === 10} id={10}>{10}</Pagination.Item>
                            <Pagination.Item class={this.state.size !== 25 ? 'item-paging' : 'item-paging-active'} active={this.state.size === 25} id={25}>{25}</Pagination.Item>
                            <Pagination.Item class={this.state.size !== 50 ? 'item-paging' : 'item-paging-active'} active={this.state.size === 50} id={50}>{50}</Pagination.Item>
                          </Pagination>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>No movies</h1>
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

export default SearchActors;
