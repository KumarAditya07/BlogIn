import config from '../config/config'
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
        console.log("Appwrite serive :: createPost :: error", error);
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
        console.log("Appwrite serive :: updatePost :: error", error);
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

  async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
            

        )
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
}


async uploadFile(file){
    try {
      await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      )
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error ",error);
          return false;
    }
}

async deleteFile(fileID){
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileID,
      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ",error);
          return false;
    }
}
   getFilePreview(fileID){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileID,
    )
   }

   
  
}

const service = new Service();


export default service; 