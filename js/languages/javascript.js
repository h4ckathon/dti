var javascript = {
  eventType: 'populateCode',
  language: 'javascript',
       files: [
                {
                  "name": "solution.js",
                  "content": "let inputReader = require('./inputReader');\r\ninputReader.read(solve);\r\n\r\nfunction solve(){\r\n/*   Implementation goes here */\r\n}"
                },
                {
                  "name": "inputReader.js",
                  "content": "/* This file should not be changed */\r\nvar readline = require('readline');\r\n\r\nconst read = (solve) => {\r\n  var rl = readline.createInterface({\r\n    input: process.stdin,\r\n    output: process.stdout,\r\n    terminal: false\r\n  });\r\n  \r\n  rl.on('line', function(line){\r\n    eval(line);\r\n    solve();\r\n  });\r\n}\r\n\r\nmodule.exports = { read };"
                }
              ]
}
