import { Component, Input, OnInit } from '@angular/core';
import { MdListModule, MdButtonModule, MdSnackBar, MdToolbarModule, MdCheckboxModule, MdInputModule } from '@angular/material';

import { TestDB } from './testdb'

import { AccountApi }  from './codegen/api/AccountApi';
import { EmergContApi }  from './codegen/api/EmergContApi';
import { ParentApi }  from './codegen/api/ParentApi';
import { PlayerApi }  from './codegen/api/PlayerApi';
import { TrainingApi }  from './codegen/api/TrainingApi';

import * as models from './codegen/model/models';


@Component({
	selector: 'trainings',
	templateUrl: './trainings.component.html',
	styleUrls: ['trainings.component.css'],
})

export class TrainingsComponent {
	accountId: string;
	accountPlayers: Array<string>;
	playerFirstNames: {} = {};
	trainingDict: {} = {};
	displayButton: boolean;

	constructor(private accountApi: AccountApi, private parentApi: ParentApi, private playerApi: PlayerApi, private emergContApi: EmergContApi, private trainingApi: TrainingApi, public snackBar: MdSnackBar) {

		trainingApi.getAllTrainings().subscribe(
			resp => {
				console.log("getTrainings success", resp);
				for (let trainingObject of resp) {
					this.trainingDict[trainingObject.trainingId] = trainingObject;
				}
				console.log("trainingDict", this.trainingDict);
				for (let key of Object.keys(this.trainingDict)) {
					console.log(key);
					this.trainingDict[key]["bool"] = false;
				}
			},
			error => {
				console.log("getTrainings error:", error);
			}
		);
		this.displayButton = false;
	}

	getAccountInfo() {
		console.log("accountId", this.accountId);
		this.accountApi.getAccount(this.accountId).subscribe(
			resp => {
				console.log("getAccount success", resp);
				this.accountPlayers = resp.playerIdArray;
				for (let playerId of this.accountPlayers) {
					this.playerFirstNames[playerId] = "Loading...";
					this.getPlayerFirstName(playerId);
				}
			},
			error => {
				console.log("getAccount error:", error);
			}
		);
	}

	populateStarterData() {
		let testDb = new TestDB();
		testDb.initDB(this.accountApi, this.parentApi, this.playerApi, this.emergContApi, this.trainingApi);
	}

	reformatStart(start: string, duration: string): string {
		let dateObject = new Date(Date.parse(start));
		let timeString: string;
		let startHr = dateObject.getHours();
		let startMin = dateObject.getMinutes();
		let startPmBool: boolean;
		let durationSplit = duration.split(":");
		let endHr = parseInt(durationSplit[0]) + startHr;
		let endMin = parseInt(durationSplit[1]) + startMin;
		let endPmBool: boolean;
		let startHrString: string;
		let startMinString: string;
		let endHrString: string;
		let endMinString: string;

		if (endMin > 60) {
			endHr += 1;
			endMin -= 60;
		}

		if (startHr >= 12) {
			startPmBool = true;
		} else {
			startPmBool = false;
		}

		if (endHr >= 12) {
			endPmBool = true;
		} else {
			endPmBool = false;
		}
		
		startHr = startHr % 12;
		endHr = endHr % 12;

		startHrString = startHr.toString();
		startMinString = startMin.toString();
		endHrString = endHr.toString();
		endMinString = endMin.toString();

		let startTime: string;
		let endTime: string;

		if (startPmBool) {
			if (startMin < 10) {
				startTime = startHrString + ":" + "0" + startMinString + " PM";
			} else {
				startTime = startHrString + ":" + startMinString + " PM";
			}
		} else {
			if (startMin < 10) {
				startTime = startHrString + ":" + "0" + startMinString + " AM";
			} else {
				startTime = startHrString + ":" + startMinString + " AM";
			}
		}

		if (endPmBool) {
			if (endMin < 10) {
				endTime = endHrString + ":" + "0" + endMinString + " PM";
			} else {
				endTime = endHrString + ":" + endMinString + " PM";
			}
		} else {
			if (endMin < 10) {
				endTime = endHrString + ":" + "0" + endMinString + " AM";
			} else {
				endTime = endHrString + ":" + endMinString + " AM";
			}
		}

		return dateObject.toDateString() + " " + startTime + " to " + endTime;
	}

	checkTrainingSignupStatus(playerId: string, training: models.Training): string {
		if (training.playerIdArray.indexOf(playerId) != -1) {
			return 'signedup';
		} else if (training.playerIdWaitArray.indexOf(playerId) != -1) {
			return 'waitlist';
		} else {
			return '';
		}
	}

	getPlayerFirstName(playerId: string) {
		let playerFirstName: string;
		this.playerApi.getPlayer(playerId).subscribe(
			resp => {
				console.log("getPlayer success", resp);
				this.playerFirstNames[playerId] = resp.firstName;
			},
			error => {
				console.log("getPlayer error:", error);
			}
		);
	}

	openSnackBar() {
    this.snackBar.open("Player added to cart", "training", {
    	//this should open dialog that allows user to register for training
      duration: 2000,
    });
  }

	getKeys(dict: {}): Array<string> {
		return Object.keys(dict);
	}

	displayTrainings() {
		this.displayButton = true;
	}

	hideTrainings() {
		this.displayButton = false;
	}

  displayTraining(key: string) {
  	this.trainingDict[key]["bool"] = true;
  }

  hideTraining(key: string) {
  	this.trainingDict[key]["bool"] = false;
  }
}

