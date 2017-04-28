import type { Action } from './types';
import api from '../Utils/YoutubeApi';

export const PLAYLIST_FETCH_REQUESTED = 'PLAYLIST_FETCH_REQUESTED';
export const PLAYLIST_FETCH_RESPONDED = 'PLAYLIST_FETCH_RESPONDED';
export const PLAYLIST_FETCH_ERROR = 'PLAYLIST_FETCH_ERROR';

export const PLAYLIST_DETAIL_FETCH_REQUESTED = 'PLAYLIST_DETAIL_FETCH_REQUESTED';
export const PLAYLIST_DETAIL_FETCH_RESPONDED = 'PLAYLIST_DETAIL_FETCH_RESPONDED';
export const PLAYLIST_DETAIL_FETCH_ERROR = 'PLAYLIST_DETAIL_FETCH_ERROR';


export function fetchPlaylistsRequested(): Action {
  return {
    type: PLAYLIST_FETCH_REQUESTED,
  };
}

export function fetchPlaylistsResponded(data): Action {
  return {
    type: PLAYLIST_FETCH_RESPONDED,
    result: data,
  };
}

export function fetchPlaylistsError(errors): Action {
  return {
    type: PLAYLIST_FETCH_ERROR,
    error: errors,
  };
}

export function fetchPlaylists(params, jwt): Action {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchPlaylistsRequested());
    api.getPlaylists(params, jwt)
    .then((data) => {
      dispatch(fetchPlaylistsResponded(data));
      resolve(data);
    }).catch((error) => {
      dispatch(fetchPlaylistsError(error));
      reject(error);
    });
  });
}

export function fetchPlaylistsItemDetailRequested(): Action {
  return {
    type: PLAYLIST_DETAIL_FETCH_REQUESTED,
  };
}

export function fetchPlaylistsItemDetailResponded(data): Action {
  return {
    type: PLAYLIST_DETAIL_FETCH_RESPONDED,
    result: data,
  };
}

export function fetchPlaylistsItemDetailError(errors): Action {
  return {
    type: PLAYLIST_DETAIL_FETCH_ERROR,
    error: errors,
  };
}

export function fetchPlaylistsItemDetail(params, jwt): Action {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchPlaylistsItemDetailRequested());
    api.getPlaylistsItemDetail(params, jwt)
    .then((data) => {
      dispatch(fetchPlaylistsItemDetailResponded(data));
      resolve(data);
    }).catch((error) => {
      dispatch(fetchPlaylistsItemDetailError(error));
      reject(error);
    });
  });
}
