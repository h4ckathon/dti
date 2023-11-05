var python = {
  eventType: 'populateCode',
  language: 'python',
       files: [
                  {
                      "name": "main.py",
                      "content": "import sys\nimport input\n\n# STDIN variables should be accessible by input.var_name\n# For instance, the following input for the program\n#   s = \"Hello World\"\n# and the code below:\n#   print(input.s)\n# will print \"Hello World\" in the Output!\n#\n# Implementation goes here!\n"
                  },
                  {
                      "name": "input.py",
                      "content": "#This file should not be changed\nimport sys\nexec(sys.stdin.readline())"
                  }
              ]
}
