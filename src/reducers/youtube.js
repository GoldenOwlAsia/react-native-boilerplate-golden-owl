import type { Action } from '../actions/types';
import { PLAYLIST_FETCH_REQUESTED,
         PLAYLIST_FETCH_RESPONDED,
         PLAYLIST_FETCH_ERROR,
         PLAYLIST_DETAIL_FETCH_REQUESTED,
         PLAYLIST_DETAIL_FETCH_RESPONDED,
         PLAYLIST_DETAIL_FETCH_ERROR,
} from '../actions/youtube';

export type State = {
  playlists: Array<Object>,
  playlistsItemDetail: Array<Object>,
  requesting: false,
  error: string,
}

const initialState = {
  playlists: [],
  playlistsItemDetail: [],
  requesting: false,
  error: null,
};

export default function (state:State = initialState, action:Action): State {
  switch (action.type) {
    case PLAYLIST_FETCH_REQUESTED:
      return {
        ...state,
        requesting: true,
      };
    case PLAYLIST_FETCH_RESPONDED:
      return {
        ...state,
        playlists: action.result,
        requesting: false,
      };
    case PLAYLIST_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        requesting: false,
      };
    case PLAYLIST_DETAIL_FETCH_REQUESTED:
      return {
        ...state,
        requesting: true,
      };
    case PLAYLIST_DETAIL_FETCH_RESPONDED:
      return {
        ...state,
        playlistsItemDetail: action.result,
        requesting: false,
      };
    case PLAYLIST_DETAIL_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        requesting: false,
      };
    default:
      return state;
  }
}
