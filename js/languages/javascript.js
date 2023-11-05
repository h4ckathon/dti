var javascript = {
  eventType: 'populateCode',
  language: 'javascript',
       files: [
                  {
                      "name": "solution.js",
                      "content": "let inputReader = require('./inputReader');\r\ninputReader.read(solve);\r\n/* Do not change the code above */\r\n\r\n/*\r\n  STDIN variables should be accessible by their own names;\r\n  For instance, the following input for the program:\r\n    s = \"Hello, World!\"\r\n  and the code below:\r\n    console.log(s);\r\n  will print \"Hello, World!\" in the Output!\r\n*/\r\nfunction solve(){\r\n  /* Implementation goes here! */\r\n}"
                  },
                  {
                      "name": "inputReader.js",
                      "content": "/* This file should not be changed */\r\nvar readline = require('readline');\r\n\r\nconst read = (solve) => {\r\n  var rl = readline.createInterface({\r\n    input: process.stdin,\r\n    output: process.stdout,\r\n    terminal: false\r\n  });\r\n  \r\n  rl.on('line', function(line){\r\n    eval(line);\r\n    solve();\r\n  });\r\n}\r\n\r\nmodule.exports = { read };"
                  }
              ]
}
