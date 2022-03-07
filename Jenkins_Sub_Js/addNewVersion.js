require('dotenv').config();
const req = require('request');

const version=process.argv[2].replace(/\"/g, "");
var note=process.argv[3].replace(/\"/g, "");
note=note.replace(version, "");
note=note.slice(note.indexOf('-'),note.length);
note=note.replace(/\\n/g, "\n");

const currentDateTime = new Date();

req.post({
  uri: process.env.UPDATE_URI+'/api/auth/login',
  body: {'username':process.env.ADMIN_ID, 'password':process.env.ADMIN_PW},
  json: true
}, (err, res, body) => {
  const token = body.token;
  console.log(token)

  addVersion('default', token);
  addVersion('arm', token);
})

const addVersion = (flavor, token) => {
  var versionInfo = {
    name: version,
    notes: note,
    channel: 'stable',
    availability: currentDateTime,
    flavor: flavor,
    token: token
  };

  console.log(versionInfo)

  req.post({
    uri: process.env.UPDATE_URI+'/api/version',
    body: versionInfo,
    json: true
  }, (err, res, body) => {
    console.log(body)
  })
}