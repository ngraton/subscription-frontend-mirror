const url = 'https://cors-anywhere.herokuapp.com/https://subscription-backend.herokuapp.com/rest-auth'

const login = async (username, password) => {
  const response = await fetch(`${url}/login/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({username: username, password: password})
  });
  return await response;
}

const registration = async (username, password) => {
  const response = await fetch(`${url}/registration/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({username: username, password1: password, password2: password})
  });
  return await response;
}

const logout = async () => {
  const response = await fetch(`${url}/logout/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
  });
  return await response;
}

export default {
  login: login,
  registration: registration,
  logout: logout
}
