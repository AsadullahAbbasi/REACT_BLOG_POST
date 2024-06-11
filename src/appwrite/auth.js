import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
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