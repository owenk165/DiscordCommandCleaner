function scheduledAlteration(){
  var date = new Date();
  var SgHourString = date.toLocaleString('en-US', { timeZone: 'Singapore', hour: 'numeric', hour12:false });
  var SgHourNumber = parseInt(SgHourString);

  //Defining the manipulatable variables
  var size = 'Free'; //Free heroku dyno
  // Authorization token from https://dashboard.heroku.com/account/applications#authorizations 's authorizations
  var bearer = 'Bearer ' + 'Your authorization token';
  var appNameorID = 'Your app name or ID';
  var httpReq = 'https://api.heroku.com/apps/'+appNameorID+'/formation/worker';
  var offTimeStart = 4; //Inclusive
  var offTimeEnd = 12; //Exclusive
  var quantity = (SgHourNumber>=offTimeStart && SgHourNumber <offTimeEnd) ? 0:1;


  // Pre fetch the current configuration of the app's worker information
  var prefetchParam  = {
    'method' : 'get',
    'contentType': 'application/json',
    'headers' :  {'Accept': 'application/vnd.heroku+json; version=3','Authorization': bearer},
    muteHttpExceptions: true
  };

  var preFetchresponse = UrlFetchApp.fetch(httpReq, prefetchParam);
  var parsedPreFetchResponse = JSON.parse(preFetchresponse.getContentText());
  var currWorkerQuant = parsedPreFetchResponse["quantity"]; // typeof number


  // Setting up http request for alteration
  var data = {
    "quantity": quantity,
    "size": size
  };

  var ModParam = {
    'method' : 'patch',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data),
    'headers' :  {'Accept': 'application/vnd.heroku+json; version=3','Authorization': bearer},
    muteHttpExceptions: true
  };

  // Set worker to 0 on off time
  // Log execution success/failure
  if(SgHourNumber >= offTimeStart && SgHourNumber < offTimeEnd){ 
    if(currWorkerQuant!=0){
      // Not implementing try/catch block because I want the apps script to log the failure in execution log
      var ModResponse = UrlFetchApp.fetch(httpReq, ModParam);
      Logger.log("Set worker quantity to 0 on current time " + SgHourNumber);
    } else {
      Logger.log("Worker already set to 0 on Curr time " + SgHourNumber + " , no ammendment made");
    }
  } 
  // Else, set worker to 1 on working time
  else {
    if(currWorkerQuant!=1){
      var ModResponse = UrlFetchApp.fetch(httpReq, ModParam);
      Logger.log("Set worker quantity to 1 on current time " + SgHourNumber);
    } else {
      Logger.log("Worker already set to 1 on Curr time " + SgHourNumber + " , no ammendment made");
    }
  }


}


function manualAlteration(){
  var quantity = 0;
  var size = 'Free'; //Free heroku dyno
  // Authorization token from https://dashboard.heroku.com/account/applications#authorizations 's authorizations
  var bearer = 'Bearer ' + 'Your authorization token';
  var appNameorID = 'Your app name or ID';
  var httpReq = 'https://api.heroku.com/apps/'+appNameorID+'/formation/worker';

  // Scale the worker, change the information below according to body/payload request requirement
  var data = {
    "quantity": quantity,
    "size": size
  };

  var param = {
    // 'get'/'post' for data request, 'patch' for update operation(eg worker scaling)
    'method' : 'get',
    'contentType': 'application/json',
    //'payload' : JSON.stringify(data), // add body/payload accordingly
    'headers' :  {'Accept': 'application/vnd.heroku+json; version=3','Authorization': bearer},
    // For debugging
    muteHttpExceptions: true
  };
    
    var response = UrlFetchApp.fetch(httpReq, param);
    Logger.log(response);
    var parsedResponse = JSON.parse(response.getContentText());
    Logger.log("The quantity " + parsedResponse["quantity"] + "  The app name " + parsedResponse["app"]["name"]);
}
