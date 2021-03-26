const puppeteer = require('puppeteer-core')
const config = require('./config')

const TTL = 10
const DEFAULT_BROWSER_PATH = '/usr/bin/google-chrome-stable'
const LOGIN_URL = 'https://login.ku.ac.th/'

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: config.browserPath || DEFAULT_BROWSER_PATH,
    args: ['--fast-start', '--disable-extensions', '--no-sandbox'],
    ignoreHTTPSErrors: true,
  })
  let page = await browser.newPage()

  await page.goto(config.url || LOGIN_URL)

  const id = config.id
  const password = config.password

  for (let i = 0; i < TTL; i++) {
    try {
      await page.evaluate(
        (id, password) => {
          document.querySelector('#username').value = id
          document.querySelector('#password').value = password
          document.querySelector('#submit').click()
        },
        id,
        password
      )
      break
    } catch (e) {
      console.log('#error', e)
      continue
    }document
  }

  await page.waitForNavigation()

  for (let i = 0; i < TTL; i++) {
    try {
      await page.evaluate(() => {
        if (document.querySelector('#submit')) {
          document.querySelector('#submit').click()
        } else {
          document.querySelector('.btn.btn-success.btn-xs').click()
        }
      })

      break
    } catch (e) {
      console.log('#error', e)
      continue
    }
  }

  console.log('login success!')

  await page.goto('https://info.ku.ac.th/keepalive')
  console.log('keep alive!')

  process.exit(1)
})()
