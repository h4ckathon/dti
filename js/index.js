{
	var article = `<article style='position: relative; width: 100%; opacity: 1;'> 
				<div class='slide-text'>
					<h4>[{q}]</h4>
					<div class='container'>
						<div class='row'>
							<div class='col-sm-4'>Input</div>
							<div class='col-sm-3'>Output</div>
						    	<div class='col-sm-3'>Result</div>
						</div>
      						<div class='row'>
							<div class='col-sm-4'>{input1}</div>
							<div class='col-sm-3'>{output1}</div>
							<div class='col-sm-3'>{result1}</div>
						</div>
						<div class='row'>
							<div class='col-sm-4'>{input2}</div>
							<div class='col-sm-3'>{output2}</div>
							<div class='col-sm-3'>{result2}</div>
					   	</div>
						<div class='row'>
							<div class='col-sm-4'>{input3}</div>
							<div class='col-sm-3'>{output3}</div>
							<div class='col-sm-3'>{result3}</div>
					   	</div>
					</div>
				</div>
			</article>`
	
	var questions, code;
	var results = new Map();
	
	window.onmessage = function (e) {
	    if (e.data && e.data.language) {
		code = e.data; 
		console.log(code);
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
		
		xhr.addEventListener('readystatechange', getResponse);
		
		xhr.open('POST', 'https://onecompiler-apis.p.rapidapi.com/api/v1/run');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.setRequestHeader('X-RapidAPI-Key', $('#api').val());
		xhr.setRequestHeader('X-RapidAPI-Host', 'onecompiler-apis.p.rapidapi.com');
	
		xhr.send(data);
	}
	
	function getData(question){
		code.stdin = question['input'];
		return JSON.stringify(code, null, 2)
	}

	function getResponse() {
		if (this.readyState === this.DONE) {
			let question, n=$('#question').val(), i=1;
			let response = JSON.parse(this.responseText);
			for (question of questions[n]) {
				if(question['input'] === response.stdin) {
					break;
				}
				i++;
			}
			let r = results.get(n);
			if(r == null){
				r = [];
			}
			r[i] = {'input' : response.stdin, 'output' : response.output, 'result' : ((response.stdout  === question['response']) ? 'Success' : 'Failed') };
			results.set(n, r);
			console.log(results);
			console.log("Teste #" + n + "'" +  response.stdin + "'");
			console.log(response.stdout + " === " +question['response'] + " => " + (response.stdout  === question['response']));
		}
	}
}
