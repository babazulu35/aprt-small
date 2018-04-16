/**
 * @description Simple slider for Aperto test case
 * @author h.huriyet
 */

(function(window, $) {
    "use strict";
    var Aprtslider = function(element, options) {
        this.self = window.self;
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this.flag = {
            isAppended: false
        }


        this.defaults = {
            prevArrow: '<span class="c-slider__arrow-previous"></span>',
            nextArrow: '<span class="c-slider__arrow-next"></span>',
            dots: true,
            dotsClass: '<div class="c-slider__dots"></div>',
            imageSliderClass: 'c-slider--item',
            autoSlide: true,
            slideSpeed: 2000,
        }

    }


    /**
     *  @description Inıtialize App
     *  @returns initilialize function 
     */
    Aprtslider.prototype.initialize = function() {
        this.config = $.extend({}, this.defaults, this.options);
        if (!this.flag.isAppended) {
            this.appendSlider();
            this.activateArrowFunc();
            this.flag.isAppended = true;

        }
        if (this.flag.isAppended && this.config.autoSlide) {
            this.autoSlide();
        }
        return this;
    }


    /**
     * slider interval start 
     * @returns interval function
     */
    Aprtslider.prototype.startSliderInterval = function() {
        var self = this;
        var interval = window.setInterval(function() {
            var activeSlide = $('.slider').attr('data-active');
            if (activeSlide < self.allowedMaxStep()) {
                $('.slider').attr('data-active', parseInt(activeSlide) + 1);
                $('.slider').animate({ 'margin-left': -self.$element[0].clientWidth * activeSlide })
                self.dotsActiveElement(activeSlide);
            } else if (activeSlide == self.allowedMaxStep()) {
                $('.slider').attr('data-active', 1);
                $('.slider').animate({ 'margin-left': 0 });
                self.dotsActiveElement(0);
            }
        }, this.defaults.slideSpeed)

        return interval;
    }

    /**
     * @description autoSlide function starts , stops and reset the intervals;
     */
    Aprtslider.prototype.autoSlide = function() {
        var self = this;
        this.interval = this.startSliderInterval();
        this.$element.on('mouseover', function() {
            window.clearInterval(self.interval);
        });
        this.$element.on('mouseout', function() {
            // Restart Interval
            self.interval = self.startSliderInterval();
        })
    }

    /**
     * 
     * @param {number} itemCount
     * @description Slider item count value 
     */
    Aprtslider.prototype.calculateSpace = function(itemCount) {
        var slideSpace = this.$element[0].clientWidth * itemCount;
        return slideSpace;
    }


    /**
     *  @description Append new elements to c-slider 
     */
    Aprtslider.prototype.appendSlider = function() {
        $(this.config.nextArrow).appendTo('.c-slider');
        $(this.config.prevArrow).appendTo('.c-slider');
        if (this.config.dots) $(this.config.dotsClass).appendTo('.c-slider');
        this.$element.append('<div class="slider"></div>');
        var self = this;
        var sliderSet = [];

        for (var i = 0; i < this.$element[0].children.length; i++) {
            if (this.$element[0].children[i].className == this.defaults.imageSliderClass) {
                sliderSet.push(this.$element[0].children[i]);
                continue;
            }
        }

        $.each(sliderSet, function(key, value) {
            if (value.className != undefined) {
                $('.' + value.className).css('width', self.$element[0].clientWidth).appendTo('.slider');
                if (self.config.dots) {
                    $('<div class="c-slider__dots-item"></div>').appendTo('.' + $(self.config.dotsClass)[0].className);
                    $('.c-slider__dots-item').eq(0).addClass('active');
                }
            }

        });
        $('.slider').css({ 'width': this.calculateSpace(sliderSet.length), 'display': 'block', 'margin-left': 0, 'padding': 0 }).attr('data-active', 1);

    }


    /**
     * @description length from the added slider item
     */
    Aprtslider.prototype.allowedMaxStep = function() {
        return $('.slider')[0].children.length;
    }


    /**
     * 
     * @param {number} activeSlide 
     * @description value from activated slide item on page
     */
    Aprtslider.prototype.dotsActiveElement = function(activeSlide) {

        $('.c-slider__dots-item').removeClass('active');
        $('.c-slider__dots-item').eq(activeSlide).addClass('active');
    }


    /**
     * @description goTo next Slide item
     */
    Aprtslider.prototype.nextSlide = function() {

        var self = this;
        $('.' + $(this.config.nextArrow)[0].className).click(function() {

            var activeSlide = $('.slider').attr('data-active');
            if (activeSlide <= self.allowedMaxStep() - 1) {
                $('.slider').attr('data-active', parseInt(activeSlide) + 1);
                $('.slider').animate({ 'margin-left': -self.$element[0].clientWidth * activeSlide })
                self.dotsActiveElement(activeSlide);
            }
        })
    }


    /**
     * @description goTo Previous slide item
     */
    Aprtslider.prototype.previousSlide = function() {
        var self = this;
        $('.' + $(this.config.prevArrow)[0].className).click(function() {
            var activeSlide = $('.slider').attr('data-active');
            if (activeSlide > 1) {
                $('.slider').attr('data-active', activeSlide - 1);
                $('.slider').animate({ 'margin-left': ((-self.$element[0].clientWidth * (activeSlide - 1)) + self.$element[0].clientWidth) })
                self.dotsActiveElement(activeSlide - 2);
            }
        })
    }


    Aprtslider.prototype.activateArrowFunc = function() {
        this.nextSlide();
        this.previousSlide();
    }


    $.fn.aprtslider = function(options) {
        return this.each(function() {

            new Aprtslider(this, options).initialize();
        })
    }

})(window, jQuery);