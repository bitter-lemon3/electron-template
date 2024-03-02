import { BrowserWindow, ipcMain } from 'electron'
import{ WindowParam } from './type'
import{ ConfigWindow } from './configWindow'
class WindowPoolItem{
    win: BrowserWindow;
    param?: WindowParam
    constructor(){
      let config = new ConfigWindow();
      this.win = new BrowserWindow(config);
      this.initEvent()
      this.loadUrl(this.win, '/blank')
    }
    loadUrl(win:BrowserWindow,url:string){
      const modalPath = process.env.NODE_ENV === 'development'
      ?process.env['ELECTRON_RENDERER_URL']+'/#/sub/'+ url
      : `file://${__dirname}/index.html#sub/${url}`
      win.loadURL(modalPath)
    }
    use(param: WindowParam) {
      this.effectParam(param)
      this.loadUrl(this.win, param.url)
    }
    effectParam(param: WindowParam){
      this.param = param
      this.win.setSize(param.width, param.height)
      this.win.setTitle(param.name)
      this.win.show()
    }
    initEvent() {
        this.win.on('close', () => {
          console.log("close",this.param?.url.split('/').length==1)
          for (let i = 0; i < WindowPool.items.length; i++) {
            console.log('1',WindowPool.items[i].param?.url)
             if (WindowPool.items[i].param?.url === this.param?.url) {
               WindowPool.items.splice(i, 1)
             }
          }
          if(this.param?.url.split('/').length==1){
            for (let i = 0; i < WindowPool.items.length; i++){
              if (WindowPool.items[i].param?.url.split('/')[0] === this.param?.url) {
                WindowPool.items[i].win.destroy()
                WindowPool.items.splice(i, 1)
            }
          }
          
          
        }
      })
    }
  }
 export class WindowPool{
    static items:WindowPoolItem[] = []
    constructor(){
      for (let i = 0; i < 3; i++) {
        WindowPool.items.push(new WindowPoolItem())
      }
      ipcMain.on('loadWindow', (_e, data) => {
        console.log('data',data)
        if (this.isWindowInUse(data)) return
        this.picAndUse(data)
      })
    }
    isWindowInUse(param: WindowParam) {
      let item = WindowPool.items.find((v) => v.param?.url === param.url)
      if (!item) return false
      item.effectParam(param)
      return true
    }
    picAndUse(param: WindowParam) {
      let item = WindowPool.items.find((v) => !v.param) //没有param属性的，就是没用过的
      item!.use(param)
      WindowPool.items.push(new WindowPoolItem())
    }
  }
