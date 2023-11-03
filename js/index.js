{
	var questions, code;
	var languages = new Map();
	
	window.onload = function(){
		console.log(localStorage);
		for(i=1; i<=13; i++){
			let results = localStorage.getItem(i);
			if(results){
				addTable(i);
				for(r in JSON.parse(results)){
					addRow(r, results[r].input, results[r].output, results[r].result, results[r].timestamp)
				}
				resetSlider();
			}
		}
	}
	
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

	$.getScript("./js/languages/javascript.js", () => {languages.set('javascript', javascript)});
	$.getScript("./js/languages/java.js", () => {languages.set('java', java)});
	$.getScript("./js/languages/csharp.js", () => {languages.set('csharp', csharp)});
	$.getScript("./js/languages/python.js", () => {languages.set('python', python)});
	
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
				'output' : response.stdout.replace(/\n/,""), 
				'result' : ((response.stdout.replace(/\n/,"")  === question['response']) ? 'Success' : 'Failed'),
				'timestamp' : dateStr
			};

			localStorage.setItem(n, JSON.stringify(r));
			
			addTable(n)
			addRow(n, r[i].input, r[i].output, r[i].result, r[i].timestamp)
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

	const addRow = (questionNumber, stdin, stdout, result, date) => {
		const newRow = row(stdin, stdout, result, date)

		$(`#table${questionNumber}`).append( newRow )
	}
}
