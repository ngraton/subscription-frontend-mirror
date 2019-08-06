const url = 'https://cors-anywhere.herokuapp.com/https://subscription-backend.herokuapp.com/api/subscriptions'

const addSubscription = async (subscriptionObject) => {
  const response = await fetch(`${url}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(subscriptionObject)
  });
  const data = await response.json();
  return await data;
}

export default {
  addSubscription: addSubscription,
}