const fs = require("fs");

const source = "../OsterAnmeldung/models.py";
const destination = "src/DTOs.ts";

fs.readFile(source, (err, data) => {
  if (err) throw err;

  const lines = data.toString().split("\n");
  const classes = translateFromPythonDjango(lines);
  writeAsTypescript(classes);
});

function translateFromPythonDjango(lines) {
  /* NOT SUPPORTED
   * Python code formatted different than PEP 8
   * functions (not useful for DTOs so far)
   * instance variable declarations after any function definition (we don't know when they end)
   * two classes with same name
   */
  const result = {};

  const currentContext = [];
  for (let element of pythonElements(lines)) {
    switch (element.type) {
      case "class": {
        if (element.name in result)
          throw new Error(
            `class name ${
              element.name
            } found second time at line ${element.line +
              1}. We found it already earlier and don't support that`
          );

        result[element.name] = [];
        currentContext.push(element);
        break;
      }
      case "function": {
        // a function basically ends parsing of the enclosing class
        // however, since more than one may live in a file we need to continue parsing
        // Also, we need to differentiate member variable from function variables. Therefore storing what
        // context we're currently in is necessary
        currentContext.push(element);
        break;
      }
      case "member": {
        const maybeClass = currentContext[currentContext.length - 1];
        if (maybeClass.type !== "class") break;
        result[maybeClass.name].push({
          ...element,
          typescriptType: djangoToTypescript(element.memberType) // should that live in the 'fileWriter'?
        });
        break;
      }
      case "blockEnd":
        delete currentContext[currentContext.length - 1];
        break;
    }
  }
  return result;
}

function pythonElements(lines) {
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    switch (tokenize(line)) {
      case "class ": {
        const begin = line.indexOf("class ") + 6;
        const end = line.includes("(") ? line.indexOf("(") : line.indexOf(":");
        const className = line.slice(begin, end);
        result.push({ type: "class", line: i + 1, name: className });
        break;
      }
      case "def ": {
        // we know that functions exist but don't support them atm, no need for more details
        result.push({ type: "function", line: i + 1 });
        break;
      }
      case " = ": {
        const member = line.slice(0, line.indexOf(" = ")).trim();
        const type = line.slice(line.indexOf(" = ") + 3).trim();
        result.push({
          type: "member",
          line: i + 1,
          name: member,
          memberType: type
        });
        break;
      }
      case "": {
        if (
          i === lines.length - 1 ||
          (i <= lines.length - 1 && tokenize(lines[i + 1]) === "")
        ) {
          result.push({
            type: "blockEnd",
            line: i + 1
          });
        }
        break;
      }
    }
  }

  result.push({ type: "fileEnd", line: lines.length });
  return result;
}

function tokenize(line) {
  if (line.includes("class ")) {
    return "class ";
  } else if (line.includes("def ")) {
    return "def ";
  } else if (line.includes(" = ")) {
    return " = ";
  } else if (line.trim() === "") {
    return "";
  } else if (line.includes("import ")) {
    return "import ";
  } else if (line.includes("return ")) {
    return "return ";
  }
  throw new Error(`no known python token found in ${line}`);
}

function djangoToTypescript(djangoTypeDirty) {
  const djangoType = djangoTypeDirty.slice(0, djangoTypeDirty.indexOf("(")); // models.CharField(max_length=120)
  switch (djangoType) {
    case "models.TextField":
    case "models.DateTimeField":
    case "models.CharField":
      return "string";
    case "models.IntegerField":
      return "number";
  }
}

function writeAsTypescript(classes) {
  fs.writeFile(
    destination,
    `\n/* ****************
please note: 
  THE TYPES IN THIS FILE ARE AUTO GENERATED. ANY MODIFICATION TO ITS CONTENT WILL NOT BE PERSISTED
**************** */\n`,
    err => {
      if (err) throw err;
    }
  );

  let content = "";
  for (let className in classes) {
    // noinspection JSUnfilteredForInLoop
    content += `

export type ${className} = {
${classes[className]
  .map(({ name, typescriptType }) => `  ${name}: ${typescriptType};`)
  .join("\n")}
};`;
  }

  fs.writeFile(destination, content, { flag: "a" }, err => {
    if (err) throw err;
    console.log(`✅ write success. ${destination} has all the results`);
  });
}
