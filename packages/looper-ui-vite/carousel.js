const slideVideos = [
    {
        title: 'Choisir la combinaison fréquence / durée de vie',
        src: 'rythmes.mp4'
    },
    {
        title: 'Dessiner plus vite allonge les traits',
        src: 'vitesses.mp4'
    },
    {
        title: 'Mettre en pause pour dessiner des traits qui clignotent',
        src: 'explosion.mp4'
    },
    {
        title: "Ceci est dessiné d'un seul long trait",
        src: 'etoile.mp4'
    },
    {
        title: 'Ceci est dessiné avec beaucoup de traits courts',
        src: 'vagues-reculent.mp4'
    },
    {
        title: 'Varier les couleurs',
        src: 'arc-en-ciel.mp4'
    },
    {
        title: 'Varier la vitesse de dessin',
        src: 'chenille-clignotante.mp4'
    }];

const basePath = '';

function makeSlideContent(slideVideo) {
  return `
    <div class="${ slideClass }">
        <p class="text"><b>${slideVideo.title}</b></p>
        <video controls muted playsinline>
            <source src="${ basePath }/videos/${ slideVideo.src }"}
                    type="video/mp4" />
        </video>
    </div>
   `};

const parentClass = 'slider-wrapper';
const slideContainerClass = 'slides-container';
const slideClass = 'slide';
const carouselHtml = `
<div class="${ parentClass }">
   <button class="slide-arrow slide-arrow-prev">
     &#8249;
   </button>
   <button class="slide-arrow slide-arrow-next">
     &#8250;
   </button>
   <div class="${ slideContainerClass }">
     ${ slideVideos.map(makeSlideContent).join('') }
   </div>
</div>
` ;

const carouselCss = `
 .slides-container * {
    box-sizing: border-box;
 }

 .slider-wrapper {
     /* margin: 1rem; */
    position: relative;
     /* overflow: hidden; */
 }

 .slides-container {
     /* height: calc(100vh - 2rem); */
    width: 100%;
    display: flex;
    overflow: hidden;
    scroll-behavior: smooth;
    list-style: none;
     /* margin: 0 15px ; */
    padding: 0;
 }

 .slide-arrow {
    position: absolute;
    display: flex;
     /* top:70%; */
    top: 0;
    bottom: 0;
    margin: auto;
    height: 4rem;
    background-color: white;
    border: none;
    width: 2rem;
    font-size: 3rem;
    padding: 0;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 100ms;
    z-index: 1;
 }

 .slide-arrow:hover,
 .slide-arrow:focus {
    opacity: 0.75;
    background-color: #bfbfbf;
 }

 .slide-arrow-prev {
    left: 0;
    padding-left: 0.25rem;
    border-radius: 0 2rem 2rem 0;
 }

 .slide-arrow-next {
    right: 0;
    padding-left: 0.75rem;
    border-radius: 2rem 0 0 2rem;
 }

 .${ slideClass } {
    width: 100%;
    height: 100%;
    flex: 1 0 100%;
 }

 .${ slideClass } > video {
    width: 100%;
 }
/*
 .text{
    font-size: var(--font-size);
 }
*/
`;

function scrollToSlide(state, slideParent, index) {
  const slideContainer =
        slideParent.querySelector(`.${ slideContainerClass }`);
  const slides = slideContainer.querySelectorAll(`.${ slideClass }`)
  const currentSlide = slides[state.slideIndex];
  console.log('scroll',state, slideContainer.scrollLeft, index)
  console.log('sc',slideContainer);
  console.log('sl', currentSlide.clientWidth);
  const slideWidth = currentSlide.clientWidth;
  state.slideIndex = index;
  slideContainer.scrollLeft = state.slideIndex * slideWidth;
}

function playWhenVisible(entries) {
  entries.forEach(({ isIntersecting, target }) => {
    // console.log('itrs', isIntersecting,
    //             target.children[0].src.split('/')[4]);
    target.currentTime = 0;
    isIntersecting ? target.play() : target.pause();
  });
}

function addSlideListeners (slides, listener) {
  const observer = new IntersectionObserver(playWhenVisible,
    { threshold: 0.05 });
  const removeListeners = [...slides].map(slide => {
    const video = slide.querySelector('video');
    observer.observe(video);
    const remove = addListener(video, 'ended', listener);
    return () => {
      observer.unobserve(video);
      remove();
    };
  });
  return () => removeListeners.forEach(uo => uo());
}

function addListener(element, event, listener) {
    element.addEventListener(event, listener, false);
    return () => element.removeEventListener(listener);
}

function addListeners(parentElement) {
  const slideParent = parentElement.querySelector(`.${parentClass}`);
  const slides = slideParent.querySelectorAll(`.${ slideClass }`)
  const state = { slideIndex: 0 }
  // next button
  const nextClick = () => {
    const nextSlideIndex = (state.slideIndex + 1) % slides.length
    scrollToSlide(state, slideParent, nextSlideIndex);
  };
  const arrowNext = slideParent.querySelector('.slide-arrow-next');
  const rmNextL = addListener(arrowNext, 'click' , nextClick );

  // previous button
  const prevClick = () => {
    const firstIdx = state.slideIndex == 0
    const nextSlideIndex = (firstIdx ? slides.length : state.slideIndex) - 1;
    scrollToSlide(state, slideParent, nextSlideIndex);
  }
  const arrowPrev = slideParent.querySelector('.slide-arrow-prev');
  const rmPrevL = addListener(arrowPrev, 'click' , prevClick );

  // slides
  const removeSlideListeners = addSlideListeners(slides, nextClick);

  return () => {
    rmPrevL();
    rmNextL();
    removeSlideListeners();
  };
}

export function makeCarousel() {
  return {html: carouselHtml,
          css: carouselCss,
          addListeners}
}
