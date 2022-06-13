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

  client.read({ sheet: "Sheet1" }).then(
    function (data) {
      const da = JSON.parse(data);
      // console.log(data);
      // let x = {First_Name, Last_Name, Email}
      // da.map((x)=>{
        
      // })
      da.forEach(element => {
        
      
        console.log(element.First_Name);
        const existFName = element.First_Name;
        const existLName = element.Last_Name;
        const existEmail = element.Email;
        
        switch (existEmail) { 
          case email:
            console.log("User Exists");
            break;
          default:
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
                  // console.log(err)
                }
              );
            break;

        // if (existFName == fName && existLName == lName && existEmail == email) {
        //   console.log("User Exists");
        } 
        
      });
    },
    function (err) {
      console.log(err);
    }
  );

  // function createUser(fName, lName, email){
    
  // }
});



app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.listen(process.env.PORT || Port, function () {
  console.log(`Server running on port ${Port}`);
});

// https://sheetdb.io/api/v1/bpg7l00ugjlgb
