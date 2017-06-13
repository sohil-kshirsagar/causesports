import { AccountApi }  from './codegen/api/AccountApi';
import { EmergContApi }  from './codegen/api/EmergContApi';
import { ParentApi }  from './codegen/api/ParentApi';
import { PlayerApi }  from './codegen/api/PlayerApi';
import { TrainingApi }  from './codegen/api/TrainingApi';

import { Account } from './codegen/model/Account';

export class TestDB {
	constructor(private accountApi: AccountApi) {
	}

	initDB() {
		let acct: Account = {
		}
		this.accountApi.createAccount(acct);
	}
}