import _ from 'lodash';
import Api from './ApiHelpers';

const endpoint = 'https://www.googleapis.com/youtube/v3';

type Response = { data: Array<Object>, errors: Array<string> };
const handleFetchRequest = (request: Promise<Response>) => new Promise((resolve, reject) => {
  request
    .then((response) => {
      return response.json().then((parseData) => {
        if (response.ok) {
          return { data: parseData, errors: [] };
        }
        if (_.has(parseData, 'errors')) {
          return { data: [], errors: parseData.errors.map(error => error.code) };
        // error handled by server
        }
        throw new Error('Error connecting to the google api');
      });
    })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      // handles fetch failing, usually due to network issues,
      // or not being able to reach the hapi api
      const msgError = typeof error === 'string' ? error : JSON.stringify(error);
      reject(msgError);
    });
});

const getPlaylists = (params, jwt) => new Promise((resolve, reject) => {
  const req = Api.get(`${endpoint}/playlists`, params, jwt);
  return handleFetchRequest(req).then(({ data, error }: Response) => {
    if (error) {
      const msgError = typeof error === 'string' ? error : JSON.stringify(error);
      reject(msgError);
    } else {
      resolve(data);
    }
  }).catch(unhandledError => reject(unhandledError));
});

const getPlaylistsItemDetail = (params, jwt) => new Promise((resolve, reject) => {
  const req = Api.get(`${endpoint}/playlistItems`, params, jwt);
  return handleFetchRequest(req).then(({ data, error }: Response) => {
    if (error) {
      const msgError = typeof error === 'string' ? error : JSON.stringify(error);
      reject(msgError);
    } else {
      console.log('api', data);
      resolve(data);
    }
  }).catch(unhandledError => reject(unhandledError));
});

export default {
  getPlaylists,
  getPlaylistsItemDetail,
};
