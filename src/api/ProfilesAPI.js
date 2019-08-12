const url = 'https://cors-anywhere.herokuapp.com/https://subscription-backend.herokuapp.com/api/profile'

const addPhoneNumber = async (userId, phoneNumber) => {
  const response = await fetch(`${url}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({phone_number: phoneNumber, user: userId})
  });
  const data = await response.json();
  return await data;
}

export default {
  addPhoneNumber: addPhoneNumber,
}
