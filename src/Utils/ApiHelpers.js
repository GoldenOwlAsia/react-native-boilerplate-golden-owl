
import queryString from 'query-string';

const get = (url:string, params:Object, jwt:string):Promise<any> => {
  if (jwt) {
    return fetch([url, queryString.stringify(params)].join('?'), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
  return fetch([url, queryString.stringify(params)].join('?'), { method: 'GET' });
};


const post = (url:string, params:Object):Promise<any> => fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
});

const deleteMethod = (url:string):Promise<any> => fetch(url, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export default {
  get,
  post,
  deleteMethod,
};
