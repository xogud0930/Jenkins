const YAML = require('yaml');
const fs = require('fs');

var version=process.argv[2].replace(/\"/g, "");
var note=process.argv[3].replace(/\"/g, "");
note=note.replace(version, "");
note=note.slice(note.indexOf('-'),note.length);
note=note.replace(/\\n/g, "\n");

const file = fs.readFileSync('./latest-mac-old.yml', 'utf8')
macYaml = YAML.parse(file)

macYaml.files[0].url='/download/flavor/default/1.0.0-beta.42/osx_64/'+macYaml.files[0].url
macYaml.files[1].url='/download/flavor/arm/1.0.0-beta.42/osx_64/'+macYaml.files[1].url
macYaml.files[2].url='/download/flavor/default/1.0.0-beta.42/osx_64/'+macYaml.files[2].url
macYaml.files[3].url='/download/flavor/arm/1.0.0-beta.42/osx_64/'+macYaml.files[3].url
macYaml.sha512='mommoss'
macYaml.Notice=version+'\n\n'+note

var file2 = 'latest-mac.yml';
  fs.open(file2,'w', (err,fileId) => {
    if (err) throw err;
    console.log(fileId)
    console.log('file open complete');

    var data = new Buffer.from(YAML.stringify(macYaml));
    fs.write(fileId, data, 0, data.length, null, (err, length) => {
      if(err) throw err;
      fs.close(fileId, () => {
        console.log('close');
      })
    })
  });

//download/flavor/default/1.0.0-beta.42/osx_64/