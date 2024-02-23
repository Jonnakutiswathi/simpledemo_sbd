import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { Component, ReactNode, useEffect, useRef, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Row, Col, Dropdown } from 'react-bootstrap';
import default_profile from '../assets/images/default_profile.png';
import SBD_profile from '../assets/images/SBD.png';
import { Avatar, Button, Menu, MenuItem, Fade, } from '@material-ui/core';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import { chatService } from "../services/chatService"
import upload_file from '../assets/images/upload_file.svg';
import { getChatData, getTypinData,newCustomChat } from '../common/utils';
import { AttachmentOutlined } from '@material-ui/icons';
import Typewriter from 'typewriter-effect';
const Home = () => {
  const arr: any = [];
  let isChatLoading: boolean = false;
  const [staticData, setStaticData] = useState(true);
  const [newusers, setnewUsers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [chatHistory,setChatHistory] = useState([]);
  const [threadid,setThreadId] = useState('')
  const scrollingTextareaRef = useRef<HTMLTextAreaElement>(null);
  let [x, setX] = useState('');
  let [arrayData, setArrayData] = useState([]);
  let [userInput, setUserInput] = useState('');
  let [fileType, setFileType] = useState('');
  let [cgdadataType, setcgdaDataType] = useState('MathTutor');
  let [imgdataid, setimgDataID] = useState('');
  let [textAreaEnable, setTextAreaEnable] = useState(true);
  let [cgdaType, setcgdaType] = useState<React.ReactNode>('GPT - 4');
  let [threadChat, setThreadChat] = useState(false);
  let [sendChat, setSendChat] = useState(false);

  useEffect(() =>{
    newChat();
   fetch_chatsGet();
  },[])
  useEffect(() => {
    //uploadFilesGet();
    // get_answer();
  // newChat();
    // fetch_chatsGet();
    // alert('rr')
    // setTimeout(() => {
      
    //   let typeFun:any = typewriterdata().type();
    //   debugger;
    //  // typeFun.type();
      
    // }, 1000);
    const textAreaElement = scrollingTextareaRef.current;
    adjustTextareaHeight(textAreaElement as HTMLTextAreaElement, 4)
  }, [x]
  )
  let [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const toggleSendButton = () => {
    // Logic to toggle send button based on input
    setIsSendButtonEnabled(!!x.trim());
  };
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    if (hiddenFileInput.current !== null) {
      // Access the current property only when it's not null
      // For example:
      hiddenFileInput.current.click();
    } else {
      console.error("hiddenFileInput.current is null");
      // Handle the case when the ref is null
    }
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  const handleKeydown = (event: any) => {
    // Logic to handle keydown event
  };
  const selectGPT = (selectdata:any) =>{
    setcgdaType(selectdata);
    //debugger;
    if(selectdata == 'Data Analysis'){
      setcgdaDataType('cv')
    }else if(selectdata == 'Chat'){
      setcgdaDataType('dv')
    }else{
      setcgdaDataType('MathTutor')
    }
    
  }
  const newChat = () => {
    const report = new chatService();
    let data = {
      assistance_type:cgdadataType,
      action:'new_chat'
    }
        report.newChat(data).then
          (async (resp: any) => {
            console.log(resp);
            setArrayData([]);
            setThreadId(resp.data)
          })
          .catch((err: any) => {
          })
  }
  const newChatCreation =() =>{
    setnewUsers(true)
    newChat();
  }
  const get_answer = () => {

    
   console.log(threadid)
    const report = new chatService();
    let data = {
      content: x,
      id:threadid,
      assistance_type:cgdadataType,
      action:'get_answer',
    }

    if (imgdataid !== '') {
      data['file_ids'] = imgdataid;
    }

    console.log(data);
      // if(threadChat == true && setSendChat ==){
      //   userInput = ''
      // }
        report.get_answer(data).then
          (async (resp: any) => {
            console.log(resp)
            let dataP:any = resp.data
            let arrayTemp = [...arrayData]
             console.log(arrayData,dataP,Object.keys(dataP[0]).length)
             let newData:any = dataP[0][Object.keys(dataP[0]).length-1]
             console.log(newData)
             let contentFormat:any = {} 
             for (const [key, value] of Object.entries(newData)) {
                   console.log(key,value)
                    contentFormat = { q: `${key}`, message: `${value}`, img: '', filestype: userInput };
             }
           arrayTemp.push(contentFormat)
          
           setArrayData(arrayTemp)
           setTextAreaEnable(true);
            // let contentFormat:any = { q: `${key}`, message: `${value}`, img: '', filestype: userInput };
            //based on threadid conditions
      //       if (!newusers) {
      // let chatDataHistory =resp.data[0];

      //     let tempDatas:any = [];          
      //       let cH = Object.values(chatDataHistory);
      //       Object.values(cH).map((value1:any,index:any)=>{
      //         for (const [key, value] of Object.entries(value1)) {
      //           console.log(`${key}: ${value}`);
      //           let data:any= { q: `${key}`, message: `${value}`, img: '', filestype: userInput };
      //           tempDatas.push(data)
      //         }
             
      //       })
      //       console.log(arrayData, tempDatas);
      //       setArrayData(tempDatas);
      //       console.log(arrayData)
      //       setTextAreaEnable(true);
      //       } else {        
      

      //     console.log(resp.data[0])
      //     let chatDataHistory =resp.data[0];
      //     let tempDatas:any = []; 
      //     let cH = Object.values(chatDataHistory);
      //     console.log(cH);
      //     Object.values(cH).map((value1:any,index:any)=>{
      //           for (const [key, value] of Object.entries(value1)) {
      //             console.log(`${key}: ${value}`);
      //             let data:any= { q: `${key}`, message: `${value}`, img: '', filestype: userInput, isLoading: false };
      //             tempDatas.push(data)
      //           }
               
      //         })
      //       setArrayData(tempDatas);
      //       console.log(arrayData);
      //       setTextAreaEnable(true);
      //       }
            // setIsLoading(false)
          })
          .catch((err: any) => {
          })
  }

  const uploadFiles = async (file:any) => {

    console.log(file)
   
 
   let arrFilesT =[file[0]]
    arrFilesT.forEach(async (file:any) => {
    const { ContainerClient } = require("@azure/storage-blob");
    const account = "sbddb";
    const sas = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-09T13:19:37Z&st=2024-02-22T05:19:37Z&spr=https,http&sig=gxEok4ShZDsiGGNLIC2wD21Sa%2FF8%2BUun3HnQs%2F%2BuMHM%3D";
 
   const container = 'sbdgptfiles'
   
    const containerClient = new ContainerClient(
       `https://${account}.blob.core.windows.net/${container}${sas}`
     );
     
       let name:any = file.name.replace(/ /g,"_")
       const blockBlobClient = containerClient.getBlockBlobClient(name);
       const result = await blockBlobClient.uploadData(file);
   });
  

   
    const report = new chatService();
    let data = {
      assistance_type:cgdadataType,
      action:'upload_files',
      filename: userInput
    }
    console.log(data)
  
        report.upload_files(data).then
          (async (resp: any) => {
            console.log(resp)
            setimgDataID(resp['data']);
          })
          .catch((err: any) => {
          })
  }

const threadChatting = (key:any) =>{
  setThreadChat(true)
  setnewUsers(false)
  setThreadId(key)
  const report = new chatService();
  let data = {
    thread_id:key,
    action:'fetch_chats'
   }
      report.fetch_chats_history(data).then
        (async (resp: any) => {
          console.log(resp);
          let chatDataHistory = resp.data;
          let tempData:any = [];
          let dd = chatDataHistory[0][Object.keys(chatDataHistory[0])[0]];
          console.log(Object.values(dd));
          debugger;
          Object.values(dd).map((value1:any,index:any)=>{
            for (const [key, value] of Object.entries(value1)) {
              console.log(`${key}: ${value}`);
              let data:any= { q: `${key}`, message: `${value}`, img: '', filestype: '' };
              tempData.push(data)
            }
           
          })
          //console.log(arrayData, tempData);
          setArrayData(tempData);
         console.log(setArrayData)
        })
        .catch((err: any) => {
        })
}
  const fetch_chatsGet = () => {
    console.log(threadid)
    const report = new chatService();
    let data = {
    // thread_id:threadid,
      action:'fetch_chats'
    }
    let tempData:any = [];
        report.fetch_chats(data).then
          (async (resp: any) => {
            console.log(resp.data)
            let historyData:any = resp.data
            let hData:any = [...historyData]
            let finalData:any = []
            Object.keys(hData).map((key:any,index:any)=>{
              let tempData:any = [];
              Object.keys(hData[key]).map((keyI:any,i:any)=>{
                 tempData.push({thread:'',text:''})
                 tempData[i]['thread'] = keyI
                 let tData:any = []
                 Object.keys(hData[key][keyI]).map((keyP:any,indexP:any)=>{
                  if(indexP == Object.keys(hData[key][keyI]).length - 1){
                    tData.push(Object.values(hData[key][keyI][indexP])[0])
                  }
                 })
                 tempData[i]['text'] = tData
              })
              finalData.push(tempData)
              console.log(tempData,getChatData())
            })
           console.log(finalData)
          setChatHistory(finalData)
          setLoading(false)
          })
          .catch((err: any) => {
          })
        //   let historyData:any = getChatData()
        //   let hData:any = [...historyData]
        //   let finalData:any = []
        //   Object.keys(hData).map((key:any,index:any)=>{
        //     let tempData:any = [];
        //     Object.keys(hData[key]).map((keyI:any,i:any)=>{
        //        tempData.push({thread:'',text:''})
        //        tempData[i]['thread'] = keyI
        //        let tData:any = []
        //        Object.keys(hData[key][keyI]).map((keyP:any,indexP:any)=>{
        //         if(indexP == Object.keys(hData[key][keyI]).length - 1){
        //           tData.push(Object.values(hData[key][keyI][indexP])[0])
        //         }
        //        })
        //        tempData[i]['text'] = tData
        //     })
        //     finalData.push(tempData)
        //     console.log(tempData,getChatData())
        //   })
        //  console.log(finalData)
        // setChatHistory(finalData)
  }



  const changevalue = (e: any) => {
    setX(e.target.value)
  }
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  let [imagePreviewUrl, setImagePreviewUrl] = useState<any | null>(null);
  const sendMessage = () => {
    setSendChat(true)
    get_answer();
    let data: any = [...arrayData]
   data.push({ q: x, message: '', img: imagePreviewUrl, filestype: userInput, isLoading: true })
    console.log(data)
    setArrayData(data);
    console.log(arrayData);
    isSendButtonEnabled = false;
    setTextAreaEnable(false);
    fileType = '';
    setFileType('');
    if (!isChatLoading) {
      isChatLoading = true
      let data: any = [...arrayData];
      // data.push({ q: x, message: '', img: imagePreviewUrl, filestype: userInput });
      // setArrayData(data);
      //arrayData = data;
      x = '';

      setX('');
      imagePreviewUrl = null;
      setImagePreviewUrl(null);
      //userInput = '';
      setUserInput('');
      setIsSendButtonEnabled(false);
      // fetch('https://dummy.restapiexample.com/api/v1/employees')
      //   .then((res: any) => {
      //     if (res['status'] == 200) {
      //       console.log(res)
      //       isChatLoading = false
      //       console.log(res);
      //       let message: any = res['results'][0]['text']
      //       let data: any = [...arrayData]
      //       data[data.length - 1]['message'] = message
      //       arrayData = data
      //     }
      //   }, (error: any) => {
      //     alert('error')
      //     console.log(error)
      //   })


    }
    setStaticData(false)
  };
  // Function to handle file selection
  const handleFileChange = (event: any) => {
    if (event.target.value !== null) {
    let splitData = event.target.files[0]['name'].split('.')[1]
    if (splitData !== 'png' && splitData !== 'svg' && splitData !== 'jpg' && splitData !== 'jpeg') {
      const file = event.target.files !== null ? event.target.files[0] : null;
      
      console.log(file)
    userInput = event.target.files !== null ? event.target.files[0]['name'] : '';
    uploadFiles(event.target.files)
    setUserInput(userInput);
    fileType = userInput.split('.')[1];
    setFileType(fileType)
    setSelectedFile(file);
    if (event.target.files !== null) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = (e) => {
        // var Base64data = reader.result;
        // console.log(Base64data)
        // uploadFiles(Base64data);
        
        // setIsSendButtonEnabled(true);

      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
    } else {
    const file = event.target.files !== null ? event.target.files[0] : null;
    fileType = event.target.files[0]['name'].split('.')[1];
    setFileType(fileType)
    setSelectedFile(file);
    if (event.target.files !== null) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImagePreviewUrl(e.target?.result)
      //  setIsSendButtonEnabled(true);

      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  }
}
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (hiddenFileInput.current !== null) {
      // Access the current property only when it's not null
      // For example:
      hiddenFileInput.current.click();
    } else {
      console.error("hiddenFileInput.current is null");
      // Handle the case when the ref is null
    }
    // Handle file upload logic here, e.g., send the selectedFile to the server
    console.log('File selected:', selectedFile);
  };
  console.log(arr?.map((value: any) => value.q))
  const adjustTextareaHeight = (textareaElement: HTMLTextAreaElement, maxLines?: number) => {
    const minHeight = 40; // Set a minimum height for the textarea to prevent it from shrinking too much

    const textarea = textareaElement;

    textarea.style.height = 'auto'; // Reset the height to auto to recalculate

    // Calculate the height required for the content
    const newHeight = Math.max(minHeight, textarea.scrollHeight);
    console.log(newHeight);
    if (maxLines) {
      // If maxLines is defined and the current number of rows exceeds it, show the scrollbar
      textarea.style.overflowY = 'auto';
      textarea.style.height = `${newHeight}px`;

      //set div height 
      var div = document.querySelector('.textarea-container') as HTMLElement;
      if (div !== null) {

        // Get the current height of the textarea (including padding)
        const textareaHeight = textarea.scrollHeight;
        // Limit the div height to a maximum of 200px
        const maxDivHeight = 200;
        const newDivHeight = Math.min(textareaHeight, maxDivHeight);

        div.style.height = `${Math.max(minHeight, newDivHeight)}px`;
      }

    } else {
      // Otherwise, adjust the height to fit the content
      textarea.style.overflowY = 'auto';
      textarea.style.height = `${newHeight}px`;
    }
  }
  const closeimg = () => {
    setImagePreviewUrl(null);
    setSelectedFile(null);
    const event = {
      target: { value: null, files: null }
    }
    handleFileChange(event);
    fileType = '';
    setFileType('');
    if ((fileType == '') && (x == '')) {
      setIsSendButtonEnabled(false);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [src, setSrc] = React.useState<any | null>(null);
  const onChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  console.log(arrayData)

  return (
    <div className="mains">



      <Navbar expand="lg" className="bg-body-tertiary nav" style={{ height: '52px' }}>
        <Container fluid  style={{ padding: '0px 27px' }} >
          {/* <input  type="file" onChange={onChange} />
      <img src={src} /> */}
          <span> <img src={SBD_profile} alt="" className="logo"></img>
          </span>
          <Col  >

            <NavDropdown title={cgdaType} id="basic-nav-dropdown" className="chatGptDropdown">
            <NavDropdown.Item ><div className='actionselect'   onClick={() => { selectGPT('Chat')}} >Chat</div></NavDropdown.Item>
              <NavDropdown.Item ><div className='actionselect'   onClick={() => { selectGPT('Data Analysis')}} >Data Analysis</div></NavDropdown.Item>
              <NavDropdown.Item >
                <div className='actionselect' onClick={() => { selectGPT('GPT - 4')}}>GPT - 4</div>
              </NavDropdown.Item>
             

            </NavDropdown>
          </Col>
          {/* <h5>  <img className="logo" src={MouriLogo_Text} alt="Logo" /></h5> */}

          <Form >
            <Row>

              <Col  >
                {/* <img className="imgcss" style={{ marginTop: '10px' }} src={default_profile} alt="" ></img> */}
                  <div>
                <Button
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleToggle}
                >
                  <Avatar src="/broken-image.jpg" />
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>

                  </div>
              
              
              </Col>

            </Row>
          </Form>

        </Container>
      </Navbar>
      <div>
        <Form>
          <Row className='chathistory'>
         
            <Col xs={2} style={{ marginTop: '19px', paddingTop: '20px' }} >
              <div className='newchat'>

                <div style={{ marginTop: '3px' }}  onClick={newChatCreation }>  <span className='chatspan' >New Chat </span> <span style={{ marginLeft: '63px' }}><RateReviewOutlinedIcon>Outlined</RateReviewOutlinedIcon></span> </div>
                <div className='chathistorydatamain'>
                  {chatHistory.map((key:any)=>{
                    console.log(key)
                    return key.map((keyI:any)=>{
                      console.log(keyI)
                      return keyI['text'][0]?
                       <div className='chathistorydata'  onClick={() => { threadChatting(keyI['thread']) }}
                      >{keyI['text'][0]}</div>
                      :''
                      
                    })
                  })}
                  {loading && (
 <div className="loading-spinner-main">
 <div className="loading-spinner-preview" id="loader"></div>
</div>  
                  )} 
                  
                 </div>
              </div>
            </Col>
            <Col >
              <div className="main">
                <div className="chat-messages">
                  <div className='message-container chat-main'>
                    {staticData &&
                    <div className="sent-message">
                      <div className="ms-auto ques-tag">
                        Hello, How can i assist you?
                      </div>
                      <div className="profile-image">
                        <Avatar src="/broken-image.jpg" />

                        {/* <img src={default_profile} alt="" className="profile-image"></img> */}
                      </div>
                    </div>
                    }
                    {arrayData.map((value: any, key: any) => {
                      return <div key={key}>
                        <div className="sent-message">
                          <div className="ms-auto ques-tag">
                          {value.q && (
                          <span style={{marginLeft:'29px'}}>{value.q}</span>  )}
                            {value.img && ( // Conditionally render the <img> element when imagePreviewUrl is not null
                              <div>
                                <img src={value.img} alt="Selected Preview" className="display-img" style={{ maxWidth: '100%', maxHeight: '200px', margin: '16px', height: '50%' }} />
                              </div>
                            )}
                            {value.filestype && ( // Conditionally render the <img> element when imagePreviewUrl is not null
                               
                              <div className='chatfiletype'>{value.filestype}</div>
                              
                            )}
                          </div>
                          <div className="profile-image">
                          <Avatar src="/broken-image.jpg" />
                            {/* <img src={default_profile} alt="" className="profile-image"></img> */}
                          </div>
                        </div>
                       
                        <div className="sent-message" >
                          <div className="inter-step-div">
                          {value.isLoading ? 
                        <div className='loadingspin'> <span className="dot-typing"></span></div>
                          : null}
                          {value.message && (
                        //     <div>
                        //    <span style={{ whiteSpace:'pre-wrap'}}>
                        //    <Typewriter
                        //      options={{
                        //        strings: value.message,
                        //        autoStart: true,
                        //       // loop: true,
                        //      }}
                        //    />
                        //  </span>
                        //  </div>
                            <span style={{whiteSpace:'pre-wrap'}} >{value.message} </span>
                         
                            )}
                          </div>
                        </div>
                       
                      </div>
                    })}
                  </div>
                  <div className='prompt-textarea-container'>
                  <div> {fileType == '' ? null :
                    <div> {(fileType == 'png' || fileType == 'svg' || fileType == 'jpg' || fileType == 'jpeg') ?
                      <div>
                        <span className='close-icon' onClick={closeimg}> <i className="fa fa-times-circle-o" aria-hidden="true"></i></span>
                        <img src={imagePreviewUrl} alt="Selected Preview" className="preview-img" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                      </div>
                      : <div className='filetype'>{userInput}<span className='filetypeicon' onClick={closeimg}><i className="fa fa-times-circle-o" aria-hidden="true"></i></span></div>}</div>
                  }</div>
                  <div className="textarea-container" style={{ height: '40px' }}>
                    <div className="">
                      <button className="button-upload" onClick={handleUpload}>
                      <AttachmentOutlined>Outlined</AttachmentOutlined>
                        {/* <img className="imgcss" src={upload_file} alt="" ></img> */}
                      </button>
                      <input type="file" onChange={handleFileChange} ref={hiddenFileInput} style={{ display: 'none' }} />
                      {/* className={`text-input ${textAreaEnable? '' : 'textdisabled'}`} */}
 
                      <textarea  className={`text-input ${textAreaEnable? '' : 'textdisabled'}`} rows={1} id='textAreaType' ref={scrollingTextareaRef} value={x} 
                      placeholder='Send a Message'
                        onChange={(e) => {
                          setX(e.target.value)
                          toggleSendButton();
                           adjustTextareaHeight(e.target, 4)
                        }}
                        onKeyDown={(e) => {
                          handleKeydown(e);
                          if (e.key === 'Enter') {
                            sendMessage();
                            e.preventDefault();
                          }
                         
                        }} style={{ maxHeight: '200px', height: '38px' }}></textarea>

                      <button className="send-button" disabled={!isSendButtonEnabled} onClick={sendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
                          <path

                            d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.3101 11.87 11.3101 11.39 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                            fill={isSendButtonEnabled ? '#000' : '#B0B0B0'}
                          />
                        </svg>
                      </button>
                      <div>

                        {/* <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button> */}

                      </div>
                    </div>
                  </div>
                </div>
                </div>

             
              </div>
            </Col>
          </Row>
        </Form>

      </div>
    </div>
  )
}

export default Home
function handleFile(fileUploaded: any) {
  throw new Error('Function not implemented.');
}

