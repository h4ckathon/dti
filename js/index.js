function solve(){
  var question = $('#question').value;
  var language = $('#language').value;
  var code = $('#code').value;
console.log(question);
	console.log(language);
	console.log(code);
const data = JSON.stringify({
	language: '${language}',
	stdin: 'alou bill ',
	files: [
		{
			name: 'index.js',
			content: '${code}'
		}
	]
});
console.log(data);
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('POST', 'https://onecompiler-apis.p.rapidapi.com/api/v1/run');
xhr.setRequestHeader('content-type', 'application/json');
xhr.setRequestHeader('X-RapidAPI-Key', '216af59996mshb83318e70b90962p18bd1fjsnfe56b4d521df');
xhr.setRequestHeader('X-RapidAPI-Host', 'onecompiler-apis.p.rapidapi.com');



	
alert("done, ${coder}")
  
}
