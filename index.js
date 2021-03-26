const puppeteer = require('puppeteer-core')
const config = require('./config')

const TTL = 10

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: config.browserPath,
    args: ['--fast-start', '--disable-extensions', '--no-sandbox'],
    ignoreHTTPSErrors: true,
  })
  let page = await browser.newPage()

  await page.goto('https://login.ku.ac.th/')

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
    }
  }

  await page.waitForNavigation()

  for (let i = 0; i < TTL; i++) {
    try {
      await page.evaluate(() => {
        if (document.querySelector('#submit')) {
          document.document.querySelector('#submit').click()
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
