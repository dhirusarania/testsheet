var API_VERSION = '/v1/'

var url = "https://api.testsheet.co" + API_VERSION;


export const state = () => ({

  login: url + "account/login",

  dataentrylogin: url + "account/dataEntry",

  getAllSubjects: url + "subjects", //post to create

  apiSubject: url + "subjects/", 

});
