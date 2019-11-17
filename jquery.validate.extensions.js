(function ($) {

    /* Extend jquery range validator to work for required checkboxes */

    var defaultRangeValidator = $.validator.methods.range;

    $.validator.methods.range = function (value, element, param) {
        var $element = $(element);
        var min = $element.attr('data-val-range-min');
        var max = $element.attr('data-val-range-max');

        /* When the range is bool, we need to check to see if we have two parameters that aren't numbers */
        if (param.length == 2 && isNaN(param[0]) && isNaN(param[1])) {

            /* Our parameters need to be the same. */
            if (min == max) {
                if (element.type === 'checkbox') {
                    if (min == 'False') {
                        /* If the range is False, False we want to check if it's not checked */
                        return !element.checked;
                    }
                    /* Otherwise check if the checkbox is checked */
                    return element.checked;
                } else {
                    /* If the parameters are the same and it's not a checkbox, we just need to check if the value matches */
                    return $element.val() == min;

                }
            }
        }

        /* Do the default range validation if there's no special case match */
        return defaultRangeValidator.call(this, value, element, param);
    }
})(jQuery);
