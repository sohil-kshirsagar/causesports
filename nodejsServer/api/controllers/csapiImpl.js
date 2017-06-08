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

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

function getAllAccounts(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  res.json(response);
}
function createAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function updateAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function deleteAccount(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getAllParents(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  res.json(response);
}
function createParent(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getParent(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function updateParent(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function deleteParent(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getAllEmergConts(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  res.json(response);
}
function createEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function updateEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function deleteEmergCont(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getAllPlayers (req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  res.json(response);
}
function createPlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getPlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function updatePlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function deletePlayer(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getAllTrainings(req, res) {
  console.log("req: ", req.swagger.params);
  var response = [];
  res.json(response);
}
function createTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function getTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function updateTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}
function deleteTraining(req, res) {
  console.log("req: ", req.swagger.params);
  var response = {};
  res.json(response);
}


/* function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
} */
