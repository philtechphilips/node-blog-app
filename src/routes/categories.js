const router = require("express").Router();
const auth = require("../middleware/auth");
const Category = require("../models/Category");

// New Category
router.post("/", auth, async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.status(200).send();
  } catch (e) {
    if (e.code === 11000) {
      res.status(422).json({ error: "Category is already taken" }); // sending an error response as JSON with the error message
    } else {
      res.status(400).send(e); // Sending an error response with the error object
    }
  }
});

// Get Category
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).send(category);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Edit Category
router.put("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body); // Get the keys (property names) from the request body
  const allowedUpdates = ["name"]; // Define an array of allowed updates
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  ); // Check if all updates are allowed

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" }); // If any update is not allowed, send an error response
  }

  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).send({ error: "Category not found!" });
    }
    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Category
router.delete("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    if (!category) {
      return res.status(404).send({ error: "Post not found!" });
    }
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
