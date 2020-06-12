import React from 'react';
import NavBar from './NavBar';
import FilmSimpleItem from './FilmSimpleItem';
import RestController from './RestController';
import { Col, Row, Pagination } from 'react-bootstrap';
import { AiOutlineBackward, AiOutlineCaretLeft, AiOutlineCaretRight, AiOutlineForward } from 'react-icons/ai';

const rest = new RestController();

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 20,
      sortBy: "title",
      isLoading: true,
      data: [],
      totalPages: 0
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.getPage()
  }

  componentDidMount() {
    this.getPage()
  }

  async getPage() {
    const items = await rest.getPage(
      this.state.page,
      this.state.size,
      this.state.sortBy,
    );
    this.setState({
      page: Number(items.currentPage),
      totalPages: Number(items.totalPages),
      data: items.films
    });
  }

  async pageChanged(e) {
    this.state.page = await Number(e.target.id);

    this.getPage();
  }

  viewPagination() {
    const items = []
    if (this.state.page > this.state.totalPages - 4) {
      items.push(<Pagination.Item id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis disabled />);
      for (var i = 5; i > 0; i--) {
        items.push(<Pagination.Item id={
          this.state.totalPages - i} active={this.state.page == this.state.totalPages - i} >{this.state.totalPages - i + 1}</Pagination.Item>);
      }
    } else if (this.state.page <= 2) {
      for (var i = 0; i < 5; i++) {
        items.push(<Pagination.Item id={
          i} active={i == this.state.page} >{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis disabled />);
      items.push(<Pagination.Item id={this.state.totalPages-1}>{this.state.totalPages}</Pagination.Item>);
    } else {
      items.push(<Pagination.Item id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis disabled />);
      for (var i = this.state.page - 2; i < this.state.page + 3; i++) {
        items.push(<Pagination.Item id={
          i} active={i == this.state.page} >{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis disabled />);
      items.push(<Pagination.Item id={this.state.totalPages-1}>{this.state.totalPages}</Pagination.Item>);
    }
    return items
  }

  render() {
    return (
      <div >
        <NavBar />
        <div class='container'>
          <div>

          </div>
          <div>
            {Array.isArray(this.state.data) && this.state.data.length > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination onClick={this.pageChanged}>
                    {this.viewPagination()}
                  </Pagination>
                </div>
                {this.state.data.map(film => (
                  <div>
                    <FilmSimpleItem item={film} />
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination onClick={this.pageChanged}>
                    {this.viewPagination()}
                  </Pagination>
                </div>
              </div>
            ) : (
                <h1>No item</h1>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
