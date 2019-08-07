const url = 'https://cors-anywhere.herokuapp.com/https://subscription-backend.herokuapp.com/api/users'


const getUserByUsername = async (inputUsername) => {
  const response = await fetch(`${url}?username=${inputUsername}`);
  const data = await response.json();
  return await data
}

const addUserByUsername = async (inputUsername) => {
  const response = await fetch(`${url}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({username: inputUsername})
  });
  const data = await response.json();
  return await data;
}

export default {
  getUserByUsername: getUserByUsername,
  addUserByUsername: addUserByUsername
}
