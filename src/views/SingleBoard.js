import React from 'react';
import { getBoardPins, getPin } from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import AppModal from '../components/Modal';
import BoardForm from '../components/Forms/BoardForm';
import PageHeader from '../components/PageHeader';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    this.getBoard(boardId);

    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
      // because we did a promise.all, the response will not resolve until all the promises are completed
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getBoard = (boardId) => {
    getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const { user } = this.props;
    const renderPins = () => (
      // 4. map over the pins in state
      pins.map((pin) => (
         <PinsCard key={pin.firebaseKey} pin={pin} />
      ))
    );

    // 5. Render the pins on the DOM
    return (
      <div>
        <AppModal title={'Update Board'} btnColor={'info'} icon={'fa-plus-circle'} className='align-right'>
          <BoardForm onUpdate={this.getBoard} board={board} />
        </AppModal>
        <PageHeader user={user} />
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
