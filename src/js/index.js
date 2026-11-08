import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/swiper.css'
import 'swiper/css/pagination'
import '../scss/style.scss'

const menuButton = document.querySelector('.header__button--menu')
const closeButton = document.querySelector('.sidebar__button--close')
const sidebar = document.querySelector('.sidebar')

if (menuButton && sidebar) {
  menuButton.addEventListener('click', () => {
    sidebar.classList.add('sidebar--open')
  })
}

if (closeButton && sidebar) {
  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('sidebar--open')
  })
}

const servicesText = document.querySelector('.services__text')
const servicesMore = document.querySelector('.services__more')

if (servicesText && servicesMore) {
const buttonText = servicesMore.querySelector('span')

servicesMore.setAttribute('aria-expanded', 'false')

servicesMore.addEventListener('click', () => {
const isExpanded =
servicesMore.getAttribute('aria-expanded') === 'true'

servicesText.classList.toggle(
  'services__text--expanded',
  !isExpanded
)

servicesMore.setAttribute(
  'aria-expanded',
  String(!isExpanded)
)

servicesMore.classList.toggle('is-expanded', !isExpanded)

if (buttonText) {
  buttonText.textContent = isExpanded
    ? 'Читать далее'
    : 'Скрыть'
}

})
}


const showMoreButtons = document.querySelectorAll(
'.brands__more, .equipment__more'
)

showMoreButtons.forEach((button) => {
button.addEventListener('click', () => {
const section = button.closest('.brands, .equipment')

if (!section) return

const isBrands = section.classList.contains('brands')

const isExpanded = isBrands
  ? section.querySelector('.brands__list').classList.toggle('is-expanded')
  : section.classList.toggle('list--expanded')


button.classList.toggle('is-expanded', isExpanded)


const textNode = Array.from(button.childNodes).find(
  (node) => node.nodeType === Node.TEXT_NODE
)


if (textNode) {
  textNode.textContent = isExpanded
    ? 'Скрыть '
    : 'Показать все '
}

// Обновляем доступное состояние
button.setAttribute('aria-expanded', String(isExpanded))

})
})


const mobileMediaQuery = window.matchMedia('(max-width: 767px)')

let swipers = []

function initSwipers() {
  if (!mobileMediaQuery.matches) return

  const swiperElements = document.querySelectorAll(
    '.brands__list.swiper, .equipment__list.swiper, .prices__list.swiper'
  )

  swiperElements.forEach((element) => {
    if (element.swiper) return

    const pagination = element.querySelector('.swiper-pagination')
    const isEquipment = element.classList.contains('equipment__list')
    const isPrices = element.classList.contains('prices__list')

    const swiper = new Swiper(element, {
      modules: [Pagination],

      slidesPerView: isEquipment || isPrices ? 'auto' : 1,

      spaceBetween: isEquipment ? 16 : 16,

      slidesOffsetBefore: 0,
      slidesOffsetAfter: 16,

      watchOverflow: true,

      pagination: pagination
        ? {
            el: pagination,
            clickable: true
          }
        : undefined
    })

    swipers.push(swiper)
  })
}

function destroySwipers() {
  swipers.forEach((swiper) => {
    swiper.destroy(true, true)
  })

  swipers = []
}

function updateSwiper() {
  if (mobileMediaQuery.matches) {
    if (swipers.length === 0) {
      initSwipers()
    }
  } else {
    destroySwipers()
  }
}

updateSwiper()

mobileMediaQuery.addEventListener('change', updateSwiper)
