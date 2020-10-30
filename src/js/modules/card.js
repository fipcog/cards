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
