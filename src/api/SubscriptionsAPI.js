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

const deleteSubscription = async (id) => {
  const response = await fetch(`${url}/${id}/`, {
    method: "DELETE"
  });
  return await response
}

const getSubscriptionById = async (subscriptionID) => {
  const response = await fetch(`${url}/${subscriptionID}/`);
  const data = await response.json();
  return await data;
}

export default {
  addSubscription: addSubscription,
  deleteSubscription: deleteSubscription,
  getSubscriptionById: getSubscriptionById,
}
