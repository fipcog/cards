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



