import { Menu } from "../types";

function makeSlideContent(slideVideo:any) {
  return `
    <div class="${ slideClass }">
        <div class="text">${slideVideo.title}</div>
        <video controls muted playsinline>
            <source src="${ slideVideo.src }"
                    type="video/mp4" />
        </video>
    </div>
   `};

const trackClass = 'track';
const animateSlidesClass = 'animate-slides';
const containerClass = 'carousel-container';
const slideClass = 'slide';

function makeCarouselHtml(slides:any[]){
  return `
    <button class="slide-arrow slide-arrow-prev">&#8249;</button>
    <button class="slide-arrow slide-arrow-next">&#8250;</button>
    <div class="${ containerClass }">
      <div>
        <div class="${ trackClass } ${ animateSlidesClass }">
          ${ slides.map(makeSlideContent).join('') }
        </div>
      </div>
    </div>
    ` ;
}  
const carouselCss = `
video-carousel {
  position: relative;
  display: block;

  * {
    box-sizing: border-box;
  }
  
  .${ containerClass }  {
    padding: 0 15px;
    > div {
      overflow: hidden;
      width: 100%;
    }
  }


 .${ trackClass } {
     display: flex;
 }

 .${ animateSlidesClass }{
    transition: transform 0.65s ease;
 }

 .${ slideClass } {
    flex: 0 0 100%;
    .text {
      margin-bottom: 10px;
    }
    video {
      object-fit: contain;
      width: 100%;
    }
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

 .slide-arrow:hover {
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

}

`;


function playWhenVisible(entries:any[]) {
  entries.forEach(({ isIntersecting, target }) => {
    // console.log('itrs', isIntersecting,
    //             target.children[0].src.split('/')[4]);
    target.currentTime = 0;
    isIntersecting ? target.play() : target.pause();
  });
}

function addSlideListeners (slides:any, listener:any) {
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

function addListener(element: any, event: any, listener: any) {
    element.addEventListener(event, listener, false);
    return () => element.removeEventListener(event, listener);
}


export class VideoCarousel extends HTMLElement {
    menu?: Menu;
    static css = carouselCss;

    #slides:any[] = []
    set slides(slides:any[]){
      this.#slides = slides;
      this.render();
    }
    
    slideIndex = 0;
    removeListeners?: () => void;

    scrollToSlide() {
      const track = this.querySelector(`.${trackClass}`) as HTMLElement;
      const slides = track.querySelectorAll(`.${slideClass}`);
      const currentSlide = slides[this.slideIndex];
      // console.log('scroll', track.scrollLeft, this.slideIndex);
      // console.log('sc', track);
      // console.log('sl', currentSlide.clientWidth);
      const slideWidth = currentSlide.clientWidth;
      const offsetX = -this.slideIndex * slideWidth;
      track.style.cssText = `transform: translateX(${offsetX}px)`;
    }

    render(){
      if (this.removeListeners){
        this.removeListeners();
      }
      this.innerHTML = makeCarouselHtml(this.#slides);
      this.removeListeners = this.addListeners(this);
    }

    addListeners(parentElement:HTMLElement) {
        const slideParent = parentElement.querySelector(`.${containerClass}`) as Element;
        const slides = slideParent!.querySelectorAll(`.${slideClass}`) as NodeListOf<Element>;
        // next button
        const nextClick = (e:Event) => {
            e.stopPropagation();
            this.slideIndex = (this.slideIndex + 1) % slides.length
            this.scrollToSlide();
        };
        const arrowNext = this!.querySelector('.slide-arrow-next');
        const rmNextL = addListener(arrowNext, 'click', nextClick);

        // previous button
        const prevClick = (e:Event) => {
            e.stopPropagation();
            const firstIdx = this.slideIndex == 0
            this.slideIndex = (firstIdx ? slides.length : this.slideIndex) - 1;
            this.scrollToSlide();
        }
        const arrowPrev = this.querySelector('.slide-arrow-prev');
        const rmPrevL = addListener(arrowPrev, 'click', prevClick);

        // slides
        const removeSlideListeners = addSlideListeners(slides, nextClick);

        const handleResize = () => {
          const track = document.querySelector(`.${trackClass}`);
          track?.classList.remove(animateSlidesClass);
          this.scrollToSlide();
          requestAnimationFrame(() => track?.classList.add(animateSlidesClass));
        }

        window.addEventListener('resize', handleResize);

        return () => {
            rmPrevL();
            rmNextL();
            removeSlideListeners();
            window.removeEventListener('resize', handleResize);
        };
    }
}

customElements.define("video-carousel", VideoCarousel);
