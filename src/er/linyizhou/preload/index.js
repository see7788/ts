// const { remote } = require('electron')
const config = require('../linyizhou/config')
const { replaceButton } = require('../linyizhou/main')
const storage = require('electron-localstorage')
const appState = storage.getItem('appState')
const dbData = appState.db[config.dhOrigin] || {}

console.log(appState)

window.onload = () => {
  const currURL = location.href
  if (currURL.includes(config.actionURL)) {
    replaceButton()
  }
}

// 采集动作
if (location.origin === config.dhOrigin) {
  registryButton()
}

function registryButton () {
  const alreadyRegistys = Object.keys(dbData)
  const timer = setInterval(() => {
    const rootElement = document.querySelectorAll('div.gitem')
    if (rootElement) {
      rootElement.forEach(i => {
        const linkElement = i.children[0].children[0]
        const id = linkElement.attributes.productid.value

        const button = document.createElement('button')
        button.innerText = '采到本地'
        button.type = 'button'
        button.style.position = 'absolute'
        button.style.top = '1em'
        button.style.left = '0'

        if (alreadyRegistys.includes(id)) {
          button.innerText = '已采集'
          button.disabled = true
        }

        button.onclick = () => extractHandler(i, id, linkElement, button)
        linkElement.parentElement.appendChild(button)
      })
      clearInterval(timer)
    }
  }, 500)
}

function extractHandler (root, id, link, button) {
  const pic = link.children[0].src
  const title = root.children[2].children[0].innerText
  const price = root.children[3].querySelector('li.price').children[0].innerText

  button.innerText = '已采集'
  button.disabled = true

  dbData[id] = {
    pic,
    title,
    price,
    url: link.href
  }

  appState.db[config.dhOrigin] = dbData

  storage.setItem('appState', appState)
}
