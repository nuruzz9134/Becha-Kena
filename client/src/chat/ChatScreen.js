
import React,{ useEffect,useRef,useState } from 'react'
import { useCallback } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

import ChatBox from './ChatBox'
import { chatlogs,
         add_new_text_data,
         add_new_image_data 
        } from '../features/ChatlogSlice';
import { userId } from '../features/AuthSlice';
import { acc_Token } from '../features/AuthSlice';
import Peer from './Peer';
import {HiPhoneMissedCall} from 'react-icons/hi';
import {AiOutlineSend} from 'react-icons/ai';
import {BiSolidImageAdd} from 'react-icons/bi';
import {BiSolidVideoPlus} from 'react-icons/bi';
import {BiSolidPhoneIncoming} from 'react-icons/bi';
import '../Css/chat.css';

const ChatScreen = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const {groupname} = useParams()
  const allchats = useSelector(chatlogs)
  const token = useSelector(acc_Token)
  const userid = useSelector(userId)
  
  const [enteredText,setEnteredText] = useState('')
  const [enteredImage,setEnteredImage] = useState('')

  const socket = useRef()
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
 
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const [localvideoStream, setLocalvideoStream] = useState(null);
  const [remotevideoStream, setRemotevideoStream] = useState(null);

  let all_chat_logs = ''
  all_chat_logs = (
      allchats.map((item,index)=>(
          < ChatBox key={index} items={item}/>
      ))
  )

  useEffect(() => {
    socket.current = new WebSocket(
      `ws://127.0.0.1:8000/chatin/${groupname}/?userid=${userid}`);
    return () => {
      socket.current.close();
    };
  }, []);


  const ChatsDataSubmitHandler = async(event)=>{
    event.preventDefault();
    if(socket.current){
      if(enteredText){
        socket.current.send(JSON.stringify({
          type: 'texts',
          text: enteredText,
          user:userid
      }));
      }
    }
  }


  const ImageDataSubmitHandler = async(event)=>{
      event.preventDefault();
      const img_data = new FormData();
      img_data.append("image",enteredImage)
      if (enteredImage !== ''){
        await axios.post(`http://127.0.0.1:8000/imageupload/?group=${groupname}`,img_data,{
          headers: { Authorization: `Bearer ${token}` }
        }
        ).then(res =>{
                        const imageUrl = res.data[0].img
                        const imageDatetime = res.data[0].timestamp
                        if(socket.current){
                          if(imageUrl){
                            socket.current.send(JSON.stringify({
                              type: 'photo',
                              photo_url: imageUrl,
                              photo_time: imageDatetime,
                              user:userid
                          }));
                          }
                        }
                            }).catch(error => {
                                    console.log('There was an error!', error);
                                });
      }
  }


    const LiveCallHandler = useCallback(async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const offer = await Peer.getOffer();
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify({
            type: 'call',
            offer: offer,
            to:remoteSocketId
        }));
        } else {
          console.error('WebSocket not open');
        }
    }, [remoteSocketId, socket.current]);


    const handleIncommingCall = useCallback(
      async (from,offer) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);
        const ans = await Peer.getAnswer(offer);
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify({
            type: 'callAccepted',
            answer: ans,
            to:from
        }));
        } else {
          console.error('WebSocket not open');
        }
      },
      [socket.current]
    );

    const sendStreams = useCallback(() => {
        for(const track of myStream.getTracks()) {
          Peer.peer.addTrack(track, myStream);
        }
      
      console.log("Track get>>>",myStream.getTracks())
    }, [myStream]);

    const handleAcceptedCall = useCallback(
      async (from,answer) => {
        Peer.setLocalDescription(answer)
        console.log("call accepted")
        // sendStreams();

      },[sendStreams]
      )

      const handleNegoNeeded = useCallback(async () => {
        const offer = await Peer.getOffer();
        console.log("nego offer..",offer)
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify({
            type: 'nego_needed',
            offer: offer,
            to: remoteSocketId
        }));
        } else {
          console.error('WebSocket not open');
        }
      }, [remoteSocketId, socket.current]);


  useEffect(() => {
    Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async (from, offer) => {
      const answer = await Peer.getAnswer(offer);
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify({
          type: 'nego_done',
          answer: answer,
          to: from
      }));
      } else {
        console.error('WebSocket not open');
      }
    },
    [socket.current]
  );

  const handleNegoNeedFinal = useCallback(async (answer) => {
    await Peer.setLocalDescription(answer);
  }, []);

      useEffect(() => {
        Peer.peer.addEventListener("track", async (ev) => {
          const remoteStream = ev.streams;
          console.log("GOT TRACKS!!");
          setRemoteStream(remoteStream[0]);
        });
      }, [myStream]);



    useEffect(()=>{
      socket.current.onmessage = e =>{
        let dat = new Date().toLocaleString()
        const data = JSON.parse(e.data);

        if (data.type === 'texts'){
          let newadd = {
            content: data.text,
            timestamp: dat,
            sender: data.user
          }
          dispatch(add_new_text_data(newadd))
          setEnteredText('')
        };

        if (data.type === 'photo') {
          let newadd = {
            img: data.photo_url,
            timestamp: data.photo_time,
            sender:data.user
          }
          dispatch(add_new_image_data(newadd))
          setEnteredImage('')
        };


        if (data.type === 'user_join') {
          console.log("user message..",data.message)
          setRemoteSocketId(data.channelName)
        };
        if (data.type === 'incomming_call') {
          handleIncommingCall(data.from,data.offer)
        };
        if (data.type === 'accepted_call') {
          handleAcceptedCall(data.from,data.answer)
        };
        if (data.type === 'incomming_nagotiation') {
          handleNegoNeedIncomming(data.from,data.offer)
        };
        if (data.type === 'nagotiation_final') {
          console.log(" negoooo  answer ...",data.answer) 
          handleNegoNeedFinal(data.answer)
        };
      }
    },[socket.current])

    const EndCall = ()=>{
      setMyStream('')
      setRemoteStream('')
    }


    return (
      <div className='chat-screen'>

      <div className='display-box'>
        
        {myStream ? <div className='mainStream'>
                      <div className='mystream'>
                        <ReactPlayer playing muted width='200px' height='200px'  url={myStream}/>
                      </div>

                      <div className='remotstream'>
                        <div>
                        <ReactPlayer playing muted width='800px' height='450px'  url={remoteStream}/>
                        </div>
                        <div className='call-end-button'>
                        <button onClick={EndCall}><HiPhoneMissedCall size='50px' color='white'/></button>
                      </div>
                      </div>
                   </div>
                   
        
         : all_chat_logs}
      </div>


        <div className='input-box'>
  
        <form  onSubmit={ChatsDataSubmitHandler} className='chat-input-box'>
          <input type="text" id="text_sentence" 
          placeholder='type your text hear'
          onChange={e=>setEnteredText(e.target.value)} 
          value={enteredText} />
          <button type='submit' value='Submit'><AiOutlineSend size='25px' color='blue'/></button>
        </form>
  
  
        <form  onSubmit={ImageDataSubmitHandler} className='photo-input-box' >
          <label for='imageid'><BiSolidImageAdd size='35px' color='black'/> </label>
          <input type="file" name="image" accept="image/*" id='imageid' className='photo-file-input'
          onChange={e=>setEnteredImage(e.target.files[0])}
          /> <br/><br/>
          <button type='submit' value="Submit"><AiOutlineSend size='25px' color='black'/></button>
        </form>

        {remoteSocketId && <button onClick={LiveCallHandler}><BiSolidVideoPlus size='35px' color='blue' /></button>}
        {myStream && <button onClick={sendStreams}><BiSolidPhoneIncoming size='35px' color='green' /></button>}

        </div>



        <div>
    </div>
      </div>
    )
}

export default ChatScreen