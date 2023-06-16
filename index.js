#! /usr/bin/env node

const { program } = require("commander");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const fs = require("fs");

program
  .command("do")
  .option("-j, --json <jsonInput>", "raw json string as an input")
  .description("Remove the data types entries from document")
  .action(clean);

program
  .command("do")
  .option("-f, --file <filePath>", "json passed as contents of a file")
  .description("Remove the data types entries from document")
  .action(readFile);

function clean(jsonInput) {
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

program.parse();
