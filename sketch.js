var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var x=0;
var y=0;
var yspeed=3;

function setup() {

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  createCanvas(255,255);
  background(0);
}

function draw() {
  stroke(0);
  ellipse(inData, y, 50, 50);
  
  if(x>=width){
    fill (random(0, 255), random(0, 255), random(0, 255));
  }
   if(x<=0){
    fill (random(0, 255), random(0, 255), random(0, 255));
  }
  
  y = y + yspeed;
  
  if(y>=height){
    yspeed = -3;
    fill (random(0, 255), random(0, 255), random(0, 255));
  }
   if(y<=0){
    yspeed = 3;
    fill (random(0, 255), random(0, 255), random(0, 255));
  }
}

function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}