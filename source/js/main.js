// Слайдер

//Variables
const SLIDER_CLASS_LIST_INDEX = 1;
const BODY_CLASS_LIST_INDEX = 0;
const CURRENT_BUTTON_CLASS = "slider-pagination-button-current";
const ACTIVE_CLASS_NAME = "active";
const FIRST_SLIDER_ELEMENT_INDEX = 0;
const LAST_SLIDER_ELEMENT_INDEX = 2;
const SLIDER_STEP = 1;
const MOVE_FROM_END_TO_START = -1;
const MOVE_FROM_START_TO_END = 3;

const bodyColors = {
  PINK_BODY: "slider-body-1",
  BLUE_BODY: "slider-body-2",
  YELLOW_BODY: "slider-body-3",
};

const sliderImages = {
  BANAN_IMG_SRC: "img/slider/banana.png",
  STRAWBERRY_JAM_IMG_SRC: "img/slider/strawberry-jam.png",
  CARAMEL_MARSHMALLOW_IMG_SRC: "img/slider/caramel-marshmallow.png",
};
const DESCRIPTIONS = [
  "first-slid-description",
  "second-slid-description",
  "third-slid-description",
];

const slider = document.querySelector(".slider");
const bodyElement = document.querySelector("body");
const sliderControls = slider.querySelector(".slider-controls");
const pagonationButtons = sliderControls.querySelectorAll(
  ".slider-pagination-button"
);
const mainImageElement = slider.querySelector(".slider-main-img");
const secondSliderImageElement = slider.querySelector(".second-slider-img");
const thirdSliderImageElement = slider.querySelector(".third-slider-img");
const sliderDescriptionCollection = slider.querySelectorAll(
  ".slider-description-item"
);

const sliderButtonPrevious = slider.querySelector(".slider-button-previous");
const sliderButtonNext = slider.querySelector(".slider-button-next");

// Utils
const removeCLassName = (element, className) =>
  element.classList.remove(className);

const addClassName = (element, className) => element.classList.add(className);

const checkClassName = (element, className) => {
  if (element.classList.contains(className)) {
    return true;
  }
};

const getSliderNumber = (element, classListIndex) => {
  const sliderClassName = element.classList[classListIndex];
  let sliderNumber = 0;
  switch (sliderClassName) {
    case "second-slider-button":
      sliderNumber = 1;
      break;
    case "third-slider-button":
      sliderNumber = 2;
      break;
  }
  return sliderNumber;
};

const removeClassNameCollection = (collection, className) => {
  collection.forEach((collectionItem) => {
    removeCLassName(collectionItem, className);
  });
};

const changeClassName = (element, className, classListIndex) => {
  const firstClassNeme = element.classList[classListIndex];
  element.classList.replace(firstClassNeme, className);
};

const changeImageSrc = (imageElement, imageSrc) =>
  (imageElement.src = imageSrc);

const changeCurrentClassName = (elements, currentElement, className) => {
  removeClassNameCollection(elements, className);
  addClassName(currentElement, className);
};

const slides = [
  {
    slideElements: {
      firstImage: sliderImages.STRAWBERRY_JAM_IMG_SRC,
      secondSliderImage: sliderImages.BANAN_IMG_SRC,
      thirdSliderImage: sliderImages.CARAMEL_MARSHMALLOW_IMG_SRC,
      bodyColor: bodyColors.PINK_BODY,
      descriptionIndex: 0,
    },
  },
  {
    slideElements: {
      firstImage: sliderImages.BANAN_IMG_SRC,
      secondSliderImage: sliderImages.CARAMEL_MARSHMALLOW_IMG_SRC,
      thirdSliderImage: sliderImages.STRAWBERRY_JAM_IMG_SRC,
      bodyColor: bodyColors.BLUE_BODY,
      descriptionIndex: 1,
    },
  },
  {
    slideElements: {
      firstImage: sliderImages.CARAMEL_MARSHMALLOW_IMG_SRC,
      secondSliderImage: sliderImages.STRAWBERRY_JAM_IMG_SRC,
      thirdSliderImage: sliderImages.BANAN_IMG_SRC,
      bodyColor: bodyColors.YELLOW_BODY,
      descriptionIndex: 2,
    },
  },
];

const changeSlide = (slideObject) => {
  const {
    slideElements: {
      firstImage,
      secondSliderImage,
      thirdSliderImage,
      bodyColor,
      descriptionIndex,
    },
  } = slideObject;

  changeImageSrc(mainImageElement, firstImage);
  changeImageSrc(secondSliderImageElement, secondSliderImage);
  changeImageSrc(thirdSliderImageElement, thirdSliderImage);
  changeClassName(bodyElement, bodyColor, BODY_CLASS_LIST_INDEX);
  changeCurrentClassName(
    sliderDescriptionCollection,
    sliderDescriptionCollection[descriptionIndex],
    ACTIVE_CLASS_NAME
  );
};

// Находим индекс активного элемента
const getActiveElementIndex = (activeClassName) => {
  const array = Array.from(sliderDescriptionCollection);
  let indexElement = 0;
  array.forEach((item, index) => {
    if (item.classList.contains(activeClassName)) {
      indexElement = index;
    }
  });
  return indexElement;
};

// Hendlers
const addSliderPreviousButtonHendler = (previousButton, slides) => {
  previousButton.addEventListener("click", () => {
    let currentIndex = getActiveElementIndex(ACTIVE_CLASS_NAME);
    if (currentIndex == FIRST_SLIDER_ELEMENT_INDEX) {
      currentIndex = MOVE_FROM_START_TO_END;
    }
    changeSlide(slides[currentIndex - SLIDER_STEP]);
    changeCurrentClassName(
      pagonationButtons,
      pagonationButtons[currentIndex - SLIDER_STEP],
      CURRENT_BUTTON_CLASS
    );
  });
};

const addSliderNextButtonHendler = (nextButton, slides) => {
  nextButton.addEventListener("click", () => {
    let currentIndex = getActiveElementIndex(ACTIVE_CLASS_NAME);
    if (currentIndex == LAST_SLIDER_ELEMENT_INDEX) {
      currentIndex = MOVE_FROM_END_TO_START;
    }
    changeSlide(slides[currentIndex + SLIDER_STEP]);
    changeCurrentClassName(
      pagonationButtons,
      pagonationButtons[currentIndex + SLIDER_STEP],
      CURRENT_BUTTON_CLASS
    );
  });
};

const addSliderPaginationEventHendler = (
  buttons,
  slides,
  currentButtonClassName,
  classListIndex
) => {
  buttons.forEach((element) => {
    element.addEventListener("click", (evt) => {
      if (!checkClassName(evt.target, currentButtonClassName)) {
        changeCurrentClassName(buttons, evt.target, currentButtonClassName);
        let sliderIndex = getSliderNumber(evt.target, classListIndex);
        changeSlide(slides[sliderIndex]);
      }
    });
  });
};

addSliderPreviousButtonHendler(sliderButtonPrevious, slides);
addSliderNextButtonHendler(sliderButtonNext, slides);

addSliderPaginationEventHendler(
  pagonationButtons,
  slides,
  CURRENT_BUTTON_CLASS,
  SLIDER_CLASS_LIST_INDEX
);
