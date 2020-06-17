import React from 'react';
import { Row, Col, Button, Form, Pagination } from 'react-bootstrap';
import ActorSimpleItem from './ActorSimpleItem';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import rest from './index';

class ListUpdateActors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      sortBy: "name",
      name: "",
      desc: true,
      data: [],
      totalPages: 0
    };

    this.getPage();

    this.pageChanged = this.pageChanged.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.findFilmByName = this.findFilmByName.bind(this);
    this.removeActor = this.removeActor.bind(this);
  }

  componentDidUpdate(preProps) {
    if (preProps !== this.props) {
      this.getPage();
    }
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

  async getPage() {
    let items = await rest.findActorsByName(
      this.state.name,
      this.state.page,
      this.state.size,
      this.state.sortBy,
      this.state.desc
    );
    console.log(items);
    this.setState({
      page: Number(items.currentPage),
      totalPages: Number(items.totalPages),
      data: items.actors
    });
  }

  async findFilmByName(e) {
    this.setState({
      name: await e.target.value
    });
    this.getPage();
  }

  async removeActor(e) {
    console.log("remove", e.target.id)
    await rest.removeActor(e.target.id);

    this.getPage();
  }

  async editActor(e){

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
      <div style={{ marginTop: '20px' }}>
        <div className='search-input'>
          <Form.Control onChange={this.findFilmByName} type="text" placeholder="Search" />
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
                <Row style={{ backgroundColor: '#101010', margin: '10px' }}>
                  <Col>
                    <ActorSimpleItem item={actor} />
                  </Col>
                  <Col xs='auto' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                    <Button variant='danger' onClick={this.removeActor} id={actor.id}><AiFillDelete /></Button>
                  </Col>
                  <Col xs='auto' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                    <Button onClick={this.editActor} id={actor.id}><AiFillEdit /></Button>
                  </Col>
                </Row>
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
            </div>) : (
              <div />
            )}
        </div>
      </div>
    );
  }

}

export default ListUpdateActors;