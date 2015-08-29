var Flights = require('./flightsModel');
var Q = require('q');

module.exports = {
  // Build a getFlights function here!!!
  getFlights: function(req, res) {
    console.log('Got to getFlights in server-side flightsController!');
    console.log('Req that made it to server flightsController ', req);
    console.log('Req.body that made it to server flightsController ', req.body);
  }

  
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