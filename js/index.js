var stringSize;
var initialAlfabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
                      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                      "0","1","2","3","4","5","6","7","8","9","_","="];
var alfabet = initialAlfabet.slice(0);
var challenge;
var response;
function solve(){
  var coder = $('#email').val();
  getSyncResponse(coder, '', true);
  setFirstChallenge();
  var challengeAccepted = true;
  var counter = 0;
  do{
    getSyncResponse(coder, challenge, true);
    verifyAndGenerateNewChallenge();
    counter++;
  } while(!challengeAccepted || counter > alfabet.length);
  confirm('Test for ' + coder + ' successful!\nStringSize = ' + StringSize);
}

function getSyncResponse(coder, challenge, test){
  var data = {coder:coder, challenge:challenge, test:test};
  $.ajax({
    url: 'https://ac-challenge.herokuapp.com/api/challenge',
    async: true,
    data: data,
    success: function(responseCode){response = responseCode},
    error: function(error){if(error.status == "409"){stringSize = parseInt(error.responseText)}}
  }); 
}

function setFirstChallenge(){
   for(var i=0; i<stringSize; i++){
     var pos = i;
     if(i>=alfabet.length){
      pos = i%alfabet.length;
     }
    challenge[i] = alfabet[pos];
   }
}

function verifyAndGenerateNewChallenge(){
   
}
