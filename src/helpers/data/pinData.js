import axios from 'axios';

const baseUrl = 'https://fir-cows-958ae.firebaseio.com/pinterest-webpack';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const searchPins = (uid, term) => new Promise((resolve, reject) => {
  getAllPins().then((response) => {
    // Need to make sure that the pin either belongs to the user or is not private.
    const filteredArray = response.filter((r) => r.userId === uid || r.private === false);
    const searchResults = filteredArray.filter((r) => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

export { getBoardPins, getPin, searchPins };
