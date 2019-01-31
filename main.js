const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
//Serial-Port
const SerialPort = require('serialport')
let port = null

//Mqtt
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.1.131')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var text

SerialPort.list((err, port)=>{
  if(err){
    console.log(err)
  }
  for(let item of port){
    console.log(item.comName)
  }
})

port = new SerialPort("COM10", {
  baudRate: 115200
})

port.on('data', data=>{
  ChoiceOfAction(data)
})

client.on('connect', function(){
  client.subscribe('/TipsWebDisplay/Text')
  client.subscribe('/TipsWebDisplay/Time')
  client.subscribe('/TipsWebDisplay/ChangeDisplay')
  client.publish('/TipsWebDisplay/Connected', 'true')
})

client.on('message', function(topic, message){
  console.log(topic + " ")
  console.log(message.toString())
  mainWindow.webContents.send(topic.toString(), message.toString())

  if( topic == '/TipsWebDisplay/ChangeDisplay'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'src/tips.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

})

function ChoiceOfAction(data){
  const msg = data.toString().split(':')
  console.log(msg[0])
  console.log(msg[1]);
  if( msg[1] == 'Button Toogle'){
    mainWindow.webContents.send('Player', 'play')
  } else if(msg[0] == 'RFID Data'){
    ChangeDisplay(msg[1])
  }
}

function ChangeDisplay (data){
  if(data == 'fe67c31f' || data == '5dc2672d' || data == '0e63a920'){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'src/tips.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}

//Main
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 900, frame: true})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  }) 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
