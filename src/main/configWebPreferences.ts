import { WebPreferences } from "electron";
import { join } from 'path'
export class ConfigWebPreferences implements WebPreferences {
    nodeIntegration = true
    devTools = true
    webSecurity = false
    nodeIntegrationInSubFrames = true
    nodeIntegrationInWorker = true
    worldSafeExecuteJavaScript = true
    contextIsolation = false
    allowRunningInsecureContent = true
    center = true
    webgl = false
    disableHtmlFullscreenWindowResize = true
    enableWebSQL = false
    spellcheck = false
    preload = join(__dirname, '../preload/index.js')
    sandbox = false
  }