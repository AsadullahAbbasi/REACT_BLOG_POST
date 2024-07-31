import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
<<<<<<< HEAD

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
=======
export class AuthService { //made a class which has a client property and inside the constructor we set the endpoint and project id of the appwrite account
    Client = new Client();
    constructor() {
        console.log(Client);
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.Client)

    }
    async createAccount({ email, password, name }) {
        try {
            console.log(this, "a");
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.Login({ email, password })
            }
        } catch (error) {
            throw error
        }
    }
    async Login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() { 
        try {
            return await this.account.get("current");
        } catch (error) {
            throw error
        }
    }
    // https://nebula-coral-phi.vercel.app/
    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

};
const authService = new AuthService();
console.log(authService);
export default authService;
>>>>>>> 0a565603efeb517c6c8cbc3e619a9412ca8e2444
