const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

//Moderation eventhandler
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log("Received Event: ", type);

  try {
    if (type === "CommentCreated") {
      const status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }

    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
