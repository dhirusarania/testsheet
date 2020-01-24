var API_VERSION = '/v1/'

// if (process.env.NODE_ENV == "development") {

//   var url = "https://api.testsheet.in" + API_VERSION;

// } else {

//   var url = API_VERSION;


// }

var url = "https://api.testsheet.in" + API_VERSION;


export const state = () => ({

  login: url + "account/login",

  dataentrylogin: url + "account/dataEntry",

  getAllSubjects: url + "subjects", //post to create

  apiSubject: url + "subjects/", 

  allQuestions: url + "/textbook/questions/", // chapter_id ?limit=10&offset=0,

});
