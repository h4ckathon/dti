var numberOfQuestions = 0;
var numberOfSuccess = 0;
var a;
var questions = {"1":
     [{
      "input":  "alou bill",
      "response": "4"
      }, {
      "input":  " ",
      "response": "0"
      }],
"2":
     [{
      "input":  "19",
      "response": "true"
      }, {
      "input":  "14",
      "response": "false"
      }]
}

function solve(){
	numberOfQuestions = 0;
	for (let question of questions[$('#question').val()]) {
		sendData();
	}
}

function sendData(){
	const data = getData(question);
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	
	xhr.addEventListener('readystatechange', function (question) {
		if (this.readyState === this.DONE) {
			console.log("Teste #"+ ++numberOfQuestions + "'" +  question['input'] + "'")
			a = this;
			console.log( JSON.parse(this.responseText).stdin);
			console.log(JSON.parse(this.responseText).stdin.response === question['response'])
		}
	});
	
	xhr.open('POST', 'https://onecompiler-apis.p.rapidapi.com/api/v1/run');
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.setRequestHeader('X-RapidAPI-Key', '216af59996mshb83318e70b90962p18bd1fjsnfe56b4d521df');
	xhr.setRequestHeader('X-RapidAPI-Host', 'onecompiler-apis.p.rapidapi.com');

	xhr.send(data);
}

function getData(question){
	return JSON.stringify({
		'language': $('#language').val(),
		'stdin': question,
		'files': [
			{
				name: 'index.js',
				content: $('#code').val()
			}
		]
	});
}
