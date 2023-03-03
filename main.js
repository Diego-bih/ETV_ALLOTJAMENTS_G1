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
    },
    minWidth:390,
    minHeight: 620
    
    })
    win.maximize()
    win.loadFile('./html/home.html')
    Menu.setApplicationMenu(mainMenu);
    //win.webContents.openDevTools()
    module.exports = {
        win
    }

    //Handler to open child windows from renderer. Which are gonna be modal.
    win.webContents.setWindowOpenHandler(() => {
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
    })
  }
  
  ipcMain.on('ch1', (event, args) => {
    const request = net.request({
      url: 'http://etv.dawpaucasesnoves.com/etvServidor/public/api/comentaris',
      method: 'GET',
    })
    request.on('response', (response) => {
      ress = "";
      console.log(`STATUS: ${response.statusCode}`)
      response.on('data', async (chunk) => {
        ress += chunk;
      })
      response.on('end', () => {
        event.sender.send('ch2', ress);
      })
    })
    request.end()
  },)
  
  ipcMain.on('ch3', (event, args) => {
    const request = net.request({
      url: 'http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments',
      method: 'GET',
    })
    request.on('response', (response) => {
      ress = "";
      console.log(`STATUS: ${response.statusCode}`)
      response.on('data', (chunk) => {
        ress += chunk;
      })
      response.on('end', () => {
        event.sender.send('ch4', ress);
      })
    })
    request.end()
  },)

  //ipcMain that shows a dialog when the user logs in.
  ipcMain.on("channelshowlogged", (e,args) => {
    electronDialog.showMessageBox(this.win, {
      'type': 'info',
      'title': 'Logged In',
      'message': "Successfully logged!",
      'buttons': []
  })
  })

  //ipcMain that makes the api request to the endpoint that contains all the approved accomodations photos
  ipcMain.on("channelInfo",(e,args) =>{
    var res = ''
    const request = net.request({
      method: 'GET',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/fotos'
    })

    request.on('response', (response) => {
      response.on('data', (chunk) => {
        //Since the response contains large amount of data. The chunk will be appended on a string and used on the end event
          res += chunk
      })
      response.on('end', () => {
        //The data must be parsed
        var json = JSON.parse(res);
        //The data is sended to the renderer
        e.sender.send("channelInfo-r1",json.data) 
        console.log('No more data in response.')
      })
    })

    request.end()
  })
  
  //Variables that are gonna be initialized i
  var token;
  var id;
  var win2

  //ipcMain that makes the api request to the endpoint that is gonna post the information of the user's login
  ipcMain.on("channelPost",(e,args) =>{
    console.log(args)
    const request =  net.request({
      method: 'POST',
      url: 'http://etv.dawpaucasesnoves.com/etvServidor/public/api/login',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //request.write(args)
    request.on('response',(response) => {
      console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
        //console.log(json.data.token)
        var json =  JSON.parse(chunk);
        //If the response is 200 means the user is logged
        if(response.statusCode == 200){
        //We assign the token and id of the user in the global variables
        token = json.data.token;
        id = json.data.usuari.id;
          console.log(json.data.token)
           // Get default menu
          const menu = Menu.getApplicationMenu();
          //Menu options as variables
          var dashboard = {
            label: 'Dashboard',
            click: () => {
              const { win } = require('./main.js')
              win.setMinimumSize(390, 620)
              win.loadFile('./html/graph.html')
            },
            role: 'dashboard'
          }
          var map = {
            label: 'Map',
            id: 'map'
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
                      width:1000,
                      height: 1000,
                      maxWidth:1000,
                      maxHeight:1000,
                      minWidth:320,
                      minHeight:200,
                      center:true,
                      parent:win,
                      modal:true,
                      autoHideMenuBar:true
                   })
                  win2.loadFile('./html/create.html')
                  //win2.webContents.openDevTools()
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
                //Dialog with promise when users logs out
                electronDialog.showMessageBox(this.win, {
                  'type': 'question',
                  'title': 'Confirmation',
                  'message': "Are you sure?",
                  'buttons': [
                      'Yes',
                      'No'
                  ]
              })
                  // Dialog returns a promise so we handle it correctly
                  .then((result) => {
                      // Bail if the user pressed "No" or escaped (ESC) from the dialog box
                      if (result.response !== 0) { return; }
          
                      // If the result is yes we eliminate the menu options that are only available to the logged user
                      if (result.response === 0) {
                        const items = menu?.items.filter((item) => item.role !== 'logout' && item.role !== 'map' && item.role !== 'dashboard' && item.role !== 'admin')          
                        Menu.setApplicationMenu(Menu.buildFromTemplate(items))
                        win.loadFile('./html/home.html')
                        //Dialog as a confirmation when the user logs out
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
          
          //When logged in we eliminate the login option from the menu
          const items = menu?.items.filter((item) => item.role !== 'login')
          
          //And push the new menu options
          items.push(map)
          items.push(dashboard)
          items.push(admin)
          items.push(logout)

          const tempMenu = Menu.buildFromTemplate(items);
          itemList = tempMenu.getMenuItemById('map')
          itemList.click = () => {
           createMap()
          }
          

          Menu.setApplicationMenu(tempMenu)
          
          //Contact the renderer to handle the login dialog that is gonna be showed after being logged
          e.sender.send("channelPost-r", true)

      }
        else if (response.statusCode == 400){
          //Dialog when the credentials are wrong
          electronDialog.showMessageBox(this.win, {
            'type': 'error',
            'title': 'Error',
            'message': "Credencials incorrectes, torna a intentar-ho",
            'buttons': []
        })
          e.sender.send("channelPost-r", false)      
        }
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })
    request.end(args)
  })

  //ipcMain that makes the api request to the endpoint that contains all the accomodations information
  ipcMain.on("channelList", (e,args) =>{
    console.log(args)
    console.log(token)
    console.log(id)
    var res = ''
    const request = net.request({
      method: 'GET',
      url:'http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments'
    })

    request.on('response', (response) => {
     response.on('data', (chunk) => {
        //data.push(chunk)
        res += chunk
        
      })
      response.on('end', () => {
        var json = JSON.parse(res)
        //We send the renderer the user's id and the data
        e.sender.send("channelList-r1",[id,json.data])
        console.log('No more data in response.')
      })
    })

    request.end()
  })

  //ipcMain that makes the api request to the endpoint that is gonna post the information of the edited accomodation
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
      console.log(`STATUS: ${response.statusCode}`)
      response.on('data', (chunk) => {
         //data.push(chunk)
          var json = JSON.parse(chunk);
          if(response.statusCode == 200){
            //Dialog when the accomodation is succesfully edited
            electronDialog.showMessageBox(this.win, {
              'type': 'info',
              'title': 'Info',
              'message': "Allotjament Editat",
              'buttons': []
          })
            //We send to the renderer a confirmation that the accomodation is edited
            e.sender.send("channelEdit-r",true) 
          }else{
            //An error is thrown in the api while editing the accomodation, so we handle the returned information
            var data =  json.data
            var s = '';
            //We get the information from the api's json and append it to a string
            Object.keys(data).forEach(function(k){
              var t = data[k];
              s += t + '\n'
          });
          //Dialog that shows that there is an error while editing. Is gonna show where it went wrong.
            electronDialog.showMessageBox(this.win, {
              'type': 'error',
              'title': 'Error',
              'message': "Error en editar: " + '\n' + s,
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

  //ipcMain that is gonna send the user's id
  ipcMain.on("channelIdCreate" , (e,args) => {
    e.sender.send("channelIdCreate-r", id)
  })

  //ipcMain that makes the api request to the endpoint that is gonna post the information of the created accomodation
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
            //Dialog when the accomodation is succesfully created
            electronDialog.showMessageBox(this.win, {
              'type': 'info',
              'title': 'Info',
              'message': "Allotjament creat",
              'buttons': []
          })
            e.sender.send("channelCreate-r",json.data) 
          }else{
            //An error is thrown in the api while creating the accomodation, so we handle the returned information
            var data =  json.data
            var s = '';
            Object.keys(data).forEach(function(k){
              var t = data[k];
              s += t + '\n'
          });
          //Dialog that shows that there is an error while creating. Is gonna show where it went wrong.
            electronDialog.showMessageBox(this.win, {
              'type': 'error',
              'title': 'Error',
              'message': "Error en crear: " + '\n' + s,
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
  app.whenReady().then(() => {
      createWindow() 
  })

  app.on('browser-window-created', (_, window) => {
    require("@electron/remote/main").enable(window.webContents)
})


let mapWin
let wcMap
//new window for room
async function createMap() {
  mapWin = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
    width: 1200, height: 800,
    minWidth: 600, minHeight: 400,
    center: true,
    parent: win,
    modal: true,
    show: false,
    autoHideMenuBar: true
  })
  await mapWin.loadFile('./html/map.html')

  mapWin.once("ready-to-show", () => {
    mapWin.show()
  })

  wcMap = mapWin.webContents
  console.log(wcMap.session.getStoragePath())
  wcMap.openDevTools()

}


let roomWin
let wcNew
//new window for room
async function createHabitacioWin() {
  roomWin = new BrowserWindow({
    width: 1200, height: 800,
    minWidth: 300, minHeight: 150,
    parent: win,
    modal: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    show: false,
    autoHideMenuBar: true
  })
  await roomWin.loadFile("./html/hotel.html")

  wcNew = roomWin.webContents
  wcNew.openDevTools()

}

ipcMain.on("request1", async (e, id) => {
  await createHabitacioWin()
  roomWin.show()

  const request = net.request({
    method: 'GET',
    url: `http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments/${id}`
  })

  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)

    response.on("data", (chunk) => {
      var json = JSON.parse(chunk);
      console.log(json)
      roomWin.send("request-res", json)

    })

    response.on('end', () => {
      console.log('No more data in response2.')
    })
  })
  request.end()
  console.log("sale")

})

  //Disable security warning showed on console.log
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';