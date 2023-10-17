const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const amqp = require("amqplib");
app.use(cors());
const mongoose = require("mongoose");
require("./scheduledTasks");

mongoose.connect(
  "mongodb+srv://lightmnd:xp1GEzmtvTOPY9n6@microservices.sv6dhxq.mongodb.net/"
);
console.log("connect to database");

const posts = {};

const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  comments: [{ type: String }],
});

const Post = mongoose.model("Post", postSchema);

const commentSchema = new mongoose.Schema({
  id: String,
  content: String,
  postId: String,
});

const Comment = mongoose.model("Comment", commentSchema);
const handleEvents = async (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    const newPost = new Post({ id, title, comments: [] });

    try {
      await newPost.save();
    } catch (error) {
      console.error("Error saving post to MongoDB:", error);
    }
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post?.comments?.push({ id, content });
    const newComment = new Comment({ id, content, postId });
    try {
      await newComment.save();
      await Post.findOneAndUpdate(
        { id: postId },
        { $push: { comments: id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error adding comment to post in MongoDB:", error);
    }
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://localhost:4005/events");

  // Connect to RabbitMQ
  const connection = await amqp.connect("amqp://127.0.0.2:5672");
  const channel = await connection.createChannel();
  const queueName = "eventQueue";

  // Declare a queue for receiving events
  await channel.assertQueue(queueName, { durable: false });
  channel.consume(queueName, (msg) => {
    try {
      const eventData = JSON.parse(msg.content.toString());
      console.log("Received event:", eventData.type);
      handleEvents(eventData.type, eventData.data);
    } catch (error) {
      console.error("Error handling RabbitMQ message:", error);
    }
  });
});
