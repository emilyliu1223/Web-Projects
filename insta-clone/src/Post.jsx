import React,{useState,useEffect} from 'react'
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import { db } from './firebase';
import firebase from "firebase"
import "./Post.css"
import logo from "./logo.png"

function Post({postId,user,username,caption,imageUrl,timestamp}) {
    const[comments, setComments]=useState([]);
    const[comment, setComment]=useState("");
    
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe=db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map(doc=>doc.data()));
            });
        }
        return ()=>{
            unsubscribe();
        };
        
    }, [postId])
    
     const postComment=(event)=>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments") 
            .add({
                text:comment,
                username:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            });
            setComment("");
     }


    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
            className="post__avatar"
            alt="Avatar" 
            src={logo} />
            <h3>{username}</h3>
            </div>


        <img className="post__image" 
        src={imageUrl}
        alt="cake"/>
         <Typography  style={{paddingLeft:"20px",paddingTop:"10px"}}color="textSecondary" variant="body2" component="p" gutterBottom>
          {timestamp}
        </Typography>
        <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
           <div className="post__comments">

           {comments.map((comment)=>(
              
               <p>
                   <strong>{comment.username}</strong>: {comment.text}
               </p>
           ))}

           </div>
         {user&&(
              <form className="post__commentBox"> 
              <input type="text"
              className="post__input"
              placeholder="Add some comments"
              value={comment}
              onChange={(e)=> setComment(e.target.value)}/>
 
              <button
                 className="post__button"
                 disabled={!comment}
                 type="submit"
                 onClick={postComment}
                 >
                  Comment
              </button>
          </form>
    )}
         
        
        </div>
        
    )
}

export default Post
