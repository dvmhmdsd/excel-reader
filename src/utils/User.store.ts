/* eslint-disable class-methods-use-this */
import fs from 'fs/promises';
import path from 'path';
import xlsx from 'xlsx';

import { User } from '../interfaces/user.interface';

export default class UserStore {
  public searchForUser(phone: string): User[] {
    console.log(phone);
    return [] as User[];
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

    return JSON.parse(
      xlsx.utils.sheet_to_json(Sheets[SheetNames[0]]) as unknown as string,
    );
  }

  private async saveData(users: User[]) {
    const jsonFilePath = path.join(__dirname, './users.json');
    const fileData = await fs.readFile(jsonFilePath, { encoding: 'utf-8' });
    const storedUsers = JSON.parse(fileData);

    users.forEach((user: User) => {
      storedUsers.push(user);
    });

    fs.writeFile(jsonFilePath, JSON.stringify(storedUsers));
  }
}
