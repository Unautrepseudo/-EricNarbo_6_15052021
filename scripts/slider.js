export const handleSlider = () => {
  const closeSliderBtn = document.querySelector('.close-slider-btn');
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides-container');
  const slidesImgTitle = document.querySelector('.slider-img-title');
  const slidesImgContainer = document.querySelector('.slider-img-container');

  const imgElement = (img, index, imgTitle) => {
    slidesImgTitle.innerHTML = imgTitle;
    return `
          <img
            src="${img}"
            class="slider-img"
            value='${index}'
            alt="une belle image"
          />
    `;
  };

  const videoElement = (img, index, imgTitle) => {
    slidesImgTitle.innerHTML = imgTitle;
    return `
          <video 
            controls
            class="slider-img"
            value='${index}'
            alt="une belle video"
          >
            <source src="${img}" type="video/mp4">
          </video>
    `;
  };

  const showSlider = () => {
    let imgContainers = document.querySelectorAll('.img-container');
    let sliderImgObj = [];
    let itemsLength = imgContainers.length;

    imgContainers.forEach((container, i) => {
      let getImgSrc = container.firstElementChild.getAttribute('src');
      let getImgTitle = container.firstElementChild.getAttribute('value');
      let getChildTag = container.firstElementChild.tagName;

      sliderImgObj.push({
        src: getImgSrc,
        title: getImgTitle,
        tag: getChildTag,
      });

      container.addEventListener('click', () => {
        slider.style.display = 'flex';

        getChildTag === 'IMG'
          ? (slidesImgContainer.innerHTML = imgElement(
              getImgSrc,
              i,
              getImgTitle
            ))
          : (slidesImgContainer.innerHTML = videoElement(
              getImgSrc,
              i,
              getImgTitle
            ));

        handleSlide(sliderImgObj, itemsLength, i);
      });
    });
  };
  showSlider();
  const handleSlide = (sliderImgObj, itemsLength, i) => {
    const chevronLeft = document.querySelector('.fa-chevron-left');
    const chevronRight = document.querySelector('.fa-chevron-right');
    chevronLeft.addEventListener('click', () => {
      i--;
      if (i < 0) {
        i = itemsLength - 1;
      }
      sliderImgObj[i].tag === 'IMG'
        ? (slidesImgContainer.innerHTML = imgElement(
            sliderImgObj[i].src,
            i,
            sliderImgObj[i].title
          ))
        : (slidesImgContainer.innerHTML = videoElement(
            sliderImgObj[i].src,
            i,
            sliderImgObj[i].title
          ));
    });

    chevronRight.addEventListener('click', () => {
      i++;
      if (i > itemsLength - 1) {
        i = 0;
      }
      sliderImgObj[i].tag === 'IMG'
        ? (slidesImgContainer.innerHTML = imgElement(
            sliderImgObj[i].src,
            i,
            sliderImgObj[i].title
          ))
        : (slidesImgContainer.innerHTML = videoElement(
            sliderImgObj[i].src,
            i,
            sliderImgObj[i].title
          ));
    });
  };

  const closeSlider = () => {
    closeSliderBtn.addEventListener('click', () => {
      slider.style.display = 'none';
    });
  };
  closeSlider();
};
