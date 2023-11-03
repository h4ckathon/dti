{
	var languages = new Map();
	languages.set('javascript',
		{
			eventType: 'populateCode',
			language: 'javascript',
			     files: [
				    {
				        "name": "index.js",
				        "content": "var readline = require('readline');\r\nvar rl = readline.createInterface({\r\n  input: process.stdin,\r\n  output: process.stdout,\r\n  terminal: false\r\n});\r\n \r\nrl.on('line', function(line){\r\n   eval(line);\r\n   solve();\r\n});\r\n\r\nfunction solve(){\r\n}"
				    }
				]
		}
	)
	languages.set('csharp',
		{
			eventType: 'populateCode',
			language: 'javascript',
			     files: [
			      {
				"name": "index.js",
				"content": "your code...."
			      }
			  ]
		}
	)
	languages.set('java',
		{
			eventType: 'populateCode',
			language: 'javascript',
			     files: [
			      {
				"name": "index.js",
				"content": "your code...."
			      }
			  ]
		}
	)
	
	var article = (q) =>  `<article style='position: relative; width: 100%; opacity: 1;'> 
				<div class='slide-text'>
					<h4>[Question ${q}]</h4>
					<div class='container-fluid'>
						<div class='row row-header'>
							<div class='col-sm-4'>Input</div>
							<div class='col-sm-4'>Output</div>
						    	<div class='col-sm-2'>Result</div>
						    	<div class='col-sm-2'>DateTime</div>
						</div>
      						<div id='table${q}' class='row-body'>
	    					</div>
					</div>
				</div>
			</article>`

	const row = (input, output, result, date) => `
		<div class='row'>
			<div class='col-sm-4'>${input}</div>
			<div class='col-sm-4'>${output}</div>
			<div class='col-sm-2'>${result}</div>
			<div class='col-sm-2'>${date}</div>
		</div>
	`
	
	var questions, code;
	
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
	
	function resetLanguage(language) {
		if(confirm('The current code will be lost. Do you wnat to continue?'))
			document.getElementById("code_editor").contentWindow.postMessage(languages.get(language), "*")
	}
	
	function validate(){
		numberOfQuestions = 0;

		for (let question of questions[$('#question').val()]) {
			resetQuestionInfo($('#question').val())
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
		xhr.setRequestHeader('X-RapidAPI-Key', '216af59996mshb83318e70b90962p18bd1fjsnfe56b4d521df');
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
			
			if(!response.stdin)
				return

			for (question of questions[n]) {
				if(question['input'] === response.stdin) {
					break;
				}
				i++;
			}

			let r = localStorage.getItem(n);
			let dateStr = new Date().toLocaleTimeString();
			
			if(r == null){
				r = [];
			} else {
				r = JSON.parse(r);
			}
			
			r[i] = {
				'input' : response.stdin, 
				'output' : response.stdout, 
				'result' : ((response.stdout  === question['response']) ? 'Success' : 'Failed'),
				'timestamp' : dateStr
			};

			localStorage.setItem(n, JSON.stringify(r));
			console.log("Teste #" + n + "'" +  response.stdin + "'");
			console.log(response.stdout + " === " +question['response'] + " => " + (response.stdout  === question['response']));

			addTable(n)
			addRow(response, question, dateStr, n)
			resetSlider()
		}
	}
	
	const resetSlider = () => {
		$( ".wmuSlider a" ).remove()
		$('.results').wmuSlider()
	}
	
	const resetQuestionInfo = (questionNumber) => {	
		if($(`#table${questionNumber}`).get(0))
			$(`#table${questionNumber}`).empty()
	}

	const addTable = (questionNumber) => {	
		if($( "#empty-article" ).get(0))
			$( "#empty-article" ).remove()

		if(!$(`#table${questionNumber}`).get(0)){
			const newArticle = $.parseHTML(article(questionNumber))[0]
			$( "#container-results" ).append( newArticle )
		}
	}

	const addRow = (response, question, date, questionNumber) => {
		const newRow = row(response.stdin, response.stdout, response.stdout  === question['response'] ? 'Success' : 'Failed', date)

		$(`#table${questionNumber}`).append( newRow )
	}
}
