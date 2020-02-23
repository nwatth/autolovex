import './content-style.css'

let tinderBot = (() => {
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
    }
  }
})()

let autoSwiper = (() => {
  const appId = 'autolovex-app'
  const delayedTime = 1000

  let tinderBot = null
  let botPanel = null
  let isRunning = false

  return {
    registerEvents: () => {
      botPanel.querySelector('.autolovex-action').onclick = (e) => {
        e.preventDefault()
        autoSwiper.toggle()
      }
    },
    start: () => {
      isRunning = true
      autoSwiper.run()
    },
    stop: () => {
      isRunning = false
    },
    toggle: () => {
      if(isRunning) {
        autoSwiper.stop()
      } else {
        autoSwiper.start()
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

        setTimeout(autoSwiper.run, delayedTime)
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
        autoSwiper.registerEvents()
      }, delayedTime)
    }
  }
})()

autoSwiper.init(tinderBot)
