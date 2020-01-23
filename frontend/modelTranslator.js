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
   * functions (not useful for DTOs so far)
   * instance variable declarations after any function definition (we don't know when they end)
   * two classes with same name
   */
  const result = {};

  const currentContext = [];
  for (let token of identifyTokens(lines)) {
    switch (token.type) {
      case "class": {
        if (token.name in result)
          throw new Error(
            `class name ${token.name} found second time at line ${token.line +
              1}. We found it already earlier and don't support that`
          );

        result[token.name] = [];
        currentContext.push(token);
        break;
      }
      case "function": {
        currentContext.push(token);
        break;
      }
      case "member": {
        const maybeClass = currentContext[currentContext.length - 1];
        if (maybeClass.type !== "class") break;
        result[maybeClass.name].push({
          ...token,
          typescriptType: djangoToTypescript(token.memberType)
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

function identifyTokens(lines) {
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes("class ")) {
      const begin = line.indexOf("class ") + 6;
      const end = line.includes("(") ? line.indexOf("(") : line.indexOf(":");
      const className = line.slice(begin, end);
      result.push({ type: "class", line: i + 1, name: className });
    } else if (line.includes("def ")) {
      result.push({ type: "function", line: i + 1 }); // we know that functions exist but don't support them atm, no need for more details
    } else if (line.includes(" = ")) {
      const member = line.slice(0, line.indexOf(" = ")).trim();
      const type = line.slice(line.indexOf(" = ") + 3).trim();
      result.push({
        type: "member",
        line: i + 1,
        name: member,
        memberType: type
      });
    } else if (
      line.trim() === "" &&
      (i === lines.length - 1 ||
        (i <= lines.length - 1 && lines[i + 1].trim() === ""))
    ) {
      result.push({
        type: "blockEnd",
        line: i + 1
      });
    }
  }

  result.push({ type: "fileEnd", line: lines.length });
  return result;
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
