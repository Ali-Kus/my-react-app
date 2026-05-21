import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Détection navigateur — posée AVANT le 1er paint pour que les règles CSS
// `.ua-chromium`, `.ua-firefox`, `.ua-safari` soient appliquées sans flash.
// ⚠️ UA-sniffing : à n'utiliser QUE pour des ajustements visuels non-critiques
// (comportement scroll-snap, blur particulier, etc.). Pour tout ce qui touche
// au comportement fonctionnel, préférer `@supports` ou la feature detection JS.
{
  const ua = navigator.userAgent
  const root = document.documentElement
  const isFirefox = /Firefox\//.test(ua)
  const isEdge = /Edg\//.test(ua)
  const isChromium = !isFirefox && /Chrome\//.test(ua) // inclut Chrome ET Edge
  const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !isEdge
  if (isFirefox) root.classList.add('ua-firefox')
  if (isChromium) root.classList.add('ua-chromium')
  if (isEdge) root.classList.add('ua-edge')
  if (isSafari) root.classList.add('ua-safari')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
