const { app, BrowserWindow,Menu,ipcMain} = require('electron')
const electronDialog = require('electron').dialog;
const { mainMenu, /*popupMenu*/} = require('./menu.js')
require('@electron/remote/main').initialize()
const { net } = require('electron');

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
    win.webContents.openDevTools()
    module.exports = {
        win
    }
    win.webContents.setWindowOpenHandler(() => {
      //if (url === '../html/create-car-group.html') {
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            fullscreenable: false,
            contextIsolation: false,
            nodeIntegration:true,
            modal:true,
            parent:win,
            autoHideMenuBar:true,
          }
        }
      //}
      //return { action: 'deny' }
    })
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
          //console.log(chunk)
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
  
  var token;
  var id;
  var win2
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
        token = json.data.token;
        id = json.data.usuari.id;
          //Guardar usuario
          console.log(json.data.token)
          const menu = Menu.getApplicationMenu(); // get default menu
          var dashboard = {
            label: 'Dashboard',
            role: 'dashboard'
          }
          var map = {
            label: 'Map',
            role: 'map'
          }
          var admin =
          {
                label:'Admin',
                submenu:
            [
              {
                label: 'New Accomodation',
                click: () => { 
                  win2 = new BrowserWindow({
                    webPreferences:{
                        contextIsolation: false,
                        nodeIntegration:true
                    },
                      width: 700,
                      height: 700,
                      maxWidth:700,
                      maxHeight:700,
                      minWidth:320,
                      center:true,
                      parent:win,
                      modal:true,
                      autoHideMenuBar:true
                   })
                  win2.loadFile('./html/create.html')
                  win2.webContents.openDevTools()
                 },
                 id:'list',
                 role: "list"
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
                        const items = menu?.items.filter((item) => item.role !== 'logout' && item.role !== 'map' && item.role !== 'dashboard' && item.role !== 'admin')          
                        Menu.setApplicationMenu(Menu.buildFromTemplate(items))
                        win.loadFile('./html/home.html')
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
          
          items.push(map)
          items.push(dashboard)
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
    console.log(token)
    console.log(id)
    const request = net.request({
      method: 'GET',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments'
    })

    request.on('response', (response) => {
     response.on('data', (chunk) => {
        //data.push(chunk)
        var json = JSON.parse(chunk)
          e.sender.send("channelList-r1",[id,json.data])
        
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })

    request.end()
  })

  ipcMain.on("channelEdit",(e,args) =>{
    console.log(args)
    console.log(token)
    const request = net.request({
      method: 'PUT',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments/' + args[0],
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    })

    request.on('response', (response) => {
      response.on('data', (chunk) => {
         //data.push(chunk)
          var json = JSON.parse(chunk);
          if(response.statusCode == 200){
            electronDialog.showMessageBox(this.win, {
              'type': 'info',
              'title': 'Info',
              'message': "Allotjament Editat",
              'buttons': []
          })
            e.sender.send("channelEdit-r",true) 
          }else{
            console.log(json.data)
            electronDialog.showMessageBox(this.win, {
              'type': 'error',
              'title': 'Error',
              'message': "Error en editar",
              'buttons': []
          })

          }
          
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })
    console.log(args[1])
    request.end(args[1])
  })
  ipcMain.on("channelIdCreate" , (e,args) => {
    e.sender.send("channelIdCreate-r", id)
  })

  ipcMain.on("channelCreate",(e,args) =>{
    console.log(args)
    const request = net.request({
      method: 'POST',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    request.on('response', (response) => {
      response.on('data', (chunk) => {
         //data.push(chunk)
          var json = JSON.parse(chunk);
          if(response.statusCode == 200){
            electronDialog.showMessageBox(this.win, {
              'type': 'info',
              'title': 'Info',
              'message': "Allotjament creat",
              'buttons': []
          })
            e.sender.send("channelCreate-r",json.data) 
          }else{
            console.log(json.data)
            electronDialog.showMessageBox(this.win, {
              'type': 'error',
              'title': 'Error',
              'message': "Error en crear",
              'buttons': []
          })
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
