import { createBlacklistFilter,} from 'redux-persist-transform-filter';

const toDoFilter = createBlacklistFilter('AUTH', ['totalTasks']);

export const AllFilters = [toDoFilter];