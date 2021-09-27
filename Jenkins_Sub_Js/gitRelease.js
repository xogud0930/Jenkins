require('dotenv').config();
const req = require('request');

var ver=process.argv[2].replace(/\"/g, "");
var msg=process.argv[3].replace(/\"/g, "");
msg=msg.replace(ver, "");
msg=msg.slice(msg.indexOf('-'),msg.length);
msg=msg.replace(/-/g, "<li>");
msg="<ul>"+msg.replace(/\\n/g, "</li>")+"</li></ul>";

console.log(ver, msg)

req.post({
    headers: {'User-Agent': 'request', 'Authorization': 'token '+process.env.GIT_TOKEN},
    uri: 'https://api.github.com/repos/Ablestor/mommoss-electron-kacpta/releases',
    body: {
      'name': ver,
      'tag_name': ver,
      'body': msg
    },
    json: true
  }, function(err, res, body) {
    console.log(body)
});