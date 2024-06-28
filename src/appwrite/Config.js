    import conf from "../conf/conf";
    import { Client,ID,Databases,Storage,Query } from "appwrite";
    
    export class Service {
    Client = new Client();
    databases;
    bucket;
        constructor() {
            this.Client
                .setEndpoint(conf.appwriteUrl)

                .setProject(conf.appwriteProjectId);
                this.account = new Account(this.Client);
            this.databases = new Databases(this.Client);
            this.storage = new Storage(this.Client);
            this.query = new Query();
            this.databases = new Databases(this.Client);
        }
    }
    const Service = new Service();
    export default Service