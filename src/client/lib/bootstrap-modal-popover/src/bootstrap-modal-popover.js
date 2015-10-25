/*************************************************************************
 *
 * WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * THIS FILE HAS BEEN MODIFIED SLIGHTLY FOR CMS. LOOK FOR CUSTOMIZATION TAGS BELOW
 *
 **************************************************************************
 */
!function ($) {

    /* MODAL POPOVER PUBLIC CLASS DEFINITION
     * =============================== */

    var ModalPopover = function (element, options) {
        this.options = options;
        this.$element = $(element)
            .delegate('[data-dismiss="modal-popup"]', 'click.dismiss.modal-popup', $.proxy(this.hide, this));
        this.options.remote && this.$element.find('.popover-content').load(this.options.remote);
        this.$parent = options.$parent; // todo make sure parent is specified
    }


    /* NOTE: MODAL POPOVER EXTENDS BOOTSTRAP-MODAL.js
     ========================================== */


    ModalPopover.prototype = $.extend({}, $.fn.modal.Constructor.prototype, {

        constructor: ModalPopover,


        getPosition: function () {
            var $element = this.$parent;
            return $.extend({}, ($element.offset()), {
                width: $element[0].offsetWidth, height: $element[0].offsetHeight
            });
        },

        show: function () {
            var $dialog = this.$element;
            $dialog.css({ top: 0, left: 0, display: 'block', 'z-index': 1100 });

            var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement;

            var pos = this.getPosition();

            var actualWidth = $dialog[0].offsetWidth;
            var actualHeight = $dialog[0].offsetHeight;

            var percent = .36;  // CUSTOMIZATION - This percentage goes hand and hand with the css.
            var tp;
            switch (placement) {
                case 'bottom':
                    tp = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 }
                    break;
                case 'top':
                    tp = { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 }
                    break;
                case 'left':
                    tp = { top: pos.top + pos.height * percent - actualHeight * percent, left: pos.left - actualWidth }
                    break;
                case 'right':
                    tp = { top: pos.top + pos.height * percent - actualHeight * percent, left: pos.left + pos.width }
                    break;
            }

            // CUSTOMIZATION START:
            if (tp.top < 0) tp.top = 0;
            if (tp.left < 0) tp.left = 0;
            // CUSTOMIZATION END:

            $dialog
                .css(tp)
                .addClass(placement)
                .addClass('in');


            $.fn.modal.Constructor.prototype.show.call(this, arguments); // super
        },

        /** todo entire function was copied just to set the background to 'none'.  need a better way */
        backdrop: function (callback) {
            var that = this
                , animate = this.$element.hasClass('fade') ? 'fade' : ''

            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate

                var appendTo = document.body;
                // CUSTOMIZATION START - Allow the caller to append to places other than just document.body.
                if (this.options.backdropTargetId) {
                    appendTo = $(this.options.backdropTargetId)[0];
                }

                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" style="background:none; z-index:1090" />')
                    .appendTo(appendTo)
                // CUSTOMIZATION END

                if (this.options.backdrop != 'static') {
                    this.$backdrop.click($.proxy(this.hide, this))
                }

                if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

                this.$backdrop.addClass('in')

                doAnimate ?
                    this.$backdrop.one($.support.transition.end, callback) :
                    callback()

            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in')

                $.support.transition && this.$element.hasClass('fade') ?
                    this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
                    this.removeBackdrop()

            } else if (callback) {
                callback()
            }
        }

    });


    /* MODAL POPOVER PLUGIN DEFINITION
     * ======================= */

    $.fn.modalPopover = function (option) {
        return this.each(function () {
            var $this = $(this);
            // ** Customization start **
            //var data = $this.data('modal-popover'); <- original line
            var data = typeof option == 'string' ? $this.data('modal-popover') : undefined; // Make sure to clear out data if we are passing in an object for options.
            // ** Customization end **
            var options = $.extend({}, $.fn.modalPopover.defaults, $this.data(), typeof option == 'object' && option);
            // todo need to replace 'parent' with 'target'
            options['$parent'] = (data && data.$parent) || option.$parent || $(options.target);

            if (!data) $this.data('modal-popover', (data = new ModalPopover(this, options)))

            if (typeof option == 'string') {
                data[option]();
            }
        })
    }

    $.fn.modalPopover.Constructor = ModalPopover

    $.fn.modalPopover.defaults = $.extend({}, $.fn.modal.defaults, {
        placement: 'left',
        keyboard: true,
        backdrop: true, // JK: Customization - added this option
    });


    $(function () {
        $('body').on('click.modal-popover.data-api', '[data-toggle="modal-popover"]', function (e) {
            var $this = $(this);
            var href = $this.attr('href');
            var $dialog = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
            var option = $dialog.data('modal-popover') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $dialog.data(), $this.data());
            option['$parent'] = $this;

            e.preventDefault();

            $dialog
                .modalPopover(option)
                .modalPopover('show')
                .one('hide', function () {
                    $this.focus()
                })
        })
    })

}(window.jQuery);
//
