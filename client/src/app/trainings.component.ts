import { Component, Input } from '@angular/core';
import { MdListModule, MdButtonModule, MdSnackBar, MdToolbarModule } from '@angular/material';
import { APIServiceFactory, APIService } from './api.service';

//declare var parseDate: any;
//import './js/date.js';

@Component({
	selector: 'trainings',
	templateUrl: './trainings.component.html',
	styleUrls: ['trainings.component.css'],
})

export class TrainingsComponent {
	trainingList: {};
	displayButton: boolean;
	trainingBoolean: {}; //key to boolean mapping

	constructor(private apiServiceFactory: APIServiceFactory, public snackBar: MdSnackBar) {
		this.trainingList = apiServiceFactory.getAPIService().getTrainings();
		this.trainingBoolean = {};
		for (let key of Object.keys(this.trainingList)) {
			console.log(key);
			this.trainingBoolean[key] = false;
		}
		this.displayButton = false;
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

	openSnackBar() {
    this.snackBar.open("Add player", "training", {
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
  	this.trainingBoolean[key] = true;
  }

  hideTraining(key: string) {
  	this.trainingBoolean[key] = false;
  }
}

