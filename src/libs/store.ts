import { writable } from "svelte/store";
import io from 'socket.io-client'
import { SocketId, User } from '@/libs/user'

export const toasts = writable([]);

export const addToast = (toast) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    id,
    type: "info",
    dismissible: true,
    timeout: 3000,
  };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);
  // If toast is dismissible, dismiss it after "timeout" amount of time.
  !toast?.timeout && (toast.timeout = defaults.timeout)
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};

export const socket: any = writable();

// const client = io("http://localhost:3333");
// const listClient: any  = writable();

// client.on("connect", () => {
//   console.log('connectado', client.id)
//   SocketId.set(client.id)
//   User.authenticate()
// });
// client.on("listUsers", function(data) {
//   console.log(data);
//   listClient.set(data.data)
//   // console.log('lists', listClient)
// });

// const listUsers = (message) => {
//   console.log(message);
//   client.send(message);
// }


// export const socket = {
// 	subscribe: listClient.subscribe,
// 	listUsers
// }
