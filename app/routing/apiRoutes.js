
var friendData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friendData array
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i<friendData.length; i++){
      var scoresDiff = 0;
      //compare friends
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendData[i].scores[j]) - parseInt(newFriendScores[j])));
      }
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bff = friendData[bestMatch];
    res.json(bff);

    //add new user
    friendData.push(req.body);
  });
};





  
