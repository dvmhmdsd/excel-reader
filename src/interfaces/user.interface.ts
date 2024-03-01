import { SEARCH_KEY, RENDER_KEY } from '../constants/main-key.constant';

export interface User {
  [RENDER_KEY]: string;
  [SEARCH_KEY]: string;
}
