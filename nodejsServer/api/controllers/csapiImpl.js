'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
const uuidV1 = require('uuid/v1');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  getAllAccounts: getAllAccounts,
  createAccount: createAccount,
  getAccount: getAccount,
  updateAccount: updateAccount,
  deleteAccount: deleteAccount,
  getAllParents: getAllParents,
  createParent: createParent,
  getParent: getParent,
  updateParent: updateParent,
  deleteParent: deleteParent,
  getAllEmergCont: getAllEmergConts,
  createEmergCont: createEmergCont,
  getEmergCont: getEmergCont,
  updateEmergCont: updateEmergCont,
  deleteEmergCont: deleteEmergCont,
  getAllPlayers : getAllPlayers ,
  createPlayer: createPlayer,
  getPlayer: getPlayer,
  updatePlayer: updatePlayer,
  deletePlayer: deletePlayer,
  getAllTrainings: getAllTrainings,
  createTraining: createTraining,
  getTraining: getTraining,
  updateTraining: updateTraining,
  deleteTraining: deleteTraining,
};

var db = {
  account: {},
  parent: {},
  emergCont: {},
  player: {},
  training: {},
};

function createRecord(tableName, key, idColName, record) {
  if (!(tableName in db)) {
    db[tableName] = {};
  }
  record[idColName] = key;
  if (!(key in db[tableName])) {
    db[tableName][key] = record;
    return [true, record];
  } else {
    return [false, record];
  }
}

function updateRecord(tableName, key, record) {
  if (key in db[tableName]) {
    db[tableName][key] = record;
    return [true, record];
  } else {
    return [false, record];
  }
}

function deleteRecord(tableName, key) {
  if (key in db[tableName]) {
    delete db[tableName][key];
    return [true];
  } else {
    return [false];
  }
}

function getRecord(tableName, key) {
  if (key in db[tableName]) {
    return [true, db[tableName][key]];
  } else {
    return [false];
  }
}

function getAllRecords(tableName) {
  var list = [];
  for (var key in db[tableName]) {
    list.push(db[tableName][key]);
  }
  return [true, list];
}

function addAttrToArrInRecord(recordTableName, recordId, attrArrName, attr) {
  db[recordTableName][recordId][attrArrName].push(attr);
}

function removeAttrFromArrayInRecord(recordTableName, recordId, attrArrName, attr) {
  var attrArray = db[recordTableName][recordId][attrArrName];
  var i = attrArray.indexOf(attr);
  if (i != -1) {
    attrArray.splice(i, 1);
  }
}

function removeAttrFromWholeDict(tableName, attrArrName, attr) {
  for (var key in db[tableName]) {
    removeAttrFromArrayInRecord(tableName, key, attrArrName, attr);
  }
}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

function getAllAccounts(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getAllRecords('account');
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = createRecord('account', uuidV1(), 'accountId', req.swagger.params.account.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getRecord('account', req.swagger.params.accountId.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updateAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = updateRecord('account', req.swagger.params.accountId.value, req.swagger.params.account.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deleteAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = deleteRecord('account', req.swagger.params.accountId.value);
  if (resultArray[0]) {
    res.json("success");
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}


function getAllParents(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getAllRecords('parent');
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createParent(req, res) {
  console.log("req: ", req.swagger.params);
  var parentObj = req.swagger.params.parent.value;
  var resultArray = createRecord('parent', uuidV1(), 'parentId', parentObj);
  if (resultArray[0]) {
    addAttrToArrInRecord('account', parentObj['accountId'], 'parentIdArray', parentObj['parentId']);
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getParent(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getRecord('parent', req.swagger.params.parentId.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updateParent(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = updateRecord('parent', req.swagger.params.parentId.value, req.swagger.params.parent.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deleteParent(req, res) {
  console.log("req: ", req.swagger.params);
  var parentAccountId = getRecord('parent', req.swagger.params.parentId.value)[1]['accountId'];
  var resultArray = deleteRecord('parent', req.swagger.params.parentId.value);
  if (resultArray[0]) {
    removeAttrFromArrayInRecord('account', parentAccountId, 'parentIdArray', req.swagger.params.parentId.value);
    res.json("success");
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}

function getAllEmergConts(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getAllRecords('emergCont');
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var emergContObj = req.swagger.params.emergCont.value;
  var resultArray = createRecord('emergCont', uuidV1(), 'emergContId', emergContObj);
  if (resultArray[0]) {
    addAttrToArrInRecord('account', emergContObj['accountId'], 'emergContIdArray', emergContObj['emergContId']);
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getRecord('emergCont', req.swagger.params.emergContId.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updateEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = updateRecord('emergCont', req.swagger.params.emergContId.value, req.swagger.params.emergCont.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deleteEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var emergContAccountId = getRecord('emergCont', req.swagger.params.emergContId.value)[1]['accountId'];
  var resultArray = deleteRecord('emergCont', req.swagger.params.emergContId.value);
  if (resultArray[0]) {
    removeAttrFromArrayInRecord('account', emergContAccountId, 'emergContIdArray', req.swagger.params.emergContId.value);
    res.json("success");
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}

function getAllPlayers(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getAllRecords('player');
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createPlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var playerObj = req.swagger.params.player.value;
  var resultArray = createRecord('player', uuidV1(), 'playerId', playerObj);
  if (resultArray[0]) {
    addAttrToArrInRecord('account', playerObj['accountId'], 'playerIdArray', playerObj['playerId']);
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getPlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getRecord('player', req.swagger.params.playerId.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updatePlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = updateRecord('player', req.swagger.params.playerId.value, req.swagger.params.player.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deletePlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var playerAccountId = getRecord('player', req.swagger.params.playerId.value)[1]['accountId'];
  var resultArray = deleteRecord('player', req.swagger.params.playerId.value);
  if (resultArray[0]) {
    removeAttrFromArrayInRecord('account', playerAccountId, 'playerIdArray', req.swagger.params.playerId.value);
    removeAttrFromWholeDict('training', 'playerIdArray', req.swagger.params.playerId.value);
    removeAttrFromWholeDict('training', 'playerIdWaitArray', req.swagger.params.playerId.value);
    res.json("success");
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}

function getAllTrainings(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getAllRecords('training');
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = createRecord('training', uuidV1(), 'trainingId', req.swagger.params.training.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = getRecord('training', req.swagger.params.trainingId.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updateTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = updateRecord('training', req.swagger.params.trainingId.value, req.swagger.params.training.value);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deleteTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = deleteRecord('training', req.swagger.params.trainingId.value);
  if (resultArray[0]) {
    res.json("success");
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}

/*

function initTestDB() {
  var accountId = uuid();
  var parentId = uuid();
  createRecord('account', accountId, 'accountId', {});
  createRecord('parent', parentId, 'parentId', {
    'parentId': parentId,
    'accountId': accountId,
    'firstName': 'Shekhar',
    'lastName': 'Kshirsagar',
    'email' : 'shekhar.kshirsagar@gmail.com',
    'phone' : '408-531-7316',
    });


  if (!(tableName in db)) {
    db[tableName] = {};
  }
  record[idColName] = key;
  if (!(key in db[tableName])) {
    db[tableName][key] = record;
    return [true, record];
  } else {
    return [false, record];
  }
}
*/

/* function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
} */
