import { MAIN_KEY } from '../constants/main-key.constant';

export interface User {
  name: string;
  [MAIN_KEY]: string;
}
