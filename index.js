const puppeteer = require('puppeteer-core')
const config = require('./config')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: '/usr/bin/google-chrome-stable',
  })
  let page = await browser.newPage()
  // await page.goto("https://sso.ku.ac.th/nidp//app/login?target=https%3A%2F%2Fsso.ku.ac.th%2Fnidp%2Foauth%2Fnam%2Fauthz%3Fscope%3Dkuinfo%26response_type%3Dcode%26redirect_uri%3Dhttps%3A%2F%2Flogin4.ku.ac.th%26client_id%3D338c51ed-c0ea-4af0-8cd3-c8585dba8917")

  await page.goto('https://login.ku.ac.th/')

  const id = config.id
  const password = config.password

  while (true) {
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
      continue
    }
  }

  await page.waitForNavigation()
  await page.evaluate(() => {
    document.querySelector('.btn.btn-success.btn-xs').click()
  })

  console.log('login success!')
  process.exit(1)
})()
