(function () {
    'use strict';

    // append the current year to the end of the tag
    var year = new Date().getFullYear();
    document.querySelector('footer p').innerHTML += year;

    // Page view counter

    var namespace = "068ac0d2-bee3-4e21-a930-0e615521c67f"
    var key = "cf0f82ad-8274-4a56-bf61-9c5eba359b60"

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.countapi.xyz/hit/${namespace}/${key}`);
    xhr.responseType = "json";
    xhr.onload = function() {
        document.getElementById("vCount").innerText += ` ${this.response.value}`
    }
    xhr.send();

}());