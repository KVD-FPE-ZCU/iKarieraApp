import MSAuth from '../js/auth.js';
import { Client, OneDriveLargeFileUploadTask } from "@microsoft/microsoft-graph-client";

export default class MSGraph {
  constructor () {
    this.msAuth = new MSAuth();
    // Create an authentication provider
    const authProvider = {
      getAccessToken: async () => {
          // Call getToken in auth.js
          return await this.msAuth.getToken();
      }
    };
    // Initialize the Graph client
    this.graphClient = Client.initWithMiddleware({ authProvider });
  }
  
  //Get user info from Graph
  async getUser() {
      this.msAuth.ensureScope('user.read');
      return await this.graphClient
          .api('/me')
          .select('id,displayName')
          .get();
  }

  // Get files in root of user's OneDrive
  async getFiles() {
      this.msAuth.ensureScope('files.read');
      try {
        const response = await this.graphClient
            .api('/me/drive/root/children')
            .select('id,name,folder,package')
            .get();
        return response.value;
      } catch (error) {
        console.error(error);
      }
  }

  async downloadFile(file) {
      try {
        const response = await this.graphClient
            .api(`/me/drive/items/${file.id}`)
            .select('@microsoft.graph.downloadUrl')
            .get();
        const downloadUrl = response["@microsoft.graph.downloadUrl"];  
        return downloadUrl;
      } catch (error) {
        console.error(error);
      }
    }

    async uploadFile(file) {
      try {
        this.msAuth.ensureScope('files.readwrite');
        let options = {
            path: '/',
            fileName: file.name,
            conflictBehavior: 'replace',
            rangeSize: 1024 * 1024 // must be a multiple of 320 KiB
        };
        const uploadTask = await OneDriveLargeFileUploadTask
            .create(this.graphClient, file, options);
        const response = await uploadTask.upload();
        return response;
      } catch (error) {
        console.error(error);
      }
    }
}

