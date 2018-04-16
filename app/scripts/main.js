(function() {

    // Single image overlay 
    // Shows only data-imagelay
    $('img').imagelay({
        mainClass: 'c-overlay',
        contentClass: 'c-overlay--content',
        closeIcon: 'c-overlay--close',
        animation: 'fadeIn',
        closeOnOutsideClick: true,
        bindClickToParent: true,
    });

    $('.c-slider').aprtslider({
        prevArrow: '<span class="c-slider__arrow-previous"></span>',
        nextArrow: '<span class="c-slider__arrow-next"></span>',
        dots: true,
        dotsClass: '<div class="c-slider__dots"></div>',
        imageSliderClass: 'c-slider--item',
        autoSlide: true,
        slideSpeed: 2000,
    });






})();