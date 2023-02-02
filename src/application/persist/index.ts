import createRematchPersist from '@rematch/persist';
import { AllFilters } from '../filters';
import storage from 'redux-persist/lib/storage';

export const persistPlugin = createRematchPersist({
  key: 'root',
  whitelist: ['AUTH'],
  version: 1,
  storage: storage,
  transforms: AllFilters,
  debug: true,
  
});