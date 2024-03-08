import UserStore from '../utils/User.store';

export default async (phoneNumber: string) => {
  const userStore = new UserStore();

  return userStore.searchForUser(phoneNumber);
};
