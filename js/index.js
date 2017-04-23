var initialAlfabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
                      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                      "0","1","2","3","4","5","6","7","8","9","_","="];
var alfabet;
var challenge;
var stringSize;
var response;
var responseCode;
function solve(){
  var coder = $('#email').val();
  getSyncResponse(coder, '', true);
  setFirstChallenge();
  var challengeAccepted = true;
  var counter = 0;
  do{
    console.log(counter+1);
    getSyncResponse(coder, challenge, true);
    challengeAccepted = verifyAndGenerateNewChallenge();
    counter++;
  } while(!challengeAccepted && counter < initialAlfabet.length+10);
  confirm('Test for ' + coder + ' successful!');
}

function getSyncResponse(coder, challenge, test){
  var data = {coder:coder, challenge:challenge.toString().replace(/,/g,""), test:test};
  $.ajax({
    url: 'https://ac-challenge.herokuapp.com/api/challenge',
    async: false,
    data: data,
    success: function(code, msg, obj){console.log(msg);responseCode = code.split(""); response = obj;},
    error: function(error){if(error.status == 409){stringSize = parseInt(error.responseText);}}
  }); 
}

function setFirstChallenge(){
  alfabet = initialAlfabet.slice(0);
  challenge = [];
  for(var i=0; i<stringSize; i++){
    var pos = i;
    if(i>=alfabet.length){
      pos = i%alfabet.length;
    }
    challenge[i] = alfabet[pos];
  }
  console.log(alfabet);
  console.log(stringSize);
  console.log("first challenge: " + challenge);
}

function verifyAndGenerateNewChallenge(){
  console.log("responseStatus: " + response.status);
  console.log("responseCode: " + responseCode);
  console.log("challenge used: " + challenge);
  if(response.status == 206){
    for(var i = stringSize-1; i>=0; i--){
      if(responseCode[i] != "R"){
        var alfabetIndex = alfabet.indexOf(challenge[i]);
        var nextAlfabetIndex = alfabetIndex+1;
        if(nextAlfabetIndex >= alfabet.length){
          nextAlfabetIndex = 0;
        }
        challenge[i] = alfabet[nextAlfabetIndex];
        if(responseCode[i] == "W"){
          alfabet.splice(alfabetIndex,1);
        }
      }
    }
    console.log("next challenge: " + challenge);
    return false;
  } else{
    console.log(response);
    return true;
  }
}
