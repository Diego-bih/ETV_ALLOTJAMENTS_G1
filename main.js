const { app, BrowserWindow,Menu,ipcMain} = require('electron')
const { mainMenu, /*popupMenu*/} = require('./menu.js')
require('@electron/remote/main').initialize()
const { net } = require('electron')

//Constant to create the window.
const createWindow = () => {
    const win = new BrowserWindow({
    webPreferences:{
        contextIsolation: false,
        nodeIntegration:true,
        //enableRemoteModule: true
    },
    minWidth:390,
    minHeight: 620
    
    })
    Menu.setApplicationMenu(mainMenu);
    win.maximize()
    win.loadFile('./html/home.html')
    module.exports = {
        win
    }
    win.webContents.openDevTools()
  }

  ipcMain.on("channelInfo",(e,args) =>{
    console.log(args)
    const request = net.request({
      method: 'GET',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/fotos'
    })
    request.on('response', (response) => {
      response.on('data', (chunk) => {
        //data.push(chunk)
          var json = JSON.parse(chunk);
          e.sender.send("channelInfo-r1",json.data)
        
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })

    request.end()
  })

  ipcMain.on("channelPost",(e,args) =>{
    console.log(args)
    const request = net.request({
      method: 'POST',
      url: 'http://etv.dawpaucasesnoves.com/etvServidor/public/api/login',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    //request.write(args)

    request.on('response', (response) => {
      console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
        //console.log(json.data.token)
        var json = JSON.parse(chunk);
        if(response.statusCode == 200){
          console.log(json.data.token)
          e.sender.send("channelPost-r", json.data.usuari.nom)
      }
        else if (response.statusCode == 400){
          var error = true;
          e.sender.send("channelPost-r", error)      
        }
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })
    request.end(args)
  })

  //Initialize the application with the given window.
  var data = []
  app.whenReady().then(() => {
      createWindow() 
  })

  app.on('browser-window-created', (_, window) => {
    require("@electron/remote/main").enable(window.webContents)
})

  //Disable security warning showed on console.log
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
