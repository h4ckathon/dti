function solve(){
  var coder = $('#email').val();
  getSyncResponse(coder, '', true);
  confirm('Test for ' + coder + ' successful!');
}

function getSyncResponse(coder, challenge, test){
  var data = {coder:coder, challenge:challenge, test:test};
  $.ajax({
    url: 'https://ac-challenge.herokuapp.com/api/challenge',
    async: true,
    data: data,
    success: function(a,b,c){console.log(a);console.log(b);console.log(c);},
    error: function(a,b,c){console.log(a.responseText);console.log(b);console.log(c);}
  }); 
}
