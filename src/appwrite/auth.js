import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService { //made a class which has a client property and inside the constructor we set the endpoint and project id of the appwrite account
    Client = new Client();
    constructor() {
        console.log(Client);
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
    }
};
 const authService = new AuthService();
 console.log(authService);
export default authService;