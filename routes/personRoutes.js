const express = require("express");
// require the person model
const Person = require("./../models/person");
const router = express.Router();
// require the jwtAuthMiddleware and generateToken functions from jwt.js
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// POST methods  ----------> save the data to the database

router.post("/signup", async (req, res) => {
  // signup route
  try {
    const data = req.body; // Assuming the data is sent in the request body
    const newPerson = new Person(data); // create a new person document using the mongoose model
    const response = await newPerson.save(); // save the new person document to the database
    console.log("data saved successfully");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));

    const token = generateToken(payload); // generate a jwt token using the user information
    console.log("token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("error occured while Signing up");
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------

router.post("/login", async (req, res) => {
  // login route
  try {
    const { username, password } = req.body; // get the username and password from the request body
    const user = await Person.findOne({ username: username }); // find the user with the specified username
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload); // generate a jwt token using the user information
    console.log("Login is successful!")
    res.status(200).json({ token: token });

  } catch (error) {

    console.log("error occured while Logging in");
    console.log(error);
    res.status(500).json({ error: "Internal server error" });

  }
});

// GET methods ----------> retrieve the data from the database

router.get("/", jwtAuthMiddleware , async (req, res) => {
  try {
    const response = await Person.find(); // retrieve all person documents from the database
    console.log("data fetched successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("error occured");
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------------------

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try{
    const userData = req.user;
    console.log("user data : ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json(user);
    console.log("profile fetched successfully");

  }
  catch(error){
    console.log("error occured");
    res.status(500).json({ error: "Internal server error" });
  }
});



// -------------------------------

// parametrized API call in this way is very hectic and time consuming hence in express we use routes
router.get("/:workType", async (req, res) => {
  const workType = req.params.workType; // get the workType parameter from the URL
  try {
    if (workType == "waiter" || workType == "chef" || workType == "manager") {
      // check if the workType is valid
      const response = await Person.find({ work: workType }); // retrieve all person documents with the specified workType from the database
      console.log("workType fetched successfully");
      res.status(200).json(response); // send the response back to the client
    } else {
      res.status(404).json({ error: "Invalid work type" }); // send a 404 response if the workType is invalid
    }
  } catch (error) {
    console.log(error); // log any errors that occur
    res.status(500).json({ error: "Internal server error" }); // send a 500 response with an error message
  }
});

// PUT methods ----------> update the data in the database

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // get the personId parameter from the URL
    const updatedPersonData = req.body; // Assuming the data is sent in the request body // here req.body contains the updated data
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the new updated document
        runValidators: true, // return mongoose validations i.e. checks the required fields automatically
      }
    ); // update the person document with the new data and return the updated document

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("error occured");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE methods ----------> delete the data from the database

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // get the personId parameter from the URL
    const response = await Person.findByIdAndDelete(personId); // delete the person document with the specified personId from the database
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted successfully");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.log("error occured");
    res.status(500).json({ error: "Internal server error" });
  }
});
// exporting the routers
module.exports = router;
