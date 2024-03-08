import log from 'electron-log/main';
import UserStore from '@/main/utils/User.store';
import DialogWidget from '@/main/widgets/dialog';

export default async () => {
  let filePaths: string[] = [];
  try {
    const dialog = new DialogWidget();
    filePaths = await dialog.getFilePathsFromDialog();
    log.info(
      'saveData.controller.ts (DialogWidget.getFilePathsFromDialog): Files selected',
      filePaths,
    );
  } catch (error) {
    log.error(
      'saveData.controller.ts (DialogWidget.getFilePathsFromDialog): An error occurred while opening dialog',
      error,
    );
    throw new Error('An error occurred while opening dialog');
  }

  try {
    const userStore = new UserStore();

    userStore.saveDataOfFiles(filePaths);
    log.info('saveData.controller.ts (UserStore.saveDataOfFiles): Users saved');
  } catch (error) {
    log.error(
      'saveData.controller.ts (UserStore.saveDataOfFiles): An error occurred while saving users',
      error,
    );
  }
};
