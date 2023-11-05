var java = {
  eventType: 'populateCode',
  language: 'java',
       files: [
                  {
                      "name": "Main.java",
                      "content": "import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n      Map<String, Object> input = InputReader.readStdin();\n      solve(input);\n  }\n  \n  /*\n    Use input.get(\"var_name\") to retrieve input variables\n    The variables can be one of the following classes:\n      String, Integer or Integer[]\n    For instance, the following input for the program:\n        s = \"Hello, World!\"\n    and the code below:\n      System.out.println((String) input.get(\"s\"));\n    will print \"Hello, World!\" in the Output!\n  */\n  public static void solve(Map<String, Object> input){\n    /* Implementation goes here!!! */\n  }\n}"
                  },
                  {
                      "name": "InputReader.java",
                      "content": "/* This file should not be changed */\r\nimport java.util.*;\r\n\r\npublic class InputReader {\r\n\r\n  public static Map<String, Object> readStdin(){\r\n    Map<String, Object> input = new HashMap<>();\r\n    String[] vars = new Scanner(System.in).nextLine().split(\";\");\r\n    for(int i=0; i<vars.length; i++){\r\n      String key = vars[i].split(\"=\")[0].trim();\r\n      String value = vars[i].split(\"=\")[1];\r\n\r\n      if(value.contains(\"\\\"\")){\r\n        input.put(key, value.trim().replaceAll(\"\\\"\",\"\"));\r\n      } else if(value.contains(\"[\")){\r\n        ArrayList<Integer> integers = new ArrayList<>();\r\n        value = value.trim().replaceAll(\"[\\\\[\\\\]]\",\"\");\r\n        new ArrayList<String>(Arrays.asList(value.split(\",\"))).forEach(\r\n          (el) -> {\r\n            integers.add(Integer.parseInt(el.trim()));\r\n          }\r\n        );\r\n        input.put(key, integers.toArray(new Integer[0]));\r\n      } else{\r\n        input.put(key, Integer.parseInt(value.trim()));\r\n      }\r\n    }\r\n    return input;\r\n  }\r\n}"
                  }
              ]
}
