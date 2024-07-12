import { writable } from "svelte/store";
import request from "./request";

const user: boolean | any = writable(false)
const token: boolean | any = writable(false)
const socketId: boolean | any = writable(false)
const req = new request()

user.authenticate = async function (){
  const data = parseUser (localStorage.getItem("user"));
  // const token = localStorage.getItem("token");
  let socketIdText = ''
  SocketId.subscribe(value => {
		socketIdText = value;
	});
  
  if (data !== undefined && !socketIdText) {
    const dataUser = await req.get('auth/me')
    user.set(dataUser);
  }
}

user.login = function (data, tokenUser) {
  localStorage.setItem("user", parseUser(data));
  user.set(data);
  localStorage.setItem("token", tokenUser);
  token.set(tokenUser);
}

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
export const SocketId = socketId