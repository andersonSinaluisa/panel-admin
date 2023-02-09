import { URLAPI } from "application/common";
import Echo from "laravel-echo";
import * as Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: {};
    Echo: Echo;
  }
}

window.Pusher = Pusher;

export function createSocketConnection(token: string) {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "DsKg8oSmn2",
      wsHost: "probulon-cloud.com.es",
      authEndpoint: "https://probulon-cloud.com.es/broadcasting/auth",
       auth: {
         headers: {
           Authorization: "Bearer " + token,
           Accept: "application/json",
         },
       },
      wsPort: 6001,
      cluster: "mt1",
      forceTLS: true,
      encrypted: true,
    });
  }
}