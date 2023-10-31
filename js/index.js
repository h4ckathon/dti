{
	var numberOfQuestions = 0;
	var numberOfSuccess = 0;
	var a = [];
	
	var questions, data;
	
	window.onmessage = function (e) {
	    if (e.data && e.data.language) {
		data = e.data; 
	    }
	};
	
	        
	$.ajax({
	    url: "https://raw.githubusercontent.com/h4ckathon/dti/master/js/questions.json",
	    dataType: "json"
	  }).done(function(result) {
	    questions = result
	  });
	
	function validate(){
		numberOfQuestions = 0;
		for (let question of questions[$('#question').val()]) {
			sendData(question);
		}
	}
	
	function sendData(question){
		const data = getData(question);
		let xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		
		xhr.addEventListener('readystatechange', function () {
			if (this.readyState === this.DONE) {
				var question;
				let response = JSON.parse(this.responseText);
				a[numberOfQuestions] = this;
				console.log("Teste #"+ ++numberOfQuestions + "'" +  response.stdin + "'")
				for (question of questions[$('#question').val()]) {
					if(question['input'] === response.stdin) {
						break;
					}
				}
				console.log(response.stdout + " === " +question['response'] + " => " + (response.stdout  === question['response']));
			}
		});
		
		xhr.open('POST', 'https://onecompiler-apis.p.rapidapi.com/api/v1/run');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.setRequestHeader('X-RapidAPI-Key', '216af59996mshb83318e70b90962p18bd1fjsnfe56b4d521df');
		xhr.setRequestHeader('X-RapidAPI-Host', 'onecompiler-apis.p.rapidapi.com');
	
		xhr.send(data);
	}
	
	function getData(question){
		data.stdin = question['input'];
		console.log(data);
		return JSON.stringify(data, null, 2)
		/*
	 	return JSON.stringify({
			'language': $('#language').val(),
			'stdin': question['input'],
			'files': [
				{
					name: 'index.js',
					content: $('#code').val()
				}
			]
		});
	 	*/
	}
}
