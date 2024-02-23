import {newChat,fetch_chats, get_answer,upload_files,fetch_chats_history} from "../common/api-config";
import ServiceHelper from "./serviceHelper";

export class chatService {
    public newChat = async (payload:any) => {
        const endpointURL = newChat(payload);
        let response;
        const headers = { 
           // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": `*`,
           //"Access-Control-Allow-Headers": `Content-Type`
        };
        try {
            response = await ServiceHelper.postWithAutoRetry(
                endpointURL, payload, { headers });           
            return response;
        } catch (err) {
            let response;
            return Promise.reject(err);

        }
     }

     public get_answer = async (payload:any) => {
        const endpointURL = get_answer(payload);
        let response;
        const headers = { 
           // "Content-Type": "application/json",
           "Access-Control-Allow-Origin": `*`,
           "Access-Control-Allow-Headers": `Content-Type`
        };
        try {
            response = await ServiceHelper.postWithAutoRetry(
                endpointURL, payload, { headers });           
            return response;
        } catch (err) {
            let response;
            return Promise.reject(err);

        }
     }

     public upload_files = async (payload:any) => {
        const endpointURL = upload_files(payload);
        let response;
        const headers = { 
           // "Content-Type": "application/json",
        //    "Access-Control-Allow-Origin": `*`,
        //    "Access-Control-Allow-Headers": `Content-Type`
        };
        try {
            response = await ServiceHelper.postWithAutoRetry(
                endpointURL, payload, { headers });           
            return response;
        } catch (err) {
            let response;
            return Promise.reject(err);

        }
     }


     public fetch_chats = async (data:any) => {
        const endpointURL = fetch_chats(data);
        let response;
        const headers = { 
           // "Content-Type": "application/json",
           "Access-Control-Allow-Origin": `*`,
           "Access-Control-Allow-Headers": `Content-Type`
        };
        try {
            response = await ServiceHelper.getWithAutoRetry(
                endpointURL, { headers });      
              
            return response;
        } catch (err) {
            let response;
            return Promise.reject(err);

        }
     }
     public fetch_chats_history = async (data:any) => {
        const endpointURL = fetch_chats_history(data);
        let response;
        const headers = { 
           // "Content-Type": "application/json",
           "Access-Control-Allow-Origin": `*`,
           "Access-Control-Allow-Headers": `Content-Type`
        };
        try {
            response = await ServiceHelper.getWithAutoRetry(
                endpointURL, { headers });      
              
            return response;
        } catch (err) {
            let response;
            return Promise.reject(err);

        }
     }

    //  public changePassword = async (payload:any) => {
    //     const endpointURL = changePassword();
    //     let response;
    //     const headers = { 
    //        // "Content-Type": "application/json",
    //        "Access-Control-Allow-Origin": `*`,
    //        "Access-Control-Allow-Headers": `Content-Type`
    //     };
    //     try {
    //         response = await ServiceHelper.postWithAutoRetry(
    //             endpointURL, payload);           
    //         return response;
    //     } catch (err) {
    //         let response;
    //         return Promise.reject(err);

    //     }
    //  }
}
