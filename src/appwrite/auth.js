import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
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

    async getCurrentUser() { //identifies if user is logged in from curent device
        try {
            return await this.account.get("current");
        } catch (error) {
            throw error
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

};
const authService = new AuthService();
authService.createAccount()
console.log(authService);
export default authService;