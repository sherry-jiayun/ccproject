
var mosca = require('mosca');

var pubsubsettings = {
	type: 'mongo',
	url: 'mongodb://localhost:27017/mqtt',
	pubsubCollection: 'ascoltatori',
	mongo: {}
};

var moscaSettings = {
  port: 1884,
  backend:pubsubsettings,
  persistence: {
  	factory:mosca.persistence.Mongo,
  	url:'mongodb://localhost:27017/mqtt'
  }
};

var server = new mosca.Server(moscaSettings, function() {
});
server.on('ready',setup);

function setup(){
	console.log('Mosca server is up and running1')
}

server.on('clientConnected',function(client){
	console.log('Client Connected:', client.id);
});

server.on('published',function(packet, client, cb) {
 
  if (packet.topic == 'ccproject/test/send'){
  	 console.log('Published',packet.payload.toString());
  	 console.log(packet.payload.toString().split(' '))
  	 var data = packet.payload.toString().split(' ')
  	 var message = {
		topic:'ccproject/test/receive',
		payload:'back info',
		qos:2,
		reatin:false
	}
  	 if (data[0] == 'Yes'&& data[1] == 'Yes'){
  	 	message.payload = 'SUPER TASTER'
  	 }else{
  	 	message.payload = 'NORMAL TASTER'
  	 }
  	 
		server.publish(message,function(){
			console.log('done!');
		});
  }
}); 


