const shell = require('shelljs');


shell.exec('pm2 delete all');

console.log(new Date(), 'Starting mail-server...');
shell.cd('../mommoss-mail-server')
shell.exec('pm2 start yarn --name mail-server -- start:dev');

console.log(new Date(), 'Starting dev-server...');
shell.cd('../mommoss-api-server-ts')
shell.exec('pm2 start npm --name dev-server -- run dev');

console.log(new Date(), 'Starting sunflower-server...');
shell.cd('../sunflower-prototype')
shell.exec('pm2 start yarn --name sunflower-server -- start:dev');

shell.cd('../dev-server')
shell.exec('pm2 start node --name Auto -- ./AutorestartServer.js');