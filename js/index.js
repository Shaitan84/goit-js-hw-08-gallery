'use strict'

import images from './gallery-items.js';

const refs = {
	galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector(".lightbox__overlay"),
    lightboxContent: document.querySelector(".lightbox__content"),
    lightboxImage: document.querySelector(".lightbox__image"),
	btn: document.querySelector('[data-action="close-lightbox"]')
};
// Создаём список li
const createElem = (elem) => {
	const li = document.createElement('li');
	li.classList.add('gallery__item');
	createLink(elem, li);
	return li;
};
// Создаём список елементов галереи
const createImage = (elem, ulList) => {
	const { preview, original, description } = elem;
	const img = document.createElement('img');
	img.classList.add('gallery__image');
	img.dataset.source = original;
	img.src = preview;
	img.alt = description;
	ulList.appendChild(img);
};
// Создаём ссылку на оригинальную картинку
const createLink = (elem, ulList) => {
	const { original } = elem;
	const a = document.createElement('a');
	a.classList.add('gallery__link');
	a.href = original;
	createImage(elem, a);
	ulList.appendChild(a);
};
// Создаём массив картинок и распыляем его
const createListElements = (arr) => {
	const elements = arr.map((elem) => createElem(elem));
	refs.galleryList.append(...elements);
};
// console.dir(createListElements);
createListElements(images);

// открытие галереи и проверка нажатия на картинку
function onGalleryClick(event) {
	event.preventDefault();
	if (event.target.nodeName !== 'IMG') {
        return;
    }
		refs.lightbox.classList.add('is-open');
		refs.lightboxImage.src = event.target.dataset.source;
		refs.lightboxImage.alt = event.target.alt;
}
// Закрытие при нажатии на кнопку
function onGalleryClose(event) {
	if (event.target === refs.btn || event.target === refs.lightboxOverlay) {
		refs.lightboxImage.src = "";
		refs.lightboxImage.alt = "";
		refs.lightbox.classList.remove('is-open');
	}
}

// Закпытие при нажатии на Esc
function onCloseEsk(event) {
	if (event.code === "Escape") {
		refs.lightboxImage.src = "";
		refs.lightboxImage.alt = "";
		refs.lightbox.classList.remove('is-open');
	}
}


refs.galleryList.addEventListener('click', onGalleryClick);
refs.btn.addEventListener('click', onGalleryClose);
window.addEventListener("keydown", onCloseEsk);