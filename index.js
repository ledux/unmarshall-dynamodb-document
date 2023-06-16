#! /usr/bin/env node

const { program } = require("commander");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const fs = require("fs");

var stdin = "";

program
  .command("json <jsonInput>")
  // .option("-j, --json <jsonInput>", "raw json string as an input")
  .description("Remove the data types entries from document")
  .action(clean);

program
  .command("file <filePath>")
  // .option("-f, --file <filePath>", "json passed as contents of a file")
  .description("Remove the data types entries from document")
  .action(readFile);

function clean(jsonInput) {
  if (stdin) {
    jsonInput = stdin;
  }
  const json = JSON.parse(jsonInput);
  console.log(JSON.stringify(unmarshall(json)));
}

function readFile(filePath) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    clean(data);
  });
}

if (process.stdin.isTTY) {
  program.parse();
} else {
  process.stdin.on("readable", function () {
    var chunk = this.read();
    if (chunk !== null) {
      stdin += chunk;
    }
  });
  process.stdin.on("end", function () {
    program.parse(process.argv);
  });
}
