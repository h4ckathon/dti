var java = {
  eventType: 'populateCode',
  language: 'java',
       files: [
                  {
                      "name": "Main.java",
                      "content": "import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n      Map<String, Object> input = InputReader.readStdin();\n      solve(input);\n  }\n  \n  public static void solve(Map<String, Object> input){\n/* Implementation goes here */\n  }\n}"
                  },
                  {
                      "name": "InputReader.java",
                      "content": "/* This file should not be changed */\r\nimport java.util.*;\n\npublic class InputReader {\n\n  public static Map<String, Object> readStdin(){\n    Map<String, Object> input = new HashMap<>();\n    String[] vars = new Scanner(System.in).nextLine().split(\";\");\n    for(int i=0; i<vars.length; i++){\n      String key = vars[i].split(\"=\")[0].trim();\n      String value = vars[i].split(\"=\")[1];\n\n      if(value.contains(\"\\\"\")){\n        input.put(key, value.trim().replaceAll(\"\\\"\",\"\"));\n      } else if(value.contains(\"[\")){\n        ArrayList<Integer> integers = new ArrayList<>();\n        value = value.trim().replaceAll(\"[\\\\[\\\\]]\",\"\");\n        new ArrayList<String>(Arrays.asList(value.split(\",\"))).forEach(\n          (el) -> {\n            integers.add(Integer.parseInt(el.trim()));\n          }\n        );\n        input.put(key, integers);\n      } else{\n        input.put(key, Integer.parseInt(value.trim()));\n      }\n    }\n    return input;\n  }\n}"
                  }
              ]
}
