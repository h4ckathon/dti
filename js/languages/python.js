var python = {
  eventType: 'populateCode',
  language: 'python',
       files: [
                {
                  "name": "main.py",
                  "content": "import sys\nimport input\n\n# Use input.var_name to retrieve stdin variables"
                },
                {
                  "name": "input.py",
                  "content": "#This file should not be changed\nimport sys\nexec(sys.stdin.readline())"
                }
              ]
}
