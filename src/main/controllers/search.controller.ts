import UserStore from '@/main/utils/User.store';

export default async (phoneNumber: string) => {
  const userStore = new UserStore();

  return userStore.searchForUser(phoneNumber);
};
