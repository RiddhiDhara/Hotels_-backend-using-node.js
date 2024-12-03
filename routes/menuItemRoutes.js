const express = require("express");
// require the menuitem model
const MenuItem = require("../models/menuItem");
const router = express.Router();

// GET methods

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("menu fetched successfully!");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------

router.get("/:tasteType", async (req, res) => {
  const tasteType = req.params.tasteType;
  try {
    if (tasteType == "Sour" || tasteType == "Spicy" || tasteType == "Sweet" || tasteType == "Salty" || tasteType == "Hot" || tasteType == "Bitter") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("taste fetched successfully!");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST method

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    res.status(200).json(response);
    console.log("menu saved successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// exporting the routers
module.exports = router;
