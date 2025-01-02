document.addEventListener('DOMContentLoaded', () => {
    const videoSlider = document.querySelector('.video-slider-container');
  
    // 스크롤 가능 확인 로그 (디버깅 용도)
    videoSlider.addEventListener('scroll', () => {
      console.log(`스크롤 위치: ${videoSlider.scrollLeft}`);
    });
  
    
  });
  