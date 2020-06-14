import React from 'react';
import NavBar from './NavBar';
import FilmSimpleItem from './FilmSimpleItem';
import RestController from './RestController';
import { Col, Row, Pagination, ButtonGroup, Button, DropdownButton, Dropdown, Form } from 'react-bootstrap';

const rest = new RestController();

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      sortBy: "title",
      desc: false,
      data: [],
      totalPages: 0,
      title: "",
      yearFirst: 1900,
      yearSecond: new Date().getFullYear(),
      genres: [],
      rateFor: 0,
      rateTo: 10
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.findFilmByTitle = this.findFilmByTitle.bind(this);
    this.findFilmByGenres = this.findFilmByGenres.bind(this);
    this.findFilmByYearFirst = this.findFilmByYearFirst.bind(this);
    this.findFilmByYearSecond = this.findFilmByYearSecond.bind(this);
    this.findFilmByRateFor = this.findFilmByRateFor.bind(this);
    this.findFilmByRateTo = this.findFilmByRateTo.bind(this);
  }

  componentDidUpdate(preProps) {
    if (preProps != this.props) {
      this.getPage();
    }
  }

  async getPage() {
    let items = "";
    if (this.state.genres.length != 0) {
      items = await rest.findFilmsByGenres(
        this.state.genres,
        this.state.page,
        this.state.size,
        this.state.sortBy,
        this.state.desc
      );
    } else if (this.state.yearFirst != 1900 || this.state.yearSecond != new Date().getFullYear()) {
      items = await rest.findFilmsBetweenYear(
        this.state.yearFirst,
        this.state.yearSecond,
        this.state.page,
        this.state.size,
        this.state.sortBy,
        this.state.desc
      );
    } else if (this.state.rateFor != 0 || this.state.rateTo != 10) {
      items = await rest.findFilmsBetweenRate(
        this.state.rateFor,
        this.state.rateTo,
        this.state.page,
        this.state.size,
        this.state.sortBy,
        this.state.desc
      );
    } else {
      items = await rest.findFilmsByTitle(
        this.state.title,
        this.state.page,
        this.state.size,
        this.state.sortBy,
        this.state.desc
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
    switch (await Number(e.target.id)) {
      case 0:
        this.setState({
          sortBy: "title",
          desc: false
        });
        break;
      case 1:
        this.setState({
          sortBy: "titleOrg",
          desc: false
        });
        break;
      case 2:
        this.setState({
          sortBy: "year",
          desc: false
        });
        break;
      case 3:
        this.setState({
          sortBy: "title",
          desc: true
        });
        break;
      case 4:
        this.setState({
          sortBy: "titleOrg",
          desc: true
        });
        break;
      case 5:
        this.setState({
          sortBy: "year",
          desc: true
        });
        break;

    }

    this.getPage();
  }

  async findFilmByTitle(e) {
    this.setState({
      title: await e.target.value,
      yearFirst: 1900,
      yearSecond: new Date().getFullYear(),
      genres: [],
      page: 0
    });

    this.getPage();
  }

  async findFilmByGenres(e) {
    const index = this.state.genres.indexOf(e.target.id)
    if (index > -1) {
      this.state.genres.splice(index, 1);
    } else {
      this.state.genres.push(e.target.id);
      this.setState({
        yearFirst: 1900,
        yearSecond: new Date().getFullYear()
      });
    }
    this.getPage();
    console.log(this.state.genres)
  }

  async findFilmByYearFirst(e) {
    this.setState({
      yearFirst: await Number(e.target.id),
      genres: []
    });

    this.getPage();
  }

  async findFilmByYearSecond(e) {
    this.setState({
      yearSecond: await Number(e.target.id),
      genres: []
    });

    this.getPage();
  }

  async findFilmByRateFor(e) {
    this.setState({
      rateFor: e.target.value,
      title: "",
      yearFirst: 1900,
      yearSecond: new Date().getFullYear(),
      genres: [],
      page: 0
    });

    this.getPage();
  }

  async findFilmByRateTo(e) {
    this.setState({
      rateTo: e.target.value,
      title: "",
      yearFirst: 1900,
      yearSecond: new Date().getFullYear(),
      genres: [],
      page: 0
    });

    this.getPage();
  }

  viewPagination() {
    const items = []
    if (this.state.totalPages <= 5) {
      for (var i = 0; i < this.state.totalPages; i++) {
        items.push(<Pagination.Item class={i != this.state.page ? 'item-paging' : 'item-paging-active'} id={i} >{i + 1}</Pagination.Item>);
      }
    } else if (this.state.page > this.state.totalPages - 4) {
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


  viewSearchGenres() {
    const items = []
    let genres = ["Short", "Documentary", "Western", "Drama", "Adventure", "Comedy", "Action", "Sports", "Crime", "Romance", "Mystery", "Spy", "Fantasy", "War", "Horror", "Silent", "Thriller", "Historical", "Musical", "Animated", "Science Fiction"]
    const columnsFirst = [];
    for (var i = 0; i < 11; i++) {
      columnsFirst.push(
        <Row>
          <div class={this.state.genres.indexOf(genres[i]) > -1 ? "genre-active" : "genre"} id={genres[i]} onClick={this.findFilmByGenres}>
            {genres[i]}
          </div>
        </Row>
      );
    }
    items.push(<Col>{columnsFirst}</Col>);
    const columnsSecond = [];
    for (let i = 11; i < genres.length; i++) {
      columnsSecond.push(
        <Row>
          <div class={this.state.genres.indexOf(genres[i]) > -1 ? "genre-active" : "genre"} id={genres[i]} onClick={this.findFilmByGenres}>
            {genres[i]}
          </div>
        </Row>
      );

    }
    items.push(<Col>{columnsSecond}</Col>);
    return items;
  }

  viewYearFirst() {
    const items = [];
    for (var i = 1900; i < this.state.yearSecond + 1; i++) {
      items.push(<Dropdown.Item onClick={this.findFilmByYearFirst} active={i == this.state.yearFirst} id={i}>{i}</Dropdown.Item>);
    }

    return items;
  }

  viewYearSecond() {
    const items = [];
    for (var i = this.state.yearFirst; i < new Date().getFullYear() + 1; i++) {
      items.push(<Dropdown.Item onClick={this.findFilmByYearSecond} active={i == this.state.yearSecond} id={i}>{i}</Dropdown.Item>);
    }

    return items;
  }

  render() {
    return (
      <div >
        <div class='container'>
          <Row>
            <div class='search' >
              <h4 style={{ display: 'flex', justifyContent: 'center' }}>Sort By</h4>
              <DropdownButton
                as={ButtonGroup}
                className='sort'
                size="xs"
                title={this.state.desc == true ? this.state.sortBy.replace(this.state.sortBy.charAt(0), this.state.sortBy.charAt(0).toUpperCase()) + " Desc" : this.state.sortBy.replace(this.state.sortBy.charAt(0), this.state.sortBy.charAt(0).toUpperCase())}
                key='Secondary'
                variant='secondary'
              >
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy == "title" && !this.state.desc} id="0">Title</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy == "titleOrg" && !this.state.desc} id="1">Title Orginal</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy == "year" && !this.state.desc} id="2">Year</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy == "title" && this.state.desc} id="3">Title Desc</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy == "titleOrg" && this.state.desc} id="4">Title Orginal Desc</Dropdown.Item>
                <Dropdown.Item onClick={this.sortChange} active={this.state.sortBy == "year" && this.state.desc} id="5">Year Desc</Dropdown.Item>
              </DropdownButton>
              <h4 style={{ display: 'flex', justifyContent: 'center' }}>Filters</h4>
              <div style={{ display: 'flex', justifyContent: 'left', paddingLeft: '10px' }} >
                {this.viewSearchGenres()}
              </div>
              <h4 style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>Years</h4>
              <Row>
                <Col>
                  <h4 style={{ display: 'flex', justifyContent: 'center' }}>For:</h4>
                </Col>
                <Col>
                  <h4 style={{ display: 'flex', justifyContent: 'center' }}>To:</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <DropdownButton
                    as={ButtonGroup}
                    className='sort'
                    size="xs"
                    title={this.state.yearFirst}
                    key='Secondary'
                    variant='secondary'
                  >
                    {this.viewYearFirst()}
                  </DropdownButton>
                </Col>
                <Col><DropdownButton
                  as={ButtonGroup}
                  className='sort'
                  size="xs"
                  title={this.state.yearSecond}
                  key='Secondary'
                  variant='secondary'
                >
                  {this.viewYearSecond()}

                </DropdownButton>
                </Col>
              </Row>
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

export default Top;
