const $ = element => document.querySelector(element)
const API= 'https://api.adviceslip.com/advice'

const $id = $('.advice__id')
const $typing = $('.advice__text typing-effect')
const $btn = $('.btn-generator')

async function fetchAdvice() {
  const response = await fetch(API)
  const {slip} = await response.json()
  const { id, advice } = slip
  return {id, advice}
}

$typing.addEventListener('typing:complete', () => {
    $btn.classList.remove('busy')
    $btn.disabled= false
})

async function updateDOM() {
  $btn.classList.add('busy')
  $btn.disabled= true
  const { id, advice } = await fetchAdvice()
  $id.textContent = `ADVICE #${id}`
  speakAdvice(advice)
  const lines = JSON.stringify([advice])
  $typing.setAttribute('data-lines', lines)
}

function speakAdvice(advice) {
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(advice)
  utterance.rate = .9
  utterance.lang = 'en-GB'
  const voices = speechSynthesis.getVoices()
  const voice = voices.find(voice => voice.name === "Google UK English Male")
  utterance.voice = voice
  utterance.pitch = .7
  speechSynthesis.speak(utterance)
}

updateDOM()

$btn.addEventListener('click', e => {
  updateDOM()
  $btn.classList.toggle('busy', true)
})