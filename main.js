const { app, BrowserWindow,Menu,ipcMain} = require('electron')
const electronDialog = require('electron').dialog;
const { mainMenu, /*popupMenu*/} = require('./menu.js')
require('@electron/remote/main').initialize()
const { net } = require('electron')

//Constant to create the window.
var win;
const createWindow = () => {
    win = new BrowserWindow({
    webPreferences:{
        contextIsolation: false,
        nodeIntegration:true,
        //enableRemoteModule: true
    },
    minWidth:390,
    minHeight: 620
    
    })
    win.maximize()
    win.loadFile('./html/home.html')
    Menu.setApplicationMenu(mainMenu);
    module.exports = {
        win
    }
    //console.log(Menu.getApplicationMenu().getMenuItemById('login'))
  }
  
  ipcMain.on("channelshowlogged", (e,args) => {
    electronDialog.showMessageBox(this.win, {
      'type': 'info',
      'title': 'Logged In',
      'message': "Successfully logged!",
      'buttons': []
  })
  })

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
  
  ipcMain.on("channellogin" , (e,args) => {
    e.sender.send("channellogin-home", args)
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
          //Guardar usuario
          console.log(json.data.token)
          const menu = Menu.getApplicationMenu(); // get default menu
          var admin =
          {
                label:'Admin',
                submenu:
            [
              {
                label: 'New Accomodation'
              },
              {
                label: 'Edit Accomodation'
              },
              {
                label: 'List Accomodations',
                click: () => { 
                 win.loadFile('./html/list.html')
                },
                id:'list',
                role: "list"
              }
            ],
            role: 'admin'   
          }

          var logout = 
            {
              label: 'Logout',
              accelerator: "Control+e",
              role: 'logout',
              click: () => {
                electronDialog.showMessageBox(this.win, {
                  'type': 'question',
                  'title': 'Confirmation',
                  'message': "Are you sure?",
                  'buttons': [
                      'Yes',
                      'No'
                  ]
              })
                  // Dialog returns a promise so let's handle it correctly
                  .then((result) => {
                      // Bail if the user pressed "No" or escaped (ESC) from the dialog box
                      if (result.response !== 0) { return; }
          
                      // Testing.
                      if (result.response === 0) {
                        const items = menu?.items.filter((item) => item.role !== 'logout' && item.role !== 'admin')          
                        Menu.setApplicationMenu(Menu.buildFromTemplate(items))
                        electronDialog.showMessageBox(this.win, {
                          'type': 'info',
                          'title': 'Logged out',
                          'message': "Logged out",
                          'buttons': []
                      })
                      }
          
                  })
              }
              
            }
          
          const items = menu?.items.filter((item) => item.role !== 'login')
          
          items.push(admin)
          items.push(logout)

          Menu.setApplicationMenu(Menu.buildFromTemplate(items))

          e.sender.send("channelPost-r", json.data.token)

      }
        else if (response.statusCode == 400){
          var error = true;
          electronDialog.showMessageBox(this.win, {
            'type': 'error',
            'title': 'Error',
            'message': "Error en credenciales",
            'buttons': []
        })
          e.sender.send("channelPost-r", error)      
        }
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })
    request.end(args)
  })

  ipcMain.on("channelList", (e,args) =>{
    console.log(args)
    const request = net.request({
      method: 'GET',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments'
    })

    request.on('response', (response) => {
      response.on('data', (chunk) => {
        //data.push(chunk)
        var json = JSON.parse(chunk)
          e.sender.send("channelList-r1",json)
        
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })

    request.end()
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
