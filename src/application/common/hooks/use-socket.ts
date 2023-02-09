import { useEffect } from 'react';

import { createSocketConnection } from 'infrastructure/api/wss';
import { useAuth } from './use-auth';

function listen(callBack: (payload: any) => void, channel: string, event: string) {
  window.Echo.channel(channel).listen(event, (payload: any) => {
    callBack(payload);
  });


  return function cleanUp() {
    window.Echo.leaveChannel(`private-${channel}`);
  };
}

type Options = {
  type: 'INCIDENT'
  callBack: (payload: any) => void;
};
/*window.Echo.channel("installation.state").listen("InstallationStateFromMqttProcessed", (e) => {
    console.log(e);
  });*/

export const useSocket = ({ type, callBack }: Options) => {
  const {token,dataLogin} = useAuth();
  useEffect(() => {
    createSocketConnection(token?token:"");

    
    switch (type) {
      case 'INCIDENT': {
        return listen(callBack, `installation.state`, 'InstallationStateFromMqttProcessed');
      }
      
    }
  },[token,dataLogin]);
};