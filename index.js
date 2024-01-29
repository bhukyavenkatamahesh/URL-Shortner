const express = require("express");
const app = express();
const PORT = 3000;
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connection");
const URL = require("../URL-Shortner/models/url");

connectToMongoDB()
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log("Error while connecting mongodb", err));

app.use(express.json());

app.use("/post/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  const redirectUrl =
    url.redirectUrl.startsWith("http://") ||
    url.redirectUrl.startsWith("https://")
      ? url.redirectUrl
      : `http://${url.redirectUrl}`;
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is Running at ${PORT}`));
