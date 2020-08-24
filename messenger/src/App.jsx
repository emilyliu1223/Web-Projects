import React, { useState,useEffect } from 'react';

import {FormControl, InputLabel,Input} from '@material-ui/core';
import "./App.css"
import Message from "./Message.jsx";
import db from "./firebase.js"
import firebase from "firebase"
import FlipMove from "react-flip-move"
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import fish from "./fish.mp4"


function App() {
  const[input,setInput]=useState("");
  const[messages,setMessages]=useState([]);
  const[username, setUsername]=useState("");
  
  useEffect(()=>{
   db.collection('messages')
   .orderBy("timestamp","desc")
   .onSnapshot(snapshot=>{
     setMessages(snapshot.docs.map(doc=>({id:doc.id,message:doc.data()})))
   })
  },[])


  useEffect(()=>{
     setUsername(prompt("Please enter your name"));
  },[])

  const sendMessage=(event)=>{
      event.preventDefault();

      db.collection('messages').add({
        message:input,
        username:username,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      //  setMessages([...messages,{username:username,message:input}]);
      setInput("");
  }

  return (
    <div className="App">
      <video autoPlay loop muted
       
       style={{
         position: "fixed",
         width: "100%",
         left:"0%",
         top:"0%",
         height:"100%",
         objectFit:"cover",
         transfrom:"translate(-50%,-50%)",
         zIndex:"-1"
       }}
      
      ><source src={fish} type="video/mp4"/></video>
      
      <h1 style={{zIndex:1}}>Baby Chat with Emily 😘</h1>
      <h2 style={{zIndex:1}}>Weclome {username}. </h2>
         
      <form className="app_form">
      <FormControl className="app__formControl">
        <InputLabel >Enter a message ...</InputLabel>
        <Input className="app__input"value={input} onChange={event=>setInput(event.target.value)} />
         <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
          <SendIcon />
          </IconButton>
      </FormControl>
      
     
     </form>
     <FlipMove>
      {messages.map(({id,message})=>(
        <Message  key={id} message={message} username={username}  />
       
      ))}
      </FlipMove>
    </div>
  );
}

export default App;
