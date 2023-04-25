import axios from 'axios';
import { anserError } from './notification';
import {
  page,
  processingPhotoIsScroll,
  processingPhotoIsButton,
  refs,
  radioScroll,
  radioBtn,
} from './index';
import InfiniteScroll from 'infinite-scroll';
import { activeBtnLoadMore } from './switch-button';
export { doChoise };
let thisText = '';

const API_KEY = '35606750-af8374c970d110a408f6cc0ed';
const BASE_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});

const optionsSearch = searchParams.toString();

const doChoise = searchText => {
  if (radioScroll) {
    doStuffWithScroll(searchText);
  } else if (radioBtn && infScroll !== null) {
    infScroll.destroy();
    doStuffWitchBtn(searchText);
  } else if (radioBtn) {
    doStuffWitchBtn(searchText);
  }
};

//******************* this code belongs to btn function *****************

const doStuffWitchBtn = async searchText => {
  try {
    if (radioBtn === false) {
      doChoise(searchText);
      return;
    }
    const photoData = await fetchSearch(searchText);
    processingPhotoIsButton(photoData);
  } catch (error) {
    console.log(error);
    anserError();
  }
};

const fetchSearch = async searchText => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchText}&per_page=40&page=${page}&${optionsSearch}`
  );
  return response;
};

//******************* this code belongs to scrolol function *****************

let infScroll = null;
const doStuffWithScroll = searchText => {
  try {
    if (infScroll !== null) {
      infScroll.destroy();
    }
    thisText = searchText;

    infScroll = new InfiniteScroll('.gallery', {
      path: function () {
        return `${BASE_URL}?key=${API_KEY}&q=${thisText}&per_page=40&page=${page}&${optionsSearch}`;
      },
      history: false,
      responseBody: 'json',
      history: false,
    });

    infScroll.loadNextPage();

    infScroll.on('load', function (body) {
      if (radioScroll === false) {
        activeBtnLoadMore();
        return;
      }
      processingPhotoIsScroll(body);
    });
  } catch (error) {
    console.log(error);
    anserError();
  }
};
