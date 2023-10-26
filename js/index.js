function solve(){
  var coder = $('#email').val();

const data = JSON.stringify({
	language: 'python',
	stdin: 'Peter',
	files: [
		{
			name: 'index.py',
			content: 'import sys\nname = sys.stdin.readline()\nprint(\'Hello \'+ name)'
		}
	]
});

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

xhr.send(data);

	
alert("done, ${coder}")
  
}
