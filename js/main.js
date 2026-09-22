///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
//// Sticky Header
///////////////////////////////////////

const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down");
    }
    lastScroll = currentScroll < 0 ? 0 : currentScroll;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/// Replacing Anchor Links
/////////////////////////////////////////////////
// https://www.the-art-of-web.com/javascript/remove-anchor-links/

document.querySelectorAll("header a").forEach(function(current) {
    if (!current.hash) return;
    if (current.origin + current.pathname != self.location.href) return;
    (function(anchorPoint) {
        if (anchorPoint) {
            current.addEventListener("click", function(e) {
                anchorPoint.scrollIntoView({ behavior: "smooth" });
                e.preventDefault();
            }, false);
        }
    })(document.querySelector(current.hash));
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/// Read More Buttons
/////////////////////////////////////////////////

var readMoreButtons = document.querySelectorAll(".button.--read-more");

for (var button of readMoreButtons) {
    button.onclick = function(e) {

        var currentButton = e.currentTarget;
        var content = currentButton.closest('article').querySelector('.read-more-content');
        var workDetails = currentButton.closest('article').querySelector('.work-details > div');

        if (currentButton.classList.contains('active')) {
            // CLOSE IT
            // Re-measure in case the content (or viewport) has changed size since it was opened,
            // then force a reflow so the browser has a real starting height to animate down from.
            content.style.maxHeight = `${content.scrollHeight}px`;
            content.offsetHeight;
            content.style.maxHeight = '0px';

            // Actual show toggle
            currentButton.textContent = 'Read More';
            currentButton.classList.remove('active');
            content.classList.remove('open');
            // Remove fixed width
            setTimeout(function() { workDetails.style.minHeight = 0; }, 500);

        } else {
            // OPEN IT
            // Avoid layout shift by setting min height
            workDetails.style.minHeight = `${workDetails.offsetHeight}px`;
            // Actual show toggle
            currentButton.textContent = 'Read Less';
            currentButton.classList.add('active');
            content.classList.add('open');
            // Animate to the content's real height rather than an arbitrary large value,
            // so the transition duration reflects an actual slide instead of jumping open.
            content.style.maxHeight = `${content.scrollHeight}px`;
        }


    }
}

// Keep open panels from clipping if the content reflows to a different
// height (e.g. viewport resize/rotation changes text wrapping).
window.addEventListener('resize', () => {
    document.querySelectorAll('.read-more-content.open').forEach(function(content) {
        content.style.maxHeight = `${content.scrollHeight}px`;
    });
});

/// Animation triggers //////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//// Observer
////////////////////////////////////////////////////////////////

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
});

const observerItem = document.querySelectorAll('.watch');
observerItem.forEach((el) => observer.observe(el));


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//// Nav Bar Highlight
////////////////////////////////////////////////////////////////

// Get The Basics
const bufferDivider = 2; 
const sectionHighLightBufferAmount = window.innerHeight / bufferDivider; 
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li");

// Set an event listener to page scroll
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    // How far we are from the top of the page
    const scrollDistance = scrollY;

    // How far the current section we're looping over is from the top
    const sectionTop = section.offsetTop;

    // Test if section is in view 
    if (scrollDistance >= (sectionTop - sectionHighLightBufferAmount)) {

      // Remove old active classes
      navLinks.forEach(x => x.classList.remove("active"));

      // Get new active id we can use to find the right nav li to highlight
      const activeId = section.getAttribute("id");

      // Loop find and add the active class to nav li
      navLinks.forEach((li) => {
        if (li.classList.contains(activeId))
            li.classList.add("active");
      });
    }	
  });
});


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//// Lightbox
////////////////////////////////////////////////////////////////
const _lightBoxImages = document.querySelectorAll(".lightbox-image");
const _lightBoxResult = document.getElementById("lightbox-result");

let ShowLightBox = (show) => {

    console.log(show)

	if (show) {
		_lightBoxResult.classList.remove("fadeOut");
		_lightBoxResult.classList.add("fadeIn");
	} else {
		_lightBoxResult.classList.remove("fadeIn");
		_lightBoxResult.classList.add("fadeOut");
	}
};


let BuildLightBox = (imageTitle, largeImageURL, imageAlt) => {
	// Dynamically Add To Page
	_lightBoxResult.innerHTML = LightBoxHTML(imageTitle, largeImageURL, imageAlt);
	ShowLightBox(true);

	// Attach Close Button Event Listener
	let closeButtons = document.querySelectorAll(".close-lightbox");
	closeButtons.forEach(function (button) {
		button.addEventListener("click", function () {

            console.log('clicked')

			ShowLightBox(false);
		});
	});
};

let LightBoxHTML = (imageTitle, largeImageURL, imageAlt) => {
    return `<div class="lightBox" id="lightBox">` +
    `<div class="inner-wrap">` +
    `<div class="content">` +
    `<div class="close-lightbox-button close-lightbox"></div>` +
    `<div class="image-box">` +
    `<img src="${largeImageURL}" alt="${imageAlt}"/>` +
    `</div>` +
    `<div class="title">${imageTitle}</div>` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</div>` +
    `<div class="lightBox-background close-lightbox" id="lightBox-background"></div>`;
};

_lightBoxImages.forEach(function (image) {
	image.addEventListener("click", function () {
		let imageTitle = image.getAttribute("title"),
			imageLargeURL = image.getAttribute("data-large-image-url"),
			imageAlt = image.getAttribute("alt");

		BuildLightBox(imageTitle, imageLargeURL, imageAlt);
	});
});