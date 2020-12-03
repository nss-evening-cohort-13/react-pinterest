import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardsCard({ board }) {
  return (
    <Link to={`/boards/${board.firebaseKey}`} className='whole-card'>
      <div style={{ backgroundImage: `url(${board.imageUrl})` }} className='card board-card m-2'>
        <div className='card-body'>
          <h6 className='card-title'>{board.name}</h6>
          <p className='card-text'>{board.description}</p>
        </div>
      </div>
    </Link>
  );
}
