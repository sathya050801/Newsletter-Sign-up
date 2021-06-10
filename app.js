const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extenden : true}));

app.get("/",function(req,res)
{
res.sendFile(__dirname + "/signup.html" );
});

app.post("/", function(req,res)
{
 const firstName=req.body.fname;
const lastName=req.body.lname;
 const Email=req.body.email;

const data = {
members: [
  {
   email_address: email,
   status: "subscribed",
   merge_fields:
   {
     FNAME: firstName,
     LNAME: lastName
   }
  }
]
};
  const jsonData = JSON.stringify(data);
const url = "https://us1.api.mailchimp.com/3.0/lists/f602369faf";

const options = {
  method: "POST",
  auth: "sathya:934556aeb4eab62a4860d0af72c6bc48-us1"
}

const request = https.request(url, options, function(response)
{
if(response.statusCode ===200)
{
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}

response.on("data", function(data)
 {
  console.log(JSON.parse(data));
 })
})
request.write(jsonData);
request.end();
 console.log(firstName,lastName,Email)
});

app.listen(3000, function()
{
  console.log("Server is runnig on port 3000");
});
