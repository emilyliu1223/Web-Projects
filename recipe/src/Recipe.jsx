import React,{useState} from 'react'
import {Link} from "react-router-dom"
//material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import "./App.css"

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#557571',
        light:'#145374'
      },
      secondary: {
        light: '#fabea7',
        main: '#d49a89',
        
        
      },
    },
  });

function Recipe(props) {
   
    
    return (
        <Card className="card" style={{height:"390px"}}>
            <ThemeProvider theme={theme}>
            <CardActionArea>
            <CardMedia 
              component="img"
              height="230"
              image={props.image}
            />
             <CardContent style={{marginLeft:"10px"}}>
             <Typography gutterBottom variant="body1" color="secondary" component="h5" style={{fontFamily:"'Alata', sans-serif",fontWeight:"bold"}}>{props.title}</Typography> 
              <Typography variant="body2" color="textSecondary" component="p">Calories: {props.calories}</Typography>
              </CardContent>
        
            </CardActionArea>
            
            <CardActions style={{marginLeft:"25px",border:"1px solid #d49a89",width:"fit-content"}}>
        
        <Link to={{pathname:`/recipe/${props.title}`,
              state:{title:props.title,image:props.image,ingredients:props.ingredients,category:props.category,health:props.health, diet:props.diet,url:props.url,digest:props.digest}
        }} style={{color:"#d49a89",fontFamily:"'Alata', sans-serif",textDecoration:"none"}}>
            View Recipe
            </Link>
            
        
        </CardActions>
        </ThemeProvider>
            </Card>
    )
}

export default Recipe
