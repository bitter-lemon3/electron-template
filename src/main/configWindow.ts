import { BrowserWindowConstructorOptions } from 'electron'
import { ConfigWebPreferences } from './configWebPreferences'
export class ConfigWindow implements BrowserWindowConstructorOptions {
  width?: number
  height?: number
  maximizable = true
  resizable = true
  center = true
  x?: number
  y?: number
  alwaysOnTop?: boolean
  skipTaskbar?: boolean
  frame = true
  show = false
  webPreferences = new ConfigWebPreferences()
  nodeIntegrationInSubFrames = true
  nativeWindowOpen = true
  modalable = false
  parent?: any
  movable = true
  thickFrame = true
  minHeight?: number
  minWidth?: number
  autoHideMenuBar = true
}