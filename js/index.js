function solve(){
  var coder = $('#email').val();
  getSyncResponse(coder, null, true);
  confirm('Test for ' + coder + ' successful!');
}

function getSyncResponse(coder, challenge, test){
  $.ajax({
    url: 'https://ac-challenge.herokuapp.com/api/challenge',
    async: true,
    data: {coder:coder, challenge:challenge, test:test},
    success: function(a,b,c){console.log(a);console.log(b);console.log(c);},
    error: function(a,b,c){console.log(a);console.log(b);console.log(c);}
  }); 
}
