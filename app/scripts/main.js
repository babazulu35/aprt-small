(function() {

    // Single image overlay 
    // Shows only data-imagelay
    $('.c-text-image__image').imagelay({
        mainClass: 'c-overlay',
        contentClass: 'c-overlay--content',
        closeIcon: 'c-overlay--close',
        animation: 'fadeIn',
        closeOnOutsideClick: true
    });

    $('.c-slider').aprtslider({
        showArrow: true,
        prevArrow: '<span class="c-slider__arrow-previous"></span>',
        nextArrow: '<span class="c-slider__arrow-next"></span>',
        dots: true,
        dotsClass: '<div class="c-slider__dots"></div>',
        dotsItemClass: 'c-slider__dots-item',
        imageSliderClass: 'c-slider--item',
        autoSlide: true,
        slideSpeed: 2000,

    })

})();