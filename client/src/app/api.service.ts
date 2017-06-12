import { Injectable } from '@angular/core';

export interface APIService {
	getTrainings(): {};
}

@Injectable()
export class APIServiceFactory {
	testAPIService: APIService;
	productionAPIService: APIService;

	constructor() {
		this.testAPIService = new TestAPIService;
		this.productionAPIService = new TestAPIService;
	}
	
	getAPIService(testData:boolean=true): APIService {
		if (testData) {
			return this.testAPIService;
		} else {
			return this.productionAPIService;
		}
	}
}



export class TestAPIService implements APIService {
	trainings:{} = {
			'trainingIdHashA' : {
				date: '2017/06/10',
				time: '16:00',
				duration: '01:00',
				sport: 'Basketball',
				location: 'Leland HS',
				level: '1'
			},
			'hash_AB' : {
				date: '2017/06/10',
				time: '17:00',
				duration: '01:00',
				sport: 'Basketball',
				location: 'Leland HS',
				level: '2'
			},
			'hash_AC' : {
				date: '2017/06/10',
				time: '18:00',
				duration: '01:00',
				sport: 'Basketball',
				location: 'Leland HS',
				level: '3',
			},
	};

	getTrainings(): {} {
		return this.trainings;
	}

	/* getAccount(accountId: string): {} {

	}

	getParent(parentId: string): {} {

	}

	getEmergencyContact(emergencyContactId: string): {} {

	}

	getPlayer(playerId: string): {} {
		
	} */


}
