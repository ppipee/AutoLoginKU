## KU Auto Login

[Login KU](https://login.ku.th)

## Step

### 1. install package

`yarn` or `npm i`

### 2. Setup config

- run makefile and replace NONTRI_ID with your NONTRI_ID and PW with your NONTRI_PASSWORD for create and setup config file

```
make init-auth ID=${NONTRI_ID} PW=${NONTRI_PW} BROWSER_PATH=${BROWSER_PATH} URL=${LOGIN_URL}
```

- BROWSER_PATH will use "/usr/bin/google-chrome-stable" if you don't set ${BROWSER_PATH}
- LOGIN_URL will use "login.ku.ac.th" if you don't set ${URL}

or

- create file config.js
- export object that include "id" ,"password" and "browserPath" (for execute browser)

#### example

```javascript
module.exports = {
  id: 'username',
  password: 'password',
  browserPath: '/usr/bin/google-chrome-stable',
  url: 'login.ku.ac.th',
}
```

### 3. Complier

```
node index.js
```
