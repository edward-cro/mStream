#!/usr/bin/env node
"use strict";

// Check if we are in an electron environment
if (process.versions["electron"]) {
  // off to a separate electron boot environment
  require("./mstream-electron.js");
  return;
}

var program = require("./modules/config/configure-commander.js").setup(process.argv);

// User ran a maintenance operation.  End the program
if(!program){
  return;
}

// Check for errors
if (program.error) {
  console.log(program.error);
  process.exit(1);
  return;
}

const colors = require('colors');
console.clear();
console.log(colors.bold(`
  v4.3.0     ____  _
   _ __ ___ / ___|| |_ _ __ ___  __ _ _ __ ___
  | '_ \` _ \\\\___ \\| __| '__/ _ \\/ _\` | '_ \` _ \\
  | | | | | |___) | |_| | |  __/ (_| | | | | | |
  |_| |_| |_|____/ \\__|_|  \\___|\\__,_|_| |_| |_|`));
console.log(colors.bold(`  Paul Sori - ${colors.underline('paul@mstream.io')}`));
console.log();
console.log(colors.magenta.bold('Find a bug? Report it at:'));
console.log(colors.underline('https://github.com/IrosTheBeggar/mStream/issues'));
console.log();

// Boot the server
const serve = require("./mstream.js");
serve.serveIt(program);
