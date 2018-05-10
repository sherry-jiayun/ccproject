import paho.mqtt.client as mqtt
import sys

def on_connect(self,client,userdata,rc):
	print("Connected with result code "+str(client))

def on_message(client,userdata,message):
	print("Message received", str(message.payload.decode("utf-8")))
	exit()

if __name__ == '__main__':
	print (sys.argv)
	client = mqtt.Client()
	client.on_connect = on_connect
	client.on_message = on_message
	client.connect("localhost",1883,60)
	client.subscribe("awsiot_to_localgateway")
	print("Publishing message to topic","localgateway_to_awsiot")
	message = '{ "serialNumber":"testserialnumber","clickType":"testclicktype","message": "Hello from python"}'
	client.publish("localgateway_to_awsiot",message)
	client.loop_forever()