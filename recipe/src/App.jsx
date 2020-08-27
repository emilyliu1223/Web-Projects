import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from "./Recipe"
//material-ui
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#557571',
      light:'#145374'
    },
    secondary: {
      light: '#f7d1ba',
      main: '#d49a89',
      dark: '#ba000d',
      
    },
  },
});

function App() {

    const APP_ID="acde7f85";
    const APP_KEY="9c3a16c5228459e897dc1dbc61461562"; 
    const[recipes,setRecipes]=useState([]);
    const[search, setSearch]=useState("");
    const [query, setQuery]=useState('chicken');
    const [result,setResult]=useState('');
    const [cuisine, setCuisine]=useState('Asian')
    useEffect(() => {
      getRecipes();
      
      return () => {
        // cleanup
      }
    }, [query])
    const getRecipes=async()=>{
       const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=50`);
       const data=await response.json();
       setRecipes(data.hits);
       
      
    }

    const updateSearch=e=>{
      setSearch(e.target.value);
    };

    const getSearch=e=>{
      e.preventDefault();
      setQuery(search);
      setSearch("");
    };

  return (
    <div className="App">
     <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" style={{alignItems:"center",height:"70px"}}>
      <Toolbar style={{fontSize:"35px"}}>
        Ting Recipe
         </Toolbar>
         </AppBar>
        
         <form onSubmit={getSearch} className="search-form" style={{margin:"10px"}}>
            <TextField  label="Search your recipe" 
              placeholder="Search…"
              type="text" 
              value={search} 
              onChange={updateSearch}
              color="secondary"
            />
          <IconButton variant="outlined"  type="submit"><SearchIcon color="secondary" /></IconButton>
         </form>
         </ThemeProvider>
        
         <div className="container">
         <div className="row">
       {recipes.map(recipe=>(
        
           <div key={recipe.recipe.label} className="col-md-4">
         <Recipe title={recipe.recipe.label}
                 image={recipe.recipe.image}
                 calories={recipe.recipe.calories}
                 id={recipe.recipe.label}
                 key={recipe.recipe.label}
                 ingredients={recipe.recipe.ingredients}
                 category={query}
                 url={recipe.recipe.url}
                 diet={recipe.recipe.dietLabels}
                 health={recipe.recipe.healthLabels}
                 digest={recipe.recipe.digest}
                 />
                 </div>
         
       ))}
       </div>
    </div>
    </div>
  );
}

export default App;
