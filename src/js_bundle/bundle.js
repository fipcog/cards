(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

const createCard = require('./modules/card');

const cardsList = document.querySelector(".main__card_list");
let cards = [];

 const fetchCardsData = async () => {
    const URL = 'https://run.mocky.io/v3/fe688d84-8cca-4b09-b589-eaac6f2c9675';
    const response = await fetch(URL);

     if (!response.ok) {
         throw new Error(`Error: ${response.status}`)
     }

     return await response.json();
};

const  renderCards = arr => {
    arr.forEach(card => {
        const html = createCard(card.header, card.src, card.size, card.price);
        cardsList.insertAdjacentHTML("beforeend", html)
    });
};

const reRenderCards = cards => {
    renderCards(cards)
};

const addMoreCards = () => {

    fetchCardsData()
        .then(data => {
            cards.push(...data);
            renderCards(data);
        })
        .catch(error => alert(error));
};

addMoreCards();

const onScrollHandler = () => {
    const docBottom = document.documentElement.getBoundingClientRect().bottom;
    const clientHeight = document.documentElement.clientHeight;
    const isBottom = docBottom === clientHeight;

    if(isBottom) {
        addMoreCards();
    }
}

document.addEventListener("scroll", onScrollHandler);




},{"./modules/card":2}],2:[function(require,module,exports){
'use strict';

module.exports = function (head, src, size, price) {
    return `<li class="main__card_list_item">
        <article class="main__card">
            <h2 class="main__card__header">${head}</h2>
            <div class="main__card__img_wrapper">
                <img class="main__card_img" src=${src} alt="link">
            </div>
            <div class="main__card_wrapper">
                <span class="main__card_size"><b>Size:</b> ${size}</span>
                <span class="main__card_prise"><b>Price:</b> ${price}</span>
            </div>
        </article>
    </li>`
}

},{}]},{},[1]);
