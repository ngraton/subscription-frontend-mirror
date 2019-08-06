import { async } from "q";

const url = 'https://subscription-backend.herokuapp.com/api/users'

const getUserByUsername = async (inputUsername) => {
  const response = await fetch(`${url}?${inputUsername}`);
  const data = await response.json();
  return await data
}