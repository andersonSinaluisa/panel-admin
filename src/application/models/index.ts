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
}

export const models :RootModel = { AUTH,USERS,
	CLIENTS,INSTALLATIONS,PERSONAL,JOBS,TASKS,PRODUCTS ,INVOICE};