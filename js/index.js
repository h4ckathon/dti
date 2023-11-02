{
	var article = (q) =>  `<article style='position: relative; width: 100%; opacity: 1;'> 
				<div class='slide-text'>
					<h4>[Question ${q}]</h4>
					<div class='container-fluid'>
						<div class='row row-header'>
							<div class='col-sm-4'>Input</div>
							<div class='col-sm-4'>Output</div>
						    	<div class='col-sm-4'>Result</div>
						</div>
      						<div id='table${q}' class='row-body'>
	    					</div>
					</div>
				</div>
			</article>`

	const row = (input, output, result) => `
		<div class='row'>
			<div class='col-sm-4'>${input}</div>
			<div class='col-sm-3'>${output}</div>
			<div class='col-sm-3'>${result}</div>
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
			
			if(!response.stdin)
				return

			for (question of questions[n]) {
				if(question['input'] === response.stdin) {
					break;
				}
				i++;
			}

			let r = localStorage.getItem(n);
			if(r == null){
				r = [];
			} else {
				r = JSON.parse(r);
			}

			r[i] = {
				'input' : response.stdin, 
				'output' : response.stdout, 
				'result' : ((response.stdout  === question['response']) ? 'Success' : 'Failed'),
				'timestamp' : Date.now()
			};

			localStorage.setItem(n, JSON.stringify(r));
			console.log("Teste #" + n + "'" +  response.stdin + "'");
			console.log(response.stdout + " === " +question['response'] + " => " + (response.stdout  === question['response']));

			addTable(n)
			addRow(response, question, n)
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

	const addRow = (response, question, questionNumber) => {
		const newRow = row(response.stdin, response.stdout, response.stdout  === question['response'] ? 'Success' : 'Failed')

		$(`#table${questionNumber}`).append( newRow )
	}
}
