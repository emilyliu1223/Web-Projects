import React,{useState,useEffect} from 'react';
import "./Post.css"
import './App.css';
import Post from "./Post"
import {db,auth} from "./firebase.js"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';
import ImageUpload from "./ImageUpload"

import InstagramEmbed from 'react-instagram-embed';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
   const [posts,setPosts]=useState([]);
   const[openSignIn, setOpenSignIn]=useState(false);
   const [open, setOpen]=useState(false);
   const [username, setUsername]=useState("");
   const [email, setEmail]=useState("");
   const [password, setPassword]=useState("");
   const [user,setUser]=useState(null);
   useEffect(()=>{
     //onAuthStateChanged make user keep logged in 
     // state do notmaintain log in
     const unsubscribe= auth.onAuthStateChanged((authUser)=>{
       if(authUser){
         //user has logged in
         
          setUser(authUser);

       }else{
          setUser(null);
       }
     })
     return()=>{
       //perform some cleanup actions
       unsubscribe();
     }
   },[user,username])


   useEffect(()=>{
     db.collection('posts').orderBy("timestamp","desc").onSnapshot(snapshot=>{
       ///everytime a change in database it fire this code and update everything realtime
       setPosts(snapshot.docs.map(doc=>(
         {
           id:doc.id,
           post:doc.data()
           
         }
       )));
     })
   },[]);

     const signUp=(event)=>{
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
          return authUser.user.updateProfile({
            displayName:username
          })
        })
        .catch((error)=>alert(error.message));
        setOpen(false);
     };

     const signIn=(event)=>{
      event.preventDefault();

      auth
       .signInWithEmailAndPassword(email,password)
       .catch(err=>alert(err.message))
       setOpenSignIn(false);
     }

  
   
  return (
    <div className="app" >
      
     
       <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
         <img className="app__headerImage"src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/50px-Instagram_logo_2016.svg.png" alt="insta"/>
         </center>
         <Input
         placeholder="User Name"
         type="text"
         value={username}
         onChange={(e)=>setUsername(e.target.value)}>
           
         </Input>
         
         <Input
         placeholder="Email"
         type="text"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}>

         </Input>

         <Input
         placeholder="Password"
         type="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}>
           
         </Input>
         <Button onClick={signUp} type="submit">
           Sign Up
         </Button>
         
         
         </form>
       </div>
      </Modal>
      {/* /////////////////////////////////// */}

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
         <img className="app__headerImage"src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/50px-Instagram_logo_2016.svg.png" alt="insta"/>
         </center>
         
         
         <Input
         placeholder="Email"
         type="text"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}>

         </Input>

         <Input
         placeholder="Password"
         type="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}>
           
         </Input>
         <Button onClick={signIn} type="submit">
           Sign In
         </Button>
         
         
         </form>
       </div>
      </Modal>
      {/* ////////////////////////////////////// */}

       <div className="app__header">
       
       <img className="class_headerImage"
       style={{paddingLeft:"20px"}}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/50px-Instagram_logo_2016.svg.png"
              alt="insta-img"/>
         <img className="class_headerImage"
                style={{paddingLeft:"10px"}}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/130px-Instagram_logo.svg.png"/>
              
              
              
             {user?(<Button onClick={()=>auth.signOut()}>
           Logout
         </Button>):( 
           <div >
               <Button onClick={()=>setOpenSignIn(true)}>
               Sign In
              </Button>

               <Button onClick={()=>setOpen(true)}>
               Sign Up
              </Button>
           </div>
          
         
        )}
        

         </div>
        
           <div className="app__posts">
             <div className="app__postLeft">
             {
              posts.map(({id,post}) =>(
                <Post  key={id} postId={id} user={user}  username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
              ))
            }
             </div>
              <div className="app__postRight">
                                    
            <InstagramEmbed
                 url='https://www.instagram.com/p/CDeDUM3nfIA/'
                 maxWidth={320}
                 hideCaption={false}
                 containerTagName='div'
                 protocol=''
                 injectScript
                 onLoading={() => {}}
                 onSuccess={() => {}}
                 onAfterRender={() => {}}
                 onFailure={() => {}}
/> 

                         
<InstagramEmbed
                 url='https://www.instagram.com/p/CDUJT0RDbDD/'
                 maxWidth={320}
                 hideCaption={false}
                 containerTagName='div'
                 protocol=''
                 injectScript
                 onLoading={() => {}}
                 onSuccess={() => {}}
                 onAfterRender={() => {}}
                 onFailure={() => {}}
/> 

<InstagramEmbed
                 url='https://www.instagram.com/p/CDePs2fgQTc/'
                 maxWidth={320}
                 hideCaption={false}
                 containerTagName='div'
                 protocol=''
                 injectScript
                 onLoading={() => {}}
                 onSuccess={() => {}}
                 onAfterRender={() => {}}
                 onFailure={() => {}}
/> 

              </div>
              
           
    </div>

    {user?.displayName?(<ImageUpload username={user.displayName}/>):(<h3 className="sorry">Login to say something ...</h3>)}
    
    </div>
  );
}

export default App;
