import paho.mqtt.client as mqtt
import sys

def on_connect(self,client,userdata,rc):
	pass

def on_message(client,userdata,message):
	print(str(message.payload.decode("utf-8")))
	exit()

if __name__ == '__main__':
	# print (sys.argv)
	message = sys.argv[1] + ' ' + sys.argv[2]
	client = mqtt.Client()
	client.on_connect = on_connect
	client.on_message = on_message
	client.connect("localhost",1884,60)
	client.subscribe("ccproject/test/receive")
	client.publish("ccproject/test/send",message)
	client.loop_forever()