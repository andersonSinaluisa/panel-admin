import { createBlacklistFilter,} from 'redux-persist-transform-filter';

const toDoFilter = createBlacklistFilter('AUTH', ['Session/error']);

export const AllFilters = [toDoFilter];