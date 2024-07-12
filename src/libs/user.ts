import { writable } from "svelte/store";
import request from "./request";

const user: boolean | any = writable(false)
const token: boolean | any = writable(false)
const req = new request()

user.authenticate = async function (){
  const data = parseUser (localStorage.getItem("user"));
  if (data !== undefined) {
    const dataUser = await req.get('auth/me')
    let userData
    if (dataUser.user) {
      userData = dataUser.user
    } else {
      userData = dataUser
    }
    user.set(userData);
  }
}

user.login = function (data, tokenUser) {
  let userData;
  if (data.user) {
    userData = data.user;
  } else {
    userData = data;
  }
  localStorage.setItem("user", parseUser(userData));
  localStorage.setItem("token", tokenUser);
  user.set(userData);
  token.set(tokenUser);
};

user.logout = function () {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  user.set(false);
}
user.token = function () {
  return token
}
const parseUser = (user) => {
  if (!user) {
    return undefined
  }
  if (typeof user === 'string') {
    return JSON.parse(user)
  } else {
    return JSON.stringify(user)
  }
}
export const User = user
export const Token = token