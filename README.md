## Auto Login KU

[Login KU](https://login.ku.th)

## How to

- install package

```
yarn or npm i
```

### Setup

- create file config.js
- export object that include "id" ,"password" and "browserPath" (for execute browser)

#### example

```javascript
module.exports = {
  id: 'username',
  password: 'password',
  browserPath: '/usr/bin/google-chrome-stable',
}
```

### Run

```
node index.js
```
