import puppeteer from 'puppeteer'
import path from 'path'
import { scripts } from '../../package.json'
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const extensionPath = path.join(__dirname, '../../dist')

describe('build & install', () => {
  test('it builds the extension', async () => {
    const { stderr } = await exec(scripts.dist)
    expect(stderr).toBeFalsy()
  }, 15000)

  test('it installs the extension', async () => {
    const options = {
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
      ]
    }
    const browser = await puppeteer.launch(options)
    expect(browser).toBeTruthy()
    await browser.close()
  }, 5000)
})
