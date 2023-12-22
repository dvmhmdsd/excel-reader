/* eslint-disable class-methods-use-this */
import { dialog } from 'electron';

export default class DialogWidget {
  async getFilePathsFromDialog(): Promise<string[]> {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: 'All Files',
          extensions: ['xlsx', 'xlsm', 'xlsb', 'xltx'],
        },
      ],
    });
    return filePaths;
  }
}
