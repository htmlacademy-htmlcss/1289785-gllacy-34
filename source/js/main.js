// Слайдер

//Variables
const CURRENT_BUTTON_CLASS = "slider-pagination-button-current";
const FIRST_SLIDER_BUTTON = "first-slider-button";
const SECOND_SLIDER_BUTTON = "second-slider-button";
const THIRD_SLIDER_BUTTON = "third-slider-button";
const ACTIVE_CLASS_NAME = "active";
const PINK_BODY = "slider-body-1";
const BLUE_BODY = "slider-body-2";
const YELLOW_BODY = "slider-body-3";
const BANAN_IMG_SRC = "img/slider/banana.png";
const STRAWBERRY_JAM_IMG_SRC = "img/slider/strawberry-jam.png";
const CARAMEL_MARSHMALLOW_IMG_SRC = "img/slider/caramel-marshmallow.png";
const SLIDER_PHOTOS = [
  "img/slider/strawberry-jam.png",
  "img/slider/banana.png",
  "img/slider/caramel-marshmallow.png",
];

const slider = document.querySelector(".slider");
const body = document.querySelector("body");
const sliderControls = slider.querySelector(".slider-controls");
const pagonationButtons = sliderControls.querySelectorAll(
  ".slider-pagination-button"
);
const mainImage = slider.querySelector(".slider-main-img");
const secondSliderImage = slider.querySelector(".second-slider-img");
const thirdSliderImage = slider.querySelector(".third-slider-img");
const sliderDescriptionCollection = slider.querySelectorAll(
  ".slider-description-item"
);

// Utils
const removeCLassName = (element, className) =>
  element.classList.remove(className);

const addClassName = (element, className) => element.classList.add(className);

const checkClassName = (element, className) => {
  if (element.classList.contains(className)) {
    return true;
  }
};

const removeClassNameCollection = (collection, className) => {
  collection.forEach((collectionItem) => {
    removeCLassName(collectionItem, className);
  });
};

const changeClassName = (element, className) => {
  const firstClassNeme = element.classList[0];
  element.classList.replace(firstClassNeme, className);
};

const changeImageSrc = (imageElement, imageSrc) =>
  (imageElement.src = imageSrc);

const changeCurrentClassName = (elements, currentElement, className) => {
  removeClassNameCollection(elements, className);
  addClassName(currentElement, className);
};

const changeSliderElements = (
  currentButton,
  mainImage,
  secondSliderImage,
  thirdSliderImage,
  bodyElement,
  descriptions
) => {
  if (checkClassName(currentButton, FIRST_SLIDER_BUTTON)) {
    changeImageSrc(mainImage, STRAWBERRY_JAM_IMG_SRC);
    changeImageSrc(secondSliderImage, BANAN_IMG_SRC);
    changeImageSrc(thirdSliderImage, CARAMEL_MARSHMALLOW_IMG_SRC);
    changeClassName(bodyElement, PINK_BODY);
    changeCurrentClassName(descriptions, descriptions[0], ACTIVE_CLASS_NAME);
  } else if (checkClassName(currentButton, SECOND_SLIDER_BUTTON)) {
    changeImageSrc(mainImage, BANAN_IMG_SRC);
    changeImageSrc(secondSliderImage, CARAMEL_MARSHMALLOW_IMG_SRC);
    changeImageSrc(thirdSliderImage, STRAWBERRY_JAM_IMG_SRC);
    changeClassName(bodyElement, BLUE_BODY);
    changeCurrentClassName(descriptions, descriptions[1], ACTIVE_CLASS_NAME);
  } else if (checkClassName(currentButton, THIRD_SLIDER_BUTTON)) {
    changeImageSrc(mainImage, CARAMEL_MARSHMALLOW_IMG_SRC);
    changeImageSrc(secondSliderImage, BANAN_IMG_SRC);
    changeImageSrc(thirdSliderImage, STRAWBERRY_JAM_IMG_SRC);
    changeClassName(bodyElement, YELLOW_BODY);
    changeCurrentClassName(descriptions, descriptions[2], ACTIVE_CLASS_NAME);
  }
};

// Hendlers
const addButtonEventHendler = (buttons, className) => {
  buttons.forEach((element) => {
    element.addEventListener("click", (evt) => {
      if (!checkClassName(evt.target, CURRENT_BUTTON_CLASS)) {
        changeCurrentClassName(buttons, evt.target, className);
        changeSliderElements(
          evt.target,
          mainImage,
          secondSliderImage,
          thirdSliderImage,
          body,
          sliderDescriptionCollection
        );
      }
    });
  });
};

addButtonEventHendler(pagonationButtons, CURRENT_BUTTON_CLASS);
