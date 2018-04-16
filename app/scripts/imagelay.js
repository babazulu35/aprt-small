/**
 * @description Simple image overlay for Aperto test case 
 * @author h.huriyet
 */
(function($) {
    'use strict';
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    var Imagelay = function(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this.attrTag = this.$element.data("imagelay");
        this.flag = {
            open: false, // Open-- Close check flag
        }

        this.defaults = {
            mainClass: 'c-overlay', // Main Overlay Class
            contentClass: 'c-overlay--content', // Overlay Content Class
            closeIcon: 'c-overlay--close', // Overlay Close Buton Class
            animation: 'fadeIn', // Animation Css class,
            closeOnOutsideClick: true, // Close Overlay on Click outside screen
            bindClickToParent: true, // Binds Overlay Open function to Parent Div 
        }
    };


    /**
     * @description initialize app
     * @returns initilaze function
     */
    Imagelay.prototype.initialize = function() {

        this.config = $.extend({}, this.defaults, this.options, this.attrTag);
        this.ready();
        return this;
    }

    /**
     * @description open Overlay with outhside click control
     */
    Imagelay.prototype.open = function() {
        if (!this.flag.open) {
            var self = this;
            $('html').addClass('no-scroll');
            $("body").append(this.bindOverlayToDOM());
            this.flag.open = true;
            if (this.config.closeOnOutsideClick) {
                $("body").click(function(e) {
                    if (e.target.classList[0] == self.config.mainClass) {
                        self.toggle();
                    }
                })
            }
            $("." + this.config.closeIcon).on('click', function() {
                self.toggle();
            })
        }
    }

    /**
     * @description close overlay
     */
    Imagelay.prototype.close = function() {
        if (this.flag.open) {
            $("." + this.config.mainClass).remove();
            $('html').removeClass('no-scroll');
            this.flag.open = false;
        }

    }

    /**
     * @description toggle Open and Close functions with control flag 
     */
    Imagelay.prototype.toggle = function() {
        var self = this;
        if (!self.flag.open) {
            self.open();
        } else {
            self.close();
        }
    }


    /**
     * @description 
     */
    Imagelay.prototype.bindOverlayToDOM = function() {

        var template = "<div class='" + this.config.mainClass + " fadeIn' ><div class='" + this.config.contentClass + "'><span class='" + this.config.closeIcon + "'></span><img src='" + this.$element.attr('src') + "' /></div></div>";
        return template;

    }


    /**
     * @description overlay ready function
     */
    Imagelay.prototype.ready = function() {
        var self = this;
        if (this.attrTag != undefined || this.attrTag != null) {
            if (this.config.bindClickToParent) {
                $('.' + this.$element[0].offsetParent.className).on('click', function() {
                    self.toggle();
                })
            } else {
                this.$element.on('click', function() {
                    self.toggle();
                })
            }



        }
    }

    $.fn.imagelay = function(options) {
        return this.each(function() {
            new Imagelay(this, options).initialize();
        })
    }

})(jQuery);