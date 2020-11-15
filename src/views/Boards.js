import React from 'react';
import { getAllBoards } from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import Loader from '../components/Loader';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    getAllBoards().then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} />)
    );
    return (
      <>
        { loading || !this.props.user ? (
          <Loader />
        ) : (
          <>
          <h1>Hi, {this.props.user.displayName.split(' ')[0]}!</h1>
          <h2>Here are all of your boards</h2>
          <div className='d-flex flex-wrap container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
