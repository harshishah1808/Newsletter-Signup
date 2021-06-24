const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const first=req.body.fname;
  const last=req.body.lname;
  const eml=req.body.email;
  const data={
    members: [
      {
        email_address: eml,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last
        }
      }
    ]
  };

  const jsondata=JSON.stringify(data);

  const url="https://us6.api.mailchimp.com/3.0/lists/6fb39c27e0";
  const options={
    method: "POST",
    auth: "harshi_shah1808:0faff5961d0a7e25bdfeb639118fd25e-us6"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsondata);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
})

//api key
// 0faff5961d0a7e25bdfeb639118fd25e-us6

//list id
// 6fb39c27e0
