// export const USER_ENDPOINT = "https://aiauradocrev.azurewebsites.net/";

export const USER_ENDPOINT = "https://mtgpt.azurewebsites.net/api/my_gpt?"
//export const USER_ENDPOINT = "https://jsonplaceholder.typicode.com"
export const newChat = (data:any) => (`${USER_ENDPOINT}assistance_type=${data.assistance_type}&action=${data.action}`);
export const fetch_chats_history = (data:any) => (`${USER_ENDPOINT}thread_id=${data.thread_id}&action=${data.action}`);
export const fetch_chats = (data:any) => (`${USER_ENDPOINT}action=${data.action}`);
export const get_answer = (data:any) => (`${USER_ENDPOINT}content=${data.content}&id=${data.id}&assistance_type=${data.assistance_type}&action=${data.action}`);
export const upload_files = (imageData:any) => (`${USER_ENDPOINT}assistance_type=${imageData.assistance_type}&action=${imageData.action}&filename=${imageData.filename}`);

