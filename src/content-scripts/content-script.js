import './content-style.css'

let TinderBot = (() => {
  return {
    like: () => {
      let likeSelector = '.recsGamepad .recsGamepad__button[aria-label="Like"]'
      document.querySelector(likeSelector).click()
    },
    nope: () => {
      let nopeSelector = '.recsGamepad .recsGamepad__button[aria-label="Nope"]'
      document.querySelector(nopeSelector).click()
    },
    closeMatchPopup: () => {
      let MatchSelector = '#modal-manager-canvas a[aria-current="page"]'
      document.querySelector(MatchSelector).click()
    },
    init: () => {
      return TinderBot
    }
  }
})()

let AutoSwiper = (() => {
  const appId = 'autolovex-app'
  const delayedTime = 1000

  let tinderBot = null
  let botPanel = null
  let isRunning = false

  return {
    registerEvents: () => {
      botPanel.querySelector('.autolovex-action').onclick = (e) => {
        e.preventDefault()
        AutoSwiper.toggle()
      }
    },
    start: () => {
      isRunning = true
      AutoSwiper.run()
    },
    stop: () => {
      isRunning = false
    },
    toggle: () => {
      if(isRunning) {
        AutoSwiper.stop()
      } else {
        AutoSwiper.start()
      }
    },
    run: () => {
      if (isRunning) {
        try {
          tinderBot.closeMatchPopup()
        } catch (err) {
          if (Math.random() < .73) {
            tinderBot.like()
          } else {
            tinderBot.nope()
          }
        }

        setTimeout(AutoSwiper.run, delayedTime)
      }
    },
    init: (bot) => {
      tinderBot = bot
      if(!document.querySelector('#' + appId)) {
        var el = document.createElement('div')
        el.id = appId
        document.body.appendChild(el)
      }

      setTimeout(() => {
        botPanel = document.querySelector('#' + appId)
        botPanel.innerHTML = '<a class="autolovex-action">Run!</a>'
        AutoSwiper.registerEvents()
      }, delayedTime)

      return AutoSwiper
    }
  }
})()

let tinderBot = TinderBot.init()
AutoSwiper.init(tinderBot)
