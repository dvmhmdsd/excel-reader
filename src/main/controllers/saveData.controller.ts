import DialogWidget from '../widgets/dialog';
import UserStore from '../../utils/User.store';

export default async () => {
  const dialog = new DialogWidget();
  const filePaths = await dialog.getFilePathsFromDialog();

  const userStore = new UserStore();
  userStore.saveDataOfFiles(filePaths);
};
