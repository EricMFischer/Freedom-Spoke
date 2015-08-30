var Flights = require('./flightsModel');
var Q = require('q');
var request = require('request'); // creates http req client to consume the QPX API

module.exports = {
  getFlights: function(req, res) {
    console.log('Req.body that made it to server flightsController ', req.body);
    var from = req.body.from;
    var to = req.body.to;
    var when = req.body.when; // all strings
    console.log('from, to, when: ', from, to, when);

    // JSON that will be passed to the QPX API
    var requestData = {
      "request": {
        "slice": [
          {
            "origin": from,
            "destination": to,
            "date": when
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 2,
        "refundable": false
      }
    } // ends var requestData

    // QPX REST API URL
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCVf09V6vrXCODC-t4-jwRZpuW2YFg181M";

    // fire request
    request({
      url: url,
      method: "POST",
      json: true, // json: true should both JSON.stringify() body and JSON.parse() the response.
      headers: {
        "content-type": "application/json",
      },
      body: requestData // don't need to JSON.stringify here
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('Body of the successful request: ', body);
        console.log('Body.trips.data: ', body.trips.data);
        console.log('Body.trips.tripOption: ', body.trips.tripOption);
      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
      }
    });

  } // ends getFlights function


  // checkAnswer: function(req, res){
  //   var id = req.body.id;
  //   var userAns = req.body.userAns;
  //   var findQuestion = Q.nbind(Trivia.findOne, Trivia);
  //   findQuestion({id: id})
  //   .then(function(DBquestion){
  //     var question = {};
  //     if(userAns !== undefined && DBquestion.answer.toLowerCase() === userAns.toLowerCase()){
  //       question.correct = true;
  //       res.send(question);
  //     }else{
  //       question.correct = false;
  //       res.send(question);
  //     }
  //   });
  // },

  // Build an addFlights function here!!! (name change)
  
  // addQuestion: function(result){
  //   var questions = [];
  //   var cleanAnswer = function(answer) {
  //     return answer.replace(/<\/?i>/g, '');
  //   };
  //   for(var i = 0; i < result.body.length; i++){
  //     var answer = cleanAnswer(result.body[i].answer);
  //     questions.push({
  //       id: result.body[i].id,
  //       question: result.body[i].question,
  //       answer: answer
  //     });
  //   }
  //   Trivia.collection.insert(questions, function(){
  //     //null
  //   });
  // }
}