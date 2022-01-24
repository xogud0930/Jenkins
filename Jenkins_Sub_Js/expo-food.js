// startscript.js
const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");

var expo_id = process.argv[2];

console.log(__dirname, expo_id);

const client = exec("echo test %cd%", {
  windowsHide: true,
  cwd: path.join(__dirname, `../Expo-food/${expo_id}/mommoss-app-kacpta`),
}, (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(stdout);
  console.log(stderr);
});

client.stdout.pipe(process.stdout);
client.stderr.pipe(process.stderr);