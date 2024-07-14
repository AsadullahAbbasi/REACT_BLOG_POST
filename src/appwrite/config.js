import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  bucket;
  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.account = new Account(this.Client);
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      const post = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return post;
    } catch (error) {
      throw error;
    }
  }
  async getPost() {
    try {
      const post = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
      h;
      return post;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const post = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return post;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      let post = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //indexes are made on attributes to query data on there base
  //when attribute is string and order is ascending then we get data in appwrite fin lexographically (alpcapitalhabetic order capital letter comes first) )
  //async function getPosts(queries = [Query.equal("status", ["active", "pending"])]) { we can use this when we have different values of status

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const fileUploaded = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return fileUploaded;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      const fileDeleted = await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return fileDeleted;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // we will give whole image objeect to appwrite while uploading file and in get file preview it will give us url to display an image
  async getFilePreview(fileId) {
    try {
      const fileView = this.bucket.getFileView(conf.appwriteBucketId, fileId);
      return fileView;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
const Service = new Service();

Service.deleteFile();
