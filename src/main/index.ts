/*
 * @Author: Reny
 * @Date: 2023-12-27 10:10:15
 * @LastEditors: Solitario119 1412385393@qq.com
 * @LastEditTime: 2023-12-27 12:31:59
 * @FilePath: \electron-template\src\main\index.ts
 * @Description:
 */
import { app, shell, BrowserWindow ,ipcMain} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { WindowParam } from './type'
import { WindowPool } from './windowPool'
import icon from '../../resources/icon.png?asset'
import log from 'electron-log/main' // error, warn, info, verbose, debug, silly
import { initLogs } from './services/log'
import { ConfigWindow } from './configWindow'
global.logHome = 'log'
global.logLevel = 'debug'
initLogs()



let mainWindow
let subWindosMaps = {};
let subWindow;
function createWindow(): void {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools({
        mode: 'undocked',
        activate: true
      })
    }
  })

   // 主窗口要关闭的时候 关闭所有未关闭的子窗口
   mainWindow.on('close',(_a,_b)=>{
    console.log("close 事件")
    for(var subWin of WindowPool.items){
         subWin.win.destroy();
    }
    WindowPool.items = []
    mainWindow = null
})

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  console.log(process.env['ELECTRON_RENDERER_URL'])
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log('index')
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  // //Create the second browser window
  const secondWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    secondWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/status1.html')
  } else {
    secondWindow.loadFile(join(__dirname, '../renderer/status1.html'))
  }

  // Create the third browser window
  const thirdWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    thirdWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/status2.html')
  } else {
    thirdWindow.loadFile(join(__dirname, '../renderer/status2.html'))
  }
}

//创建子窗口
// ipcMain.on('newWindow',(_event,newWindow)=>{
//   console.log('2',newWindow.path)
//   console.log('1',newWindow.path.split("/")[newWindow.path.split("/").length-1])
//   subWindow = new BrowserWindow({
//       height: 400,
//       width: 400,
//       useContentSize: true,
//       show: false,
//       title:newWindow.name,
//       webPreferences: {
//         preload: join(__dirname, '../preload/index.js'),
//         sandbox: false
//       },
//       autoHideMenuBar:true,
//       // // frame: false, // 这样子窗口有头部 可以关闭和放大 缩小
//       // parent: mainWindow
//   })
//   if(newWindow.path=='/')
//   {
//       // console.log(winURL+"/#/sub") //开发和构件时路由方式不同，不能用这个
//   const modalPath = process.env.NODE_ENV === 'development'
//   ? process.env['ELECTRON_RENDERER_URL']+'/#/sub/' + newWindow.name
//   : `file://${__dirname}/index.html#sub/${newWindow.name}`
//   console.log(modalPath)
//   subWindow.loadURL(modalPath);
  
 
//   subWindow.on('ready-to-show',()=>{
//       subWindow.setTitle(newWindow.name)
//       subWindow.show();
//       // 缓存这个 subWindow到map里
//       subWindosMaps[newWindow.name] = subWindow;
//       console.log(newWindow.name.replace('subwindow',''))
//       mainWindow.webContents.send('subwindow-ready',newWindow.name.replace('subwindow',''))
     
//       if (process.env.NODE_ENV === 'development') {
//         subWindow.webContents.openDevTools({
//           mode: 'undocked',
//           activate: true
//         })
//       }
//   })

//   subWindow.on('focus', () => {
      
//   })

//   subWindow.on('closed', () => {
//       // 注销所有事件监听
//       subWindow.destroy();
//       mainWindow.webContents.send('subwindow-closed',newWindow.name.replace('subwindow',''))
//       mainWindow.send('subwindow-closed',{...newWindow.name,msg:"这是子窗口关闭时发来的消息"});
//       delete subWindosMaps[newWindow.name]
//       console.log('closed' + newWindow.name)
//   })
//   }
//   else{
//       // console.log(winURL+"/#/sub") //开发和构件时路由方式不同，不能用这个
//   const modalPath = process.env.NODE_ENV === 'development'
//   ?process.env['ELECTRON_RENDERER_URL']+'/#/sub/'+ newWindow.path.split('/')[newWindow.path.split("/").length-1] +'/subsub/'+ newWindow.name
//   : `file://${__dirname}/index.html#sub/${newWindow.path.split('/')[newWindow.path.split("/").length-1]}/subsub/${newWindow.name}`
//   console.log(modalPath)
//   subWindow.loadURL(modalPath);
  
 
//   subWindow.on('ready-to-show',()=>{
//       subWindow.setTitle(newWindow.name)
//       subWindow.show();
//       // 缓存这个 subWindow到map里
//       subWindosMaps[newWindow.path.split("/")[newWindow.path.split("/").length-1]][newWindow.name] = subWindow;
//   })

//   subWindow.on('focus', () => {
      
//   })

//   subWindow.on('closed', () => {
//       // 注销所有事件监听
//       subWindow.destroy();
//       mainWindow.send('subwindow-closed',{...newWindow.name,msg:"这是子窗口关闭时发来的消息"});
//       delete subWindosMaps[newWindow.name]
//       console.log('closed' + newWindow.name)
//   })
//   }

// })
ipcMain.on('loadWindow', (_event, data) => {
  console.log('1',data)
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  const windowPool = new WindowPool()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
