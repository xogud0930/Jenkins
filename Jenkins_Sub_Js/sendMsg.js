require('dotenv').config();
const WebSocket = require("ws");
const req = require('request');
const fs = require('fs');
const groupId = 2548;

user=process.argv[2]
msg=process.argv[3].replace(/\n/g, "\\n");
msg=msg.replace(/\"/g, "\\\"");

const writeDotenv = () => {
  var file = '.env';
  fs.open(file,'w', (err,fileId) => {
    if (err) throw err;
    console.log(fileId)
    console.log('file open complete');

    req.post({
        headers: {'content-type': 'application/json'},
        uri: process.env.API_URI+'/api/user/login',
        body: {'email':process.env.ID,'password':process.env.TOKEN.PW},
        json: true
      }, function(err, res, body) {
        var data = new Buffer("TOKEN="+body.result.token);
        fs.write(fileId, data, 0, data.length, null, (err, length) => {
          if(err) throw err;
          fs.close(fileId, () => {
            console.log('close');
          })
        })
    });
  });
}

const connectWS = () => {
  const ws = new WebSocket(process.env.SOCKET_URI+'/chat', {
    headers: {
      'x-user-token': process.env.TOKEN,
      'x-device-token': null,
      'x-device-name': 'socket.default',
    },
  })

  ws.onmessage = function (e) { 
    console.log(e.data);
    let recvData = JSON.parse(e.data);
    console.log(recvData.event)
    switch (recvData.event) {
      case 'receiveMessage':
        if(recvData.data.user.id == 16462) {
          console.log("ok")
          //ws.close();
        }
        break;
      default:
    }
  };

  ws.onopen = () => {
    console.log("websocket connected");
    let sendData = {
      event: 'sendMessage',
      data: {
        cmsGroupId: 12905,
        groupId: groupId,
        type: 'message',
        localId: "54902fba-2ded-4a39-a6a4-d3b2a5d83002",
        contents: "{\"text\":\""+msg+"\",\"mention\":["+user+",24]}",
        mentionList: [Number(user),24],
      }
    };
    
    let sendMessage = setInterval(() => {
      console.log(sendData)
      ws.send(JSON.stringify(sendData));
    }, 3000);

    setTimeout(() => {
      clearInterval(sendMessage);
      console.log("Send message timeout")
      //ws.close();
    }, 9000)

    ws.on('error', ({ event, message }) => {
      console.log(`socket error:
      event: ${event}
      message: ${message}`);
    });
  };

  ws.onerror = (err) => {
    console.log(err.message);

    if(err.message == "socket hang up") {
      writeDotenv();
    }
  };

  ws.onclose = () => {
    console.log("websocket disconnected");
  }
}

connectWS();