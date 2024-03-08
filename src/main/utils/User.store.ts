/* eslint-disable class-methods-use-this */
import path from 'path';
import fs from 'fs/promises';
import * as ExcelJS from 'exceljs';
import { app } from 'electron';
import log from 'electron-log';

import { User } from '@/interfaces/user.interface';
import { RENDER_KEY, SEARCH_KEY } from '@/constants/main-key.constant';
import { DEV_PATH, PROD_PATH } from '@/constants/json-path.constant';

export default class UserStore {
  jsonFilePath = path.join(__dirname, app.isPackaged ? PROD_PATH : DEV_PATH);

  public async searchForUser(query: string): Promise<User[]> {
    const storedUsers = await this.getStoredUsers();
    // eslint-disable-next-line eqeqeq
    return storedUsers.filter((user: User) => user[SEARCH_KEY] == query);
  }

  private async getStoredUsers(): Promise<User[]> {
    try {
      const fileData = await fs.readFile(this.jsonFilePath, {
        encoding: 'utf-8',
      });

      const users: User[] = fileData ? JSON.parse(fileData) : [];

      return users;
    } catch (error) {
      log.info(
        'UserStore.ts (getStoredUsers): An error occurred while reading path of json file',
        error,
      );
      throw new Error('An error occurred while reading path of json file');
    }
  }

  public async saveDataOfFiles(filePaths: string[]) {
    const users: User[] = [];
    filePaths.forEach(async (filePath: string) => {
      const returnedUsersList = await this.getDataFromSheet(filePath);
      users.push(...returnedUsersList);
    });

    await this.saveData(users);
  }

  private async getDataFromSheet(filePath: string): Promise<User[]> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      return this.mapWorkbookDataIntoListOfUsers(workbook);
    } catch (error) {
      log.error(
        'UserStore.ts (getDataFromSheet): An error occurred while reading sheet',
        error?.toString(),
      );
      throw new Error('An error occurred while reading sheet');
    }
  }

  private mapWorkbookDataIntoListOfUsers(workbook: ExcelJS.Workbook) {
    const usersList: Array<User> = [];

    workbook.worksheets.forEach((sheet) => {
      const firstRow = sheet.getRow(1);
      if (!firstRow.cellCount) return;
      const keys = firstRow.values;
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const { values } = row;
        const user: User = {
          [RENDER_KEY]: '',
          [SEARCH_KEY]: '',
        };
        (keys as string[]).forEach((_key, index) => {
          (user as any)[(keys as string[])[index]] = (values as string[])[
            index
          ];
        });
        usersList.push(user);
      });
    });

    return usersList;
  }

  private async saveData(users: User[]) {
    const storedUsers = await this.getStoredUsers();

    users.forEach((user: User) => {
      storedUsers.push(user);
    });

    try {
      fs.writeFile(this.jsonFilePath, JSON.stringify(storedUsers));
    } catch (error) {
      log.error(
        'UserStore.ts (saveData): An error occurred while saving users',
        error?.toString(),
      );
      throw new Error('An error occurred while saving users');
    }
  }
}
