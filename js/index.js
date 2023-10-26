function solve(){
  var coder = $('#email').val();
  const settings = {
	async: true,
	crossDomain: true,
	url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '216af59996mshb83318e70b90962p18bd1fjsnfe56b4d521df',
		'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
	},
	processData: false,
	data: '{\r\n    "language": "python",\r\n    "stdin": "Peter",\r\n    "files": [\r\n        {\r\n            "name": "index.py",\r\n            "content": "import sys\nname = sys.stdin.readline()\nprint(\'Hello \'+ name)"\r\n        }\r\n    ]\r\n}'
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
alert("done!")
  
}
