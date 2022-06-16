const express = require("express");
const bodyParser = require("body-parser");
const sheetdb = require("sheetdb-node");
const client = sheetdb({ address: "bpg7l00ugjlgb" });

const app = express();
const Port = 3000;
//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/database", (req, res) => {});

app.post("/", (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  //Check if the user exists
  client.read({ search: { First_Name: fName, Last_Name: lName, Email: email } }).then(function(data){
    const da = JSON.parse(data)
    if (da.length === 0) {
       console.log("No Data") 
       client.create({ First_Name: fName, Last_Name: lName, Email: email })
              .then(
                function (data) {
                  // const success = JSON.parse(data).created
                  if (data) {
                    res.sendFile(`${__dirname}/success.html`);
                  }
                },
                function (err) {
                  if (err) {
                    res.sendFile(`${__dirname}/failure.html`);
                  }
                  
                }
              );
      }
    else{
      console.log("There is data")
      res.sendFile(`${__dirname}/failure.html`);
    }
  },
  function (err) {
    
  });

});


app.post("/failure", (req, res)=>{
  res.redirect("/")
})

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.listen(process.env.PORT || Port, function () {
  console.log(`Server running on port ${Port}`);
});

// https://sheetdb.io/api/v1/bpg7l00ugjlgb
