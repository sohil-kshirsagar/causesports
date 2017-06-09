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
  delete db[tableName][key];
  return [true];
  /* if (key in db[tableName]) {
    delete db[tableName][key];
    return [true];
  } else {
    return [false];
  } */
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

function addAttrToArray(attrArrName, attribute)

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
  var origAccountArray = getRecord('account', parentObj['accountId']);
  if (resultArray[0] && origAccountArray[0]) {
    origAccountArray[1]['parentIdArray'].push(resultArray[1]['parentId']);
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
  var resultArray = deleteRecord('parent', req.swagger.params.parentId.value, req.swagger);
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getAllEmergConts(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updateEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deleteEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getAllPlayers(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createPlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getPlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updatePlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deletePlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getAllTrainings(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function createTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function getTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function updateTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}
function deleteTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var resultArray = [];
  if (resultArray[0]) {
    res.json(resultArray[1]);
  } else {
    res.status(400).send({"errorCode": "400", "errorDescription": "400 error"});
  }
}


/* function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
} */
