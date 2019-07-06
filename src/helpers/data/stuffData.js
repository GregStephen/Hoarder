import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getStuff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json`)
    .then((res) => {
      const stuff = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        stuff.push(res.data[fbKey]);
      });
      resolve(stuff);
    })
    .catch(err => reject(err));
});

const getSingleThing = thingId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items/${thingId}.json`)
    .then((res) => {
      console.error(res.data);
      resolve(res.data);
    })
    .catch(err => reject(err));
});

const deleteThisThingFromDataBase = thingId => axios.delete(`${baseUrl}/items/${thingId}.json`);

export default { getStuff, getSingleThing, deleteThisThingFromDataBase };
