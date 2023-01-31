import { Models } from '@rematch/core'
import {AUTH} from './auth'
import {USERS} from './users'
import {CLIENTS} from './clients'
import {INSTALLATIONS} from './installations'
import {PERSONAL} from './personal'
import {JOBS} from './jobs'
import {TASKS} from './tasks'
import {PRODUCTS} from './products'
import {INVOICE} from './invoice'
import {SEARCH} from './search'
import {NOTIFICATIONS} from './notifications'
import {CORE} from './core'

export interface RootModel extends Models<RootModel> {
	AUTH: typeof AUTH;
	USERS: typeof USERS;
	CLIENTS: typeof CLIENTS;
	INSTALLATIONS: typeof INSTALLATIONS;
	PERSONAL: typeof PERSONAL;
	JOBS: typeof JOBS;
	TASKS: typeof TASKS;
	PRODUCTS: typeof PRODUCTS;
	INVOICE: typeof INVOICE;
	SEARCH: typeof SEARCH;
	NOTIFICATIONS: typeof NOTIFICATIONS;
	CORE: typeof CORE;
}

export const models :RootModel = { AUTH,USERS,
	CLIENTS,INSTALLATIONS,PERSONAL,JOBS,TASKS,PRODUCTS 
	,INVOICE, SEARCH, NOTIFICATIONS, CORE};