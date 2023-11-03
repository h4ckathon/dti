var javascript = {
  eventType: 'populateCode',
  language: 'javascript',
       files: [
        {
            "name": "index.js",
            "content": "var readline = require('readline');\r\nvar rl = readline.createInterface({\r\n  input: process.stdin,\r\n  output: process.stdout,\r\n  terminal: false\r\n});\r\n \r\nrl.on('line', function(line){\r\n   eval(line);\r\n   solve();\r\n});\r\n\r\nfunction solve(){\r\n}"
        }
    ]
}
