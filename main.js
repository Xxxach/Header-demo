"use strict";
let isAnimating = false;
window.addEventListener('scroll', () => {
    if (isAnimating)
        return;
    isAnimating = true;
    requestAnimationFrame(() => {
        const topHeader = document.querySelector('.header__top');
        const navAndPromos = document.querySelector('.nav-and-promos');
        const innerPromoBlocks = document.querySelector('.header__body__inner-promo-blocks');
        if (window.scrollY > 0) {
            if (topHeader) {
                topHeader.classList.add('hidden', 'hide-padding');
            }
            if (innerPromoBlocks) {
                innerPromoBlocks.classList.add('hidden');
            }
            if (navAndPromos) {
                navAndPromos.classList.add('no-gap');
            }
        }
        else {
            if (topHeader) {
                topHeader.classList.remove('hidden', 'hide-padding');
                topHeader.classList.add('show', 'restore-padding');
            }
            if (innerPromoBlocks) {
                innerPromoBlocks.classList.remove('hidden');
                innerPromoBlocks.classList.add('show');
            }
            if (navAndPromos) {
                navAndPromos.classList.remove('no-gap');
            }
        }
        isAnimating = false;
    });
});
const closeDropdown = (button) => {
    const dropdownContent = button.nextElementSibling;
    dropdownContent.classList.remove('drop');
    button.blur();
    button.classList.remove('active');
    button.removeAttribute('data-focused');
};
const handleClick = (button) => {
    const dropdownContent = button.nextElementSibling;
    if (dropdownContent.classList.contains('drop')) {
        closeDropdown(button);
    }
    else {
        document.querySelectorAll('.btn.active').forEach((prevBtn) => {
            closeDropdown(prevBtn);
        });
        dropdownContent.classList.add('drop');
        button.focus();
        button.classList.add('active');
        button.setAttribute('data-focused', '');
    }
};
document.querySelectorAll('.btn').forEach((el) => {
    const btn = el;
    btn.addEventListener('click', () => handleClick(btn));
});
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    let isInsideOpenDrop = false;
    document.querySelectorAll('.drop').forEach((drop) => {
        if (drop.contains(target)) {
            isInsideOpenDrop = true;
        }
    });
    if (!isInsideOpenDrop) {
        document.querySelectorAll('.btn.active').forEach((activeBtn) => {
            closeDropdown(activeBtn);
        });
    }
}, { capture: true });
const toggleButton = document.querySelector('.btn-blue');
const tabsContainer = document.getElementById('tabs');
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab__сontent');
if (!toggleButton || !tabsContainer) {
    throw new Error('Отсутствуют обязательные элементы.');
}
tabsContainer.style.display = 'none';
toggleButton.addEventListener('click', () => {
    if (tabsContainer.style.display === 'flex') {
        tabsContainer.style.display = 'none';
    }
    else {
        tabsContainer.style.display = 'flex';
    }
});
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('tabs-active'));
        contents.forEach((c) => c.classList.add('tabs-hide'));
        tab.classList.add('tabs-active');
        contents[index].classList.remove('tabs-hide');
    });
});
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target !== toggleButton && !tabsContainer.contains(target)) {
        tabsContainer.style.display = 'none';
    }
}, { capture: true });
window.addEventListener('scroll', () => {
    const tabsElement = document.querySelector('.tabs');
    if (!tabsElement)
        return;
    if (window.scrollY > 0) {
        tabsElement.style.top = '90px';
    }
    else {
        tabsElement.style.top = '130px';
    }
});
