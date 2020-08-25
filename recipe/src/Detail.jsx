import React from 'react'
import "./App.css"
import Checkbox from '@material-ui/core/Checkbox';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#557571',
        light:'#145374'
      },
      secondary: {
      
        main:'#f4f4f4',
        
        
      },
    },
  });

function Detail(props) {
    const title=props.location.state.title;
    const image=props.location.state.image;
    const ingredients=props.location.state.ingredients;
    const health=props.location.state.health;
    const diet=props.location.state.diet;
    const digest=props.location.state.digest;
    const url=props.location.state.url;
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
   
    return (
        
        <div className="Detail">
            <ThemeProvider theme={theme}>
            <div className="Detail__info ">
                
            <div className="title"style={{height:"130px"}}><h1 style={{color:"#f4f4f4",fontSize:"30px"}}>{title}</h1></div>
             
             <img className="Detail__img"src={image} alt={title}/>
             <label className="label"style={{marginLeft:"10px",paddingTop:"5px"}}><a href={url} style={{color:"#f4f4f4"}}>Website</a></label>
            
            
    
            <br/>
               <label style={{marginLeft:"10px",paddingTop:"10px"}}>Health Label: <br/>{health.map(ht=>(
                   <label style={{color:"#f7d1ba",border:"1px solid #f7d1ba",marginRight:"5px",marginTop:"3px"}}>{ht}</label>
               ))}</label>
               
               <label style={{marginLeft:"10px",paddingTop:"0px"}}>Diet Label: <br/> {diet.map(dt=>(
                   <label style={{color:"#f7d1ba",border:"1px solid #f7d1ba",marginTop:"3px"}}>{dt}</label>
               ))}
               </label>
               <br/>
              
               
            </div>
            
           <div className="fake">
             <div className="Detail__steps">
                {ingredients.map(ingredient=>(
                    <div>

                        <div className="steps"><Checkbox
        
        color="primary"
      /><strong className="ingre__info"> {ingredient.text}</strong></div>
                        <div><img className="ingre__photo" src={ingredient.image} /></div>
                    </div>
                ))}
                
                </div>
            </div>
            <div className="digest">
                <div>
            {digest.slice(0,5).map(dgt=>(
                     <div className="digest-list">
                         <div>{dgt.label}</div>
                         <div>:</div>
                         <div>{dgt.total}</div>
                     </div>
                     
                 ))}
                 </div>
                
            </div>
            </ThemeProvider>
            </div>
            
       
    )
}

export default Detail
