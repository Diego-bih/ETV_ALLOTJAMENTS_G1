const { app, Menu, BrowserWindow} = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  //Label Home which is gonna load the home html.
  {
    label: 'Home',
    click: () => {
        const {win} = require('./main.js')
        win.setMinimumSize(390,620)
        win.loadFile('./html/home.html')
    },
    accelerator: "Control+h"
  },
  {
    label: 'Dashboard'

  },
  {
    label: 'Map'

  },

  {
    label:"Login",
        click: () => { 
          const {win} = require('./main.js')
          const win2 = new BrowserWindow({
            webPreferences:{
                contextIsolation: false,
                nodeIntegration:true
            },
              width: 700,
              height: 530,
              maxWidth:700,
              maxHeight:530,
              minWidth:320,
              center:true,
              parent:win,
              modal:true,
              autoHideMenuBar:true
           })
         win2.loadFile('./html/login.html')
         module.exports = {
          win2
         }
        },
        id:'login',
        role: "login"
  }
  
]


//Export of the template to implement in the main.
module.exports.mainMenu = Menu.buildFromTemplate(template) 
