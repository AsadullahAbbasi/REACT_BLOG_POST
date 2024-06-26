import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  //made a class which has a client property and inside the constructor we set the endpoint and project id of the appwrite account

  Client = new Client();
  constructor() {
    console.log(Client);
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );
    this.account = new Account(this.Client);
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );
      if (userAccount) {
        console.log(userAccount);
        return this.Login(email, password);
      } else {
        console.log("account not created");
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async Login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async Logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
console.log(authService);
export default authService;
