/* eslint-disable class-methods-use-this */
import fs from 'fs/promises';
import path from 'path';
import xlsx from 'xlsx';

import { User } from '../../interfaces/user.interface';
import { MAIN_KEY } from '../../constants/main-key.constant';

export default class UserStore {
  jsonFilePath = path.join(__dirname, './users.json');

  public async searchForUser(query: string): Promise<User[]> {
    const storedUsers = await this.getStoredUsers();
    // eslint-disable-next-line eqeqeq
    return storedUsers.filter((user: User) => user[MAIN_KEY] == query);
  }

  private async getStoredUsers(): Promise<User[]> {
    const fileData = await fs.readFile(this.jsonFilePath, {
      encoding: 'utf-8',
    });

    const users: User[] = fileData ? JSON.parse(fileData) : [];

    return users;
  }

  public async saveDataOfFiles(filePaths: string[]) {
    const users: User[] = [];

    filePaths.forEach((filePath: string) => {
      const returnedUsersList = this.getDataFromSheet(filePath);
      users.push(...returnedUsersList);
    });

    await this.saveData(users);
  }

  private getDataFromSheet(filePath: string): User[] {
    const { SheetNames, Sheets } = xlsx.readFile(filePath);

    return xlsx.utils.sheet_to_json(Sheets[SheetNames[0]]) as User[];
  }

  private async saveData(users: User[]) {
    const storedUsers = await this.getStoredUsers();

    users.forEach((user: User) => {
      storedUsers.push(user);
    });

    fs.writeFile(this.jsonFilePath, JSON.stringify(storedUsers));
  }
}
