import { doChoise} from './api-system';
import { anserError, anserWarning, cleanerfotoTotalLength, anserChoiseError} from './notification';
import { dissActiveBtnLoadMore } from './switch-button';
import { clearPhotoContainerAndInputValue } from './cleaner';
import { renderPhoto } from './renderihg-and-creating-gallery';
export {refs, fotoTotal, page, processingPhotoIsScroll, processingPhotoIsButton, radioScroll, radioBtn};
let radioScroll = false
let radioBtn = false
let page = 1;
let searchText = '';
let fotoTotal = 0;

const refs = {
  formSearch: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  btnSubmit: document.querySelector("[type='submit']"),
  btnLoadMore: document.querySelector('.load-more'),
  choiseScroll: document.querySelector(".scroll"),
  choiseBtn: document.querySelector(".btn"),
  gallery: document.querySelector('.gallery'),
};
refs.formSearch.addEventListener('submit', getTextForSearch);
refs.btnLoadMore.addEventListener('click', searchPhoto);

refs.choiseScroll.addEventListener("click", (evt) => {
  radioScroll = true
  radioBtn = false
  //console.log("scrol")
  })
  refs.choiseBtn.addEventListener("click", (evt) => {
    radioScroll = false
    radioBtn = true
    //console.log("btn")
    })

function getTextForSearch(event) {
  event.preventDefault();
  dissActiveBtnLoadMore();
  searchText = event.currentTarget.elements.searchQuery.value.trim();
  if (searchText === '') {
    anserWarning();
    return;
  }else if(radioScroll === false && radioBtn === false){
    anserChoiseError()
    return
  }
  clearPhotoContainerAndInputValue();
  page = 1;
  cleanerfotoTotalLength();
  scroll()
  searchPhoto();
}

function searchPhoto() {
  doChoise(searchText);
}

const processingPhotoIsButton = value => {
  if (value.data.hits.length === 0) {
    anserError();
    return;
  }
  fotoTotal = value.data.totalHits;
  renderPhoto(value.data);
  page += 1;
};

const processingPhotoIsScroll = value => {
  if (value.hits.length === 0) {
    anserError();
    return;
  }
  fotoTotal = value.totalHits;
  renderPhoto(value);
  page += 1;
};
