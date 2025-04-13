
    const carousel = document.querySelector('.carousel');
      const indicators = document.querySelectorAll('.indicator');
      let currentSlide = 0;
      const totalSlides = 4;

      function updateCarousel() {
          carousel.style.transform = `translateX(-${currentSlide * 25}%)`;
          indicators.forEach((indicator, index) => {
              indicator.classList.toggle('active', index === currentSlide);
          });
      }

      function nextSlide() {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateCarousel();
      }

      // Auto advance slides every 5 seconds
      setInterval(nextSlide, 3000);

      // Add click functionality to indicators
      indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', () => {
              currentSlide = index;
              updateCarousel();
          });
      });