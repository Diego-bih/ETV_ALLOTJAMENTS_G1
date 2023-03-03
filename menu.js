const { app, Menu, BrowserWindow } = require('electron')

const isMac = process.platform === 'darwin'

//Template that contains some menu options
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
  {
    label: 'Home',
    click: () => {
      const { win } = require('./main.js')
      win.setMinimumSize(390, 620)
      win.loadFile('./html/home.html')
    },
    accelerator: "Control+h"
  },
  {
    label: "Login",
    click: () => {
      const { win } = require('./main.js')
      const win2 = new BrowserWindow({
        webPreferences: {
          contextIsolation: false,
          nodeIntegration: true
        },
        width: 700,
        height: 430,
        maxWidth: 700,
        maxHeight: 430,
        minWidth: 320,
        minHeight: 250,
        center: true,
        parent: win,
        modal: true,
        autoHideMenuBar: true
      })
      win2.loadFile('./html/login.html')
      module.exports = {
        win2
      }
    },
    id: 'login',
    role: "login"
  }
]


//Export of the template to implement in the main.
module.exports.mainMenu = Menu.buildFromTemplate(template) 
