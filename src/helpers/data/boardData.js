import axios from 'axios';

const baseUrl = 'https://fir-cows-958ae.firebaseio.com/pinterest-webpack';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    // FIXME: Set up the call to only resolve the boards that belong to the user so that if a user types the ID in the URL, it does not show the board unless it belongs to them.

    // update function to take in userId and compare with response.data.userId. If they match, resolve the board. If they do not match, send an empty object or an error message.
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateBoard = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/boards/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const searchBoards = (uid, term) => new Promise((resolve, reject) => {
  getAllUserBoards(uid).then((response) => {
    const searchResults = response.filter((r) => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

export {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  searchBoards,
};
