const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/instagram/:username/followers", (req, res) => {
  const { username } = req.params;

  fetch(`https://www.instagram.com/${username}/followers/`)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

async function checkNonReciprocals(username) {
  // Fetch the user's followers
  const followersResponse = await fetch(
    `http://localhost:3000/instagram/${username}/followers`
  );
  const followersData = await followersResponse.json();
  const followers = followersData.users.map((user) => user.username);

  // Fetch the user's followings
  const followingsResponse = await fetch(
    `https://www.instagram.com/${username}/following/`
  );
  const followingsData = await followingsResponse.json();
  const followings = followingsData.users.map((user) => user.username);

  // Find non-reciprocals
  const nonReciprocals = {
    nonFollowers: followings.filter(
      (username) => !followers.includes(username)
    ),
    nonFollowing: followers.filter(
      (username) => !followings.includes(username)
    ),
  };

  return nonReciprocals;
}
