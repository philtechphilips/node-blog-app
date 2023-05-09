const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");

router.post("/", auth, async (req, res) => {
  const username = req.user.username;
  try {
    const comment = new Comment({ ...req.body, username });
    await comment.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e); // Sending an error response with the error object
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id });
    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e); // Sending an error response with the error object
  }
});

module.exports = router;
