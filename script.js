(function () {
    'use strict';

    // append the current year to the end of the tag
    var year = new Date().getFullYear();
    document.querySelector('footer p').innerHTML += year;

}());