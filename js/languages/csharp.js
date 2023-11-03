var csharp = {
  eventType: 'populateCode',
  language: 'csharp',
       files: [
                  {
                      "name": "Solution.cs",
                      "content": "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Text.RegularExpressions;\n\nnamespace Solution {\n\tpublic class Program\n\t{\n\t\tpublic static void Main(string[] args)\n\t\t{\n      solve(InputReader.readStdin());\n\t\t}\n\t\t\n\t\tpublic static void solve(Dictionary<string, Object> input){\n\t\t  /* Implementation goes here */\n\t\t}\n\t}\n\t\n\t\n\t/* No need to change below class (we hope :)*/\n  public static class InputReader{\n  \tpublic static Dictionary<string, Object> readStdin()\n  \t{\n      string[] vars = Console.ReadLine().Split(';');\n      Dictionary<string, Object> input = new Dictionary<string, Object>();\n      foreach (String v in vars){\n        string key = v.Split(\"=\")[0].Trim();\n        string value = v.Split(\"=\")[1];\n        \n        if(value.Contains(\"\\\"\")){\n          input.Add(key, Regex.Replace(value, \"\\\"\", \"\"));\n        } else if(value.Contains(\"[\")){\n          value = Regex.Replace(value, \"[\\\\[\\\\]]\", \"\");\n          var integers = new List<int>();\n          foreach(string item in value.Split(\",\")) {\n            integers.Add(int.Parse(item.Trim()));\n          }\n          input.Add(key, integers);\n        } else{\n          input.Add(key, int.Parse(value.Trim()));\n        }\n      }\n      \n      return input;\n  \t}\n  }\n}"
                  }
              ]
}
