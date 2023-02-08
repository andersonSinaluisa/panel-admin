import { useEffect } from 'react';

import { createSocketConnection } from 'infrastructure/api/wss';
import { useAuth } from './use-auth';

function listen(callBack: (payload: any) => void, channel: string, event: string) {
  window.Echo.private(channel).listen(event, (payload: any) => {
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

export const useSocket = ({ type, callBack }: Options) => {
  const {token,dataLogin} = useAuth();
  useEffect(() => {
    createSocketConnection(token?token:"");
    switch (type) {
      case 'INCIDENT': {
        return listen(callBack, `installation.${dataLogin.data.id}.orders`, '.new_order');
      }
      
    }
  });
};