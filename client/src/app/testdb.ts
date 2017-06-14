import { AccountApi }  from './codegen/api/AccountApi';
import { EmergContApi }  from './codegen/api/EmergContApi';
import { ParentApi }  from './codegen/api/ParentApi';
import { PlayerApi }  from './codegen/api/PlayerApi';
import { TrainingApi }  from './codegen/api/TrainingApi';

import * as models from './codegen/model/models';


export class TestDB {
	constructor() {
	}

	accountCreationSuccessCallback(resp:any) {
		console.log("createAccount-success resp:", resp); 
	}

	initDB(accountApi: AccountApi, parentApi: ParentApi, playerApi: PlayerApi, emergContApi: EmergContApi, trainingApi: TrainingApi) {

		let acct: models.Account = {
			parentIdArray: [],
			emergContIdArray: [],
			playerIdArray: []
		};
		accountApi.createAccount(acct).subscribe( 
			resp => { 
					this.accountCreationSuccessCallback(resp);
					let accountId = resp.accountId;
					let parent1: models.Parent = {
						accountId: accountId,
						firstName: "Shekhar",
						lastName: "Kshirsagar",
						email: "shekhar.kshirsagar@gmail.com",
						phone: "408-425-1038"
					};
					parentApi.createParent(parent1).subscribe(
						resp => {
							console.log("createParent success", resp)
						},
						error => {
							console.log("createParent error:", error);
						}
					);
					let player1: models.Player = {
						accountId: accountId,
						firstName: "Sejal",
						lastName: "Kshirsagar",
						dob: "09/25/2008",
						gender: "Female",
						comments: "has asthma"
					};
					playerApi.createPlayer(player1).subscribe(
						resp => {
							console.log("createPlayer success", resp)
						},
						error => {
							console.log("createPlayer error:", error);
						}
					);
					let emergCont1: models.EmergCont = {
						accountId: accountId,
						firstName: "Swagat",
						lastName: "Kajale",
						phone: "408-218-8015",
					};
					emergContApi.createEmergCont(emergCont1).subscribe(
						resp => {
							console.log("createEmergCont success", resp)
						},
						error => {
							console.log("createEmergCont error:", error);
						}
					);
			},
			error => {
				console.log("createAccount error:", error)
			}
		);

		let training1: models.Training = {
			date: '2017/06/10',
			startTime: '16:00',
			duration: '01:00',
			sport: 'Basketball',
			location: 'Leland HS',
			level: '1',
			playerIdArray: [],
			playerIdWaitArray: []
		};
		trainingApi.createTraining(training1).subscribe(
			resp => {
				console.log("createTraining success", resp)
			},
			error => {
				console.log("createTraining error:", error);
			}
		);
		let training2: models.Training = {
			date: '2017/06/10',
			startTime: '17:00',
			duration: '01:00',
			sport: 'Basketball',
			location: 'Leland HS',
			level: '2',
			playerIdArray: [],
			playerIdWaitArray: []
		};
		trainingApi.createTraining(training2).subscribe(
			resp => {
				console.log("createTraining success", resp)
			},
			error => {
				console.log("createTraining error:", error);
			}
		);
		let training3: models.Training = {
			date: '2017/06/10',
			startTime: '18:00',
			duration: '01:00',
			sport: 'Basketball',
			location: 'Leland HS',
			level: '3',
			playerIdArray: [],
			playerIdWaitArray: []
		};
		trainingApi.createTraining(training3).subscribe(
			resp => {
				console.log("createTraining success", resp)
			},
			error => {
				console.log("createTraining error:", error);
			}
		);
	}
}