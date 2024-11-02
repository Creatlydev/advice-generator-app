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

async function updateDOM() {
  $btn.classList.add('busy')
  const { id, advice } = await fetchAdvice()
  $id.textContent = `ADVICE #${id}`
  const lines = JSON.stringify([advice])
  $typing.setAttribute('data-lines', lines)
  $btn.classList.remove('busy')
}

updateDOM()

$btn.addEventListener('click', e => {
  updateDOM()
  $btn.classList.toggle('busy', true)
})