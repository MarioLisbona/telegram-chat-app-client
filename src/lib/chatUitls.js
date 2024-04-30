// Function to rearrange the array based on the userName
export const sortArrayByUsername = (users, userName) => {
  // Find the index of the user with the specified userName
  const index = users.findIndex((user) => user.userName === userName);

  // If user with the specified userName is found
  if (index !== -1) {
    // Rearrange the array so that the user is at position 0
    [users[0], users[index]] = [users[index], users[0]];
  }

  // Return the rearranged array
  return users;
};
