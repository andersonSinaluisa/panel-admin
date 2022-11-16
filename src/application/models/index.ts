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
}

export const models :RootModel = { AUTH,USERS,
	CLIENTS,INSTALLATIONS,PERSONAL,JOBS,TASKS,PRODUCTS 
	,INVOICE, SEARCH};