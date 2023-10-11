import config from './config/config'
import {Client,ID,Databases,Storage,Query} from 'appwrite'

export class Service{
  client = new Client();
  database;
  bucket;

  constructor(){
    this.client
         .setEndpoint(config.appwriteUrl)
         .setProject(config.appwriteProjectId) 
     this.database = new Databases(this.client);
     this.bucket = new Storage(this.client);
  }
  
  async createPost({title,slug,content,featureImage,status,userId}){
    try {
        return await this.database.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featureImage,
                status,
                userId,
            } 

        )
        
    } catch (error) {
        throw error;
    }
  }
  async updatePost(slug,{title,content,featureImage,status}){
    try {
        return await this.database.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featureImage,
                status, 
            } 

        )
    } catch (error) {
        throw error;
    }
  }
  async deletePost(slug){
        try {
            await this.database.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug

            )
            return true;
            
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ",error);
            return false;
            
        }
  }
  async getPost(slug){
      try {
        await this.database.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
      } catch (error) {
        console.log("Appwrite service :: getPost :: error ",error);
            return false;
      }
  }

  
}

const service = new Service();


export default service; 