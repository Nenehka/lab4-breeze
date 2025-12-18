// resources/js/app.js

require('./bootstrap');
import * as bootstrap from 'bootstrap';

// Иконки соцсетей и логотип (оставляем как было)
import vkIcon from './img/vk.png';
import tgIcon from './img/tg.png';
import wikiIcon from './img/wiki.png';
import logo from './img/logo.png';

// Элементы DOM
const cards = document.querySelectorAll('.cards-row .card');
const modalEl = document.getElementById('rammsteinModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('rammsteinModalLabel');
const modalText = document.getElementById('modalText');

const loginButton = document.getElementById('loginButton');
const toastEl = document.getElementById('loginToast');

// Инициализация Bootstrap
let bootstrapModal = modalEl ? new bootstrap.Modal(modalEl) : null;
let loginToast = toastEl ? new bootstrap.Toast(toastEl, { delay: 3000 }) : null;

// Данные для первых 5 карточек (как в лабе‑2)
// const cardData = [
//   {
//     title: "Альбом Sehnsucht",
//     text: "Второй альбом группы Rammstein, название с нем. Тоска",
//     popover: "Год выпуска: 1997"
//   },
//   {
//     title: "Альбом Mutter",
//     text: "Третий студийный альбом группы Rammstein, название с нем. Мать",
//     popover: "Год выпуска: 2001"
//   },
//   {
//     title: "Альбом Reise, Reise",
//     text: "Четвёртый студийный альбом группы Rammstein, название - начальные слова сигнала к подъёму на немецком флоте, с нем. В путь-дорогу!",
//     popover: "Год выпуска: 2004"
//   },
//   {
//     title: "Альбом Rosenrot",
//     text: "Пятый студийный альбом группы Rammstein, название с нем. Розово-красный, Розочка",
//     popover: "Год выпуска: 2005"
//   },
//   {
//     title: "Альбом Rammstein",
//     text: "Седьмой студийный альбом группы Rammstein, безымянный. В народе этот альбом получил название Спичка из-за его обложки",
//     popover: "Год выпуска: 2019"
//   }
// ];

function openModal(index) {
  const card = cards[index];
  if (!card || !bootstrapModal) return;

  // Картинка из карточки
  const cover = card.querySelector('.card-img-top');
  if (cover) {
    modalImage.src = cover.src;
    modalImage.alt = cover.alt || '';
  } else {
    modalImage.removeAttribute('src');
    modalImage.alt = '';
  }

  // Данные из data-атрибутов
  const title = card.dataset.title || '';
  const description = card.dataset.description || '';
  const release = card.dataset.release || '';

  modalTitle.textContent = title;

  let html = '';
  if (description) {
    html += description;
  }
  if (release) {
    html += ` <span class="popover-text"
                     data-bs-toggle="popover"
                     title="Дата выхода альбома"
                     data-bs-content="Год выпуска: ${release}">(ℹ)</span>`;
  }

  modalText.innerHTML = html;

  // Инициализация поповера
  const popoverTrigger = modalEl.querySelector('.popover-text');
  if (popoverTrigger) {
    new bootstrap.Popover(popoverTrigger, {
      trigger: 'hover',
      placement: 'top'
    });
  }

  modalEl.dataset.currentIndex = index;
  bootstrapModal.show();
}

// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛКИ
// function openModal(index) {
//   const card = cards[index];
//   if (!card || !bootstrapModal) return;

//   // Картинка берётся ИЗ КАРТОЧКИ, а не из массива
//   const cover = card.querySelector('.card-img-top');
//   if (cover) {
//     modalImage.src = cover.src;
//     modalImage.alt = cover.alt || '';
//   } else {
//     modalImage.removeAttribute('src');
//     modalImage.alt = '';
//   }

//   // Данные: сначала пытаемся взять из cardData (для первых 5),
//   // иначе — из самой карточки, чтобы не падало на новых альбомах.
//   const data = cardData[index] || {
//     title: card.querySelector('.card-title')?.textContent?.trim() || '',
//     text:  card.querySelector('.card-text')?.textContent?.trim() || '',
//     popover: ''
//   };

//   modalTitle.textContent = data.title || '';

//   modalText.innerHTML = data.text
//     ? `${data.text} ${
//         data.popover
//           ? `<span class="popover-text" data-bs-toggle="popover" title="Дата выхода альбома" data-bs-content="${data.popover}">(ℹ)</span>`
//           : ''
//       }`
//     : '';

//   // Инициализация поповера в модалке
//   const popoverTrigger = modalEl.querySelector('.popover-text');
//   if (popoverTrigger) {
//     new bootstrap.Popover(popoverTrigger, {
//       trigger: 'hover',
//       placement: 'top'
//     });
//   }

//   modalEl.dataset.currentIndex = index;
//   bootstrapModal.show();
// }

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Иконки соцсетей и логотип
  const wikiImg = document.querySelector('.socials a:nth-child(1) img');
  const vkImg   = document.querySelector('.socials a:nth-child(2) img');
  const tgImg   = document.querySelector('.socials a:nth-child(3) img');
  const logoImg = document.querySelector('.navbar-brand .navbar-logo');

  if (wikiImg) wikiImg.src = wikiIcon;
  if (vkImg)   vkImg.src = vkIcon;
  if (tgImg)   tgImg.src = tgIcon;
  if (logoImg) logoImg.src = logo;

  // ВАЖНО: БОЛЬШЕ НЕ ТРОГАЕМ src у .card-img-top!
  // Laravel сам подставляет путь к картинке из БД/хранилища.

  // Кнопки "Подробнее" на карточках
  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index, 10);
      openModal(index);
    });
  });

  // Инициализация поповеров на странице
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(el => new bootstrap.Popover(el));

  // Кнопка "Войти" → Toast
  if (loginButton && loginToast) {
    loginButton.addEventListener('click', () => loginToast.show());
  }
});

// Переключение стрелками
document.addEventListener('keydown', (e) => {
  if (!modalEl || !modalEl.classList.contains('show')) return;

  let currentIndex = parseInt(modalEl.dataset.currentIndex || 0);

  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % cards.length;
    openModal(currentIndex);
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    openModal(currentIndex);
  }
});