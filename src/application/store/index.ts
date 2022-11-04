import { init } from '@rematch/core';
import  {models}  from '../models';
import { loadingPlugin } from '../plugin';
import { persistPlugin } from '../persist';

export default init({
  models,
  plugins: [loadingPlugin, persistPlugin as any],
  redux: {
    middlewares: [],
  },
});
