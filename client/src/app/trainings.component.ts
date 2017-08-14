import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { MdListModule, MdButtonModule, MdSnackBar, MdToolbarModule, MdCheckboxModule, MdInputModule, MdCardModule } from '@angular/material';

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

export class TrainingsComponent implements OnInit, OnChanges {
	accountId: string = "b305c9d0-5203-11e7-a9d2-01d5d0bcd095";
	accountPlayers: Array<string>;
	playerTrainingInfo: {} = {};
	trainingDict: {};
	displayButton: boolean = false;
	trainingPrice: number = 20;

	constructor(private accountApi: AccountApi, private parentApi: ParentApi, private playerApi: PlayerApi, private emergContApi: EmergContApi, private trainingApi: TrainingApi, public snackBar: MdSnackBar) {
	}

	ngOnInit() {
		if (this.trainingDict == undefined) {
			this.getTrainings();
		}
	}

	getTrainings() {
		this.trainingApi.getAllTrainings().subscribe(
			resp => {
				console.log("getTrainings success", resp);
				this.trainingDict = {};
				for (let trainingObject of resp) {
					this.trainingDict[trainingObject.trainingId] = trainingObject;
					this.trainingDict[trainingObject.trainingId]["playerInfoDict"] = {};
					for (let playerInfo of this.trainingDict[trainingObject.trainingId]["playerInfoList"]) {
						this.trainingDict[trainingObject.trainingId]["playerInfoDict"][playerInfo["playerId"]] = playerInfo;
					}
				}
				console.log("trainingDict", this.trainingDict);
				for (let key of Object.keys(this.trainingDict)) {
					console.log(key);
					this.trainingDict[key]["displayBool"] = false;
				}
			},
			error => {
				console.log("getTrainings error:", error);
			}
		);
	}

	ngOnChanges(changes: { [propName: string]: SimpleChange }) {
		console.log("ngOnChanges", changes);
		this.getTrainings();
	}

	getAccountInfo() {
		console.log("accountId", this.accountId);
		this.accountApi.getAccount(this.accountId).subscribe(
			resp => {
				console.log("getAccount success", resp);
				this.accountPlayers = resp.playerIdArray;
				for (let playerId of this.accountPlayers) {
					this.playerTrainingInfo[playerId] = { firstName: "Loading...", trainingSignUp: {}};
					for (let key of Object.keys(this.trainingDict)) {
						console.log(key);
						this.playerTrainingInfo[playerId]["trainingSignUp"][key] = false;
					}
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
		console.log("training: ", training);
		if (playerId in this.getKeys(training["playerInfoDict"])) {
			return training["playerInfoDict"][playerId]["status"];
		} else {
			return "unpaid";
		}
	}

	getPlayerFirstName(playerId: string) {
		let playerFirstName: string;
		this.playerApi.getPlayer(playerId).subscribe(
			resp => {
				console.log("getPlayer success", resp);
				this.playerTrainingInfo[playerId]["firstName"] = resp.firstName;
			},
			error => {
				console.log("getPlayer error:", error);
			}
		);
	}

	openSnackBar(playerInfo: {}, trainingArray: models.Training) {
		console.log("playerInfo:", playerInfo);
		if (playerInfo['trainingSignUp'][trainingArray.trainingId]) {
			let message: string = trainingArray.sport + " training for " + playerInfo["firstName"] + " added to cart";
	    this.snackBar.open(message, "Got it!", {
	      duration: 2000,
	    });
  	} else {
  		let message: string = trainingArray.sport + " training for " + playerInfo["firstName"] + " removed from cart";
	    this.snackBar.open(message, "Got it!", {
	      duration: 2000,
	    });
  	}
  }

  countNumSignupsPlayer(playerId: string): number {
  	let total = 0;
  	for (let trainingId of this.getKeys(this.playerTrainingInfo[playerId]['trainingSignUp'])) {
  		if (this.playerTrainingInfo[playerId]['trainingSignUp'][trainingId]) {
  			total += 1;
  		}
  	}
  	return total;
  }

  totalPriceCalc() {
  	let price = this.countNumSignupsTotal() * this.trainingPrice;
  	return price;
  }

	countNumSignupsTotal() {
		let total = 0;
		for (let playerId of this.getKeys(this.playerTrainingInfo)) {
			total += this.countNumSignupsPlayer(playerId);
		}
		return total;
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
  	this.trainingDict[key]["displayBool"] = true;
  }

  hideTraining(key: string) {
  	this.trainingDict[key]["displayBool"] = false;
  }
}

