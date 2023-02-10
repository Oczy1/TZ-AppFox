/* Проверка поддержки webp, добавление класса webp или по-webp для HTML */
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}





export function scrollclick() {
    const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset; //- document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }
}



export function parallax() {
    document.addEventListener("mousemove", parallax);

    function parallax(e) {
        document.querySelectorAll(".object").forEach(function (move) {

            var moving_value = move.getAttribute("data-value");
            var x = (e.clientX * moving_value) / 250;
            var y = (e.clientY * moving_value) / 250;

            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
}

export function animation() {
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }
    let options = {
        threshold: [0.5]
    };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.animation');
    for (let elm of elements) {
        observer.observe(elm);
    }
}



export function accardeon() {
    const buttons = document.querySelectorAll(".faq-accardeon__toggle");

    buttons.forEach((button) => {
        button.addEventListener("click", () =>
            button.parentElement.classList.toggle("active")
        );
    });

}


export function toggleAccardeon() {
    //uses classList, setAttribute, and querySelectorAll
    //if you want this to work in IE8/9 youll need to polyfill these
    (function () {
        var d = document,
            accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
            setAria,
            setAccordionAria,
            switchAccordion,
            touchSupported = ('ontouchstart' in window),
            pointerSupported = ('pointerdown' in window);

        skipClickDelay = function (e) {
            e.preventDefault();
            e.target.click();
        }

        setAriaAttr = function (el, ariaType, newProperty) {
            el.setAttribute(ariaType, newProperty);
        };
        setAccordionAria = function (el1, el2, expanded) {
            switch (expanded) {
                case "true":
                    setAriaAttr(el1, 'aria-expanded', 'true');
                    setAriaAttr(el2, 'aria-hidden', 'false');
                    break;
                case "false":
                    setAriaAttr(el1, 'aria-expanded', 'false');
                    setAriaAttr(el2, 'aria-hidden', 'true');
                    break;
                default:
                    break;
            }
        };
        //function
        switchAccordion = function (e) {
            console.log("triggered");
            e.preventDefault();
            var thisAnswer = e.target.parentNode.nextElementSibling;
            var thisQuestion = e.target;
            if (thisAnswer.classList.contains('is-collapsed')) {
                setAccordionAria(thisQuestion, thisAnswer, 'true');
            } else {
                setAccordionAria(thisQuestion, thisAnswer, 'false');
            }
            thisQuestion.classList.toggle('is-collapsed');
            thisQuestion.classList.toggle('is-expanded');
            thisAnswer.classList.toggle('is-collapsed');
            thisAnswer.classList.toggle('is-expanded');

            thisAnswer.classList.toggle('animateIn');
        };
        for (var i = 0, len = accordionToggles.length; i < len; i++) {
            if (touchSupported) {
                accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
            }
            if (pointerSupported) {
                accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
            }
            accordionToggles[i].addEventListener('click', switchAccordion, false);
        }
    })();

}