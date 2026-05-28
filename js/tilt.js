const tiltEffectSettings = {
    max: 15, // max tilt rotation (degrees (deg))
    transition: true,
    perspective: 400, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
};

const cards = document.querySelectorAll(".picture-gallery img");

const trigger = document.querySelector(".tilt-canvas");


trigger.addEventListener("mouseenter", cardMouseEnter);
trigger.addEventListener("mousemove", cardMouseMove);
trigger.addEventListener("mouseleave", cardMouseLeave);


function cardMouseEnter(event) {
    setTransition(event);
}

function cardMouseMove(event) {
    const card = trigger;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth / 2;
    const centerY = card.offsetTop + cardHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1) * tiltEffectSettings.max * mouseY / (cardHeight / 2);
    const rotateYUncapped = (-1) * tiltEffectSettings.max * mouseX / (cardWidth / 2);
    //const rotateXUncapped = (+1) * tiltEffectSettings.max * mouseX / (cardHeight / 2);
    //const rotateYUncapped = (-1) * tiltEffectSettings.max * mouseY / (cardWidth / 2);
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);


    cards.forEach(card => {
        card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
    });
}

function cardMouseLeave(event) {
    cards.forEach(card => {
        card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        setTransition(event);
    });
}

function setTransition(event) {
    cards.forEach(card => {
        clearTimeout(card.transitionTimeoutId);
        card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
        card.transitionTimeoutId = setTimeout(() => {
            card.style.transition = "";
        }, tiltEffectSettings.speed);
    });
}