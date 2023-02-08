import { URLAPI } from "application/common";
import Echo from "laravel-echo";
import io from "socket.io-client";


declare global {
  interface Window {
    io: {};
    Echo: Echo;
  }
}

window.io = io;

export function createSocketConnection(token: string) {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "socket.io",
      host: URLAPI,
      transports: ["websocket", "polling", "flashsocket"],
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  }
}