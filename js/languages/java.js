var java = {
  eventType: 'populateCode',
  language: 'java',
       files: [
        {
            "name": "main.java",
            "content": "var readline = require('readline');\r\nvar rl = readline.createInterface({\r\n  input: process.stdin,\r\n  output: process.stdout,\r\n  terminal: false\r\n});\r\n\r\nrl.on('line', function(line){\r\n   eval(line);\r\n   console.log(s.trim().split(/\\s+/).pop().length)\r\n});"
        }
    ]
}
