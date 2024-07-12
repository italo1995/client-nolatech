// import { writable } from 'svelte/store';
import { socket } from '@/libs/store'
// import * as io from "https://cdn.socket.io/4.0.1/socket.io.min.js"
import io from 'socket.io-client'
import { SocketId, User } from '@/libs/user'
// const messageStore = writable('');

// const socket = new WebSocket('ws://localhost:3333');
// const socket = io("http://localhost:3333")
const url = "https://apiqa.payatraslados.com/socket"
// const url = "https://apiqa.payatraslados.com/socket"
export const getSocket = async () => {
  const client = io(url)
  client.on("connect", () => {
    console.log('connectado', client.id)
    SocketId.set(client.id)
    User.authenticate()
  });
  // console.log(client);
  // const clientsOn = client.on('listUser', (data) => {
  //     if (data.status) {
  //       return data.data
  //     }
  //   })
  // client.emit('listUser', (data) => {
  //       if (data.status) {
  //         console.log(data)
  //       }
  //     })
  //   socket.set(clientsOn)
  socket.set(client)
  // socket.subscribe((io: any) => {
  //   io.on("listUser", function(data) {
  //     console.log(data);
  //   })
  // })
}
// console.log(socket)
// socket.on("connect", () => {
//   console.log(socket.id)
//   SocketId.set(socket.id)
//   User.authenticate()
// });
// socket.connect
// socket.on('connect', (dataSocket) => {
//     console.log('conect')
//     console.log(dataSocket.id)
// })
// export const onNew = socket.on('news', (data) => {
//   console.log(data)
//   // socket.emit('my other event', { my: 'data' })
// })
// export const clientsOn = socket.on('listUser', (data) => {
//   if (data.status) {
//     return data.data
//   }
// })
// export const clientsEmit = socket.emit('listUser', (data) => {
//   if (data.status) {
//     return data.data
//   }
// })
// Connection opened
// socket.addEventListener('news', function (event) {
//     console.log("It's news");
// });

// Listen for messages
// socket.addEventListener('message', function (event) {
//     messageStore.set(event.data);
// });

// const sendMessage = (message) => {
// 	if (socket.readyState <= 1) {
// 		socket.send(message);
// 	}
// }


// export default {
// 	subscribe: messageStore.subscribe,
// 	sendMessage
// }
