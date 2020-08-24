//jshint esversion:6

const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
//gotta include complete address
//statusCode will return the response status code
//200 means ok, best status
res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req,res){

  const query=req.body.cityName;
  const apiKey="c244397f25ced16041f179a2e8870f3e";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        // put the result of this console into cryptii hexadecimal to text you can see the original data
        //parse into json make it display json form
      const weatherData= JSON.parse(data);
      //reach into branch of json to target specific data
      const temp=weatherData.main.temp;
      console.log(temp);
      const description=weatherData.weather[0].description;
      //there can be only ONE send each request!!!!!!
      // BUT we could have multiple res.write()
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is curretly "+ description+"</p>");
      res.write("<h1>The temperature in "+query+" is: "+ temp +" degree Celcius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
      const object={
        name:"Emily",
        favoritColor:"Lilac"
      };
      // do the opposite of parse form trans it to a unformed text
      console.log(JSON.stringify(object));
        console.log(weatherData);
      });
    });
});
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
