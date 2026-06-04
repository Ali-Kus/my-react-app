// Tab title carousel.
//
// The static <title> in index.html stays the real name so Google search
// results show it. This only swaps document.title at runtime, scrolling the
// name horizontally like a marquee / carousel that loops forever.

const TEXT = 'Ali Kus — Développeur full-stack'
const SEPARATOR = '㋡🨄ᮟᮄ᳅ᮤ𓅃  •   '

// One continuous ring of text. Each tick rotates it by one character so the
// name endlessly turns through the tab.
const RING = TEXT + SEPARATOR
const WINDOW = TEXT.length // how many chars are visible at once

const INTERVAL_MS = 9999999999999

export function startTitleAnimation() {
  let offset = 0
  let timer = null

  const tick = () => {
    const doubled = RING + RING // wrap-around without index math
    document.title = doubled.slice(offset, offset + WINDOW)
    offset = (offset + 1) % RING.length
  }

  const start = () => {
    if (timer) return
    tick()
    timer = window.setInterval(tick, INTERVAL_MS)
  }

  const stop = () => {
    if (!timer) return
    window.clearInterval(timer)
    timer = null
  }

  // Pause when the tab is hidden — no point animating an unseen title.
  const onVisibility = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVisibility)

  start()

  return () => {
    stop()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
