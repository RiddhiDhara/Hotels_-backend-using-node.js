
const express = require("express"); // require the express module
const app = express(); // create an express app
const db = require("./db"); // require the db module
const Person = require("./models/person"); // require the person model
const MenuItem = require("./models/menuItem"); // require the menuitem model
const personRoutes = require("./routes/personRoutes"); // require the personRoutes from routes folder
const menuRoutes = require("./routes/menuItemRoutes"); // require the menuRoutes from routes folder

// --------------------------------------------------------------------- Require the body-parser module

const bodyParser = require("body-parser"); // Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json()); // req.body

// --------------------------------------------------------------------- define a route for the root url ('/')

app.get("/", function (req, res) {
  res.send("welcome to my hotel... How may i help you!");   // respond with a welcome message
});

// ===================================================================== routes

// here we are writing /person instead of / because in personRoutes.js the common base url is written as /person and we need to remove that part from the url in personRoutes.js

// use the routes from routes folder

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

// ===================================================================== start the server and listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000"); // log a message when the server is listening
});

// rough begins here



















































// ===========================================================================

// app.get("/menu", async (req, res) => {
//   try {
//     const response = await MenuItem.find();
//     console.log("menu fetched successfully!");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// POST method

// app.post("/menu", async (req, res) => {
//   try {
//     const data = req.body;
//     const newMenuItem = new MenuItem(data);
//     const response = await newMenuItem.save();
//     res.status(200).json(response);
//     console.log("menu saved successfully!");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/person", async (req, res) => {
//   try {
//     // retrieve all person documents from the database
//     const response = await Person.find();
//     console.log("data fetched successfully");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log("error occured");
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // parametrized API call in this way is very hectic and time consuming hence in express we use routes
// app.get("/person/:workType", async (req, res) => {

//   const workType = req.params.workType; // get the workType parameter from the URL
//   try {
//     // check if the workType is valid
//     if (workType == "waiter" || workType == "chef" || workType == "manager") {
//       // retrieve all person documents with the specified workType from the database
//       const response = await Person.find({ work: workType });
//       // send the response back to the client
//       res.status(200).json(response);
//     }
//     else {
//       // send a 404 response if the workType is invalid
//       res.status(404).json({ error: "Invalid work type" });
//     }
//   } catch (error) {
//     // log any errors that occur
//     console.log(error);
//     // send a 500 response with an error message
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// --------------------------------------------------------------------- post method

// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body; // Assuming the data is sent in the request body
//     const newPerson = new Person(data); // create a new person document using the mongoose model
//     const response = await newPerson.save(); // save the new person document to the database

//     console.log("data saved successfully");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log("error occured");
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// =======================================================================================================================

// // define a route for the '/person' url
// app.post('/person',(req, res) => {
//     const data = req.body; // Assuming the data is sent in the request body // user sent this data either from postman or from a form in browser

//     // create a new person document using the mongoose model
//     // const newPerson = new Person(); // here an empty object is created of type Person

//     // note that the below process of mapping each field from data to the newPerson object is hectic and time consuming

//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.work = data.work;
//     // newPerson.mobile = data.mobile;
//     // newPerson.email = data.email;
//     // newPerson.address = data.address;
//     // newPerson.salary = data.salary;

//     // hence we will directly pass the data object to the mongoose model
//     const newPerson = new Person(data);

//     // save the new person document to the database
//     newPerson.save((error, savedPerson)=> {     // note that Model.prototype.save() no longer accepts a callback, hence we cannot write callback here
//         if(error) {
//             // if there is an error, log it
//             console.log('error saving person: ',error);
//             res.status(500).json({error: "internal server error"});
//         } else {
//             // if there is no error, log a message
//             console.log("person saved successfully");
//             res.status(201).json(savedPerson);
//         }
//     })
// })
