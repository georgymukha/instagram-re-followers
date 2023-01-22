async function checkNonReciprocals(username) {
  // Fetch the user's followers
  const followersResponse = await fetch(
    `https://www.instagram.com/${username}/followers/`
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
