import { Models } from '@rematch/core'
import {AUTH} from './auth'
import {USERS} from './users'
import {CLIENTS} from './clients'
import {INSTALLATIONS} from './installations'
import {PERSONAL} from './personal'

export interface RootModel extends Models<RootModel> {
	AUTH: typeof AUTH;
	USERS: typeof USERS;
	CLIENTS: typeof CLIENTS;
	INSTALLATIONS: typeof INSTALLATIONS;
	PERSONAL: typeof PERSONAL;
}

export const models :RootModel = { AUTH,USERS,
	CLIENTS,INSTALLATIONS,PERSONAL };