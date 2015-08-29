var Flights = require('./flightsModel');
var Q = require('q');

module.exports = {
  // Build a getFlights function here!!!
  getFlights: function(req, res) {
    console.log('YES!');
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

  // getClue: function(answer) {
  //   var to_ = /([a-zA-Z0-9])/g;
  //   var answerArr = answer.split('');
  //   var retString = [];
  //   answerArr.forEach(function(char) {
  //     if (char.match(to_)) {
  //       retString.push('_');
  //     } else {
  //       retString.push(char);
  //     }
  //   });
  //   retString = retString.join('');
  //   return retString;
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