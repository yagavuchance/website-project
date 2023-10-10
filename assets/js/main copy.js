/**
* Template Name: Company
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/company-free-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
/*countdown */
// JavaScript code to update the content dynamically
document.addEventListener("DOMContentLoaded", function () {
  // Example data (replace with actual data)
  const weeklyQuestion = "where do you see your business in 5years time?";
  const deadlineDate = new Date("2023-10-12T23:59:59"); // Replace with the actual deadline date and time

  // Function to update the question and deadline content
  function updateContent() {
      const questionElement = document.getElementById("question");
      const deadlineElement = document.getElementById("deadline");
      questionElement.textContent = weeklyQuestion;
      deadlineElement.textContent = "Deadline for entries: " + formatDeadline(deadlineDate);

      // Set the countdown timer to update every second
      setInterval(function () {
          deadlineElement.textContent = "Deadline for entries: " + formatDeadline(deadlineDate);
      }, 1000);
  }

  // Format the deadline date as "Days:Hours:Minutes:Seconds"
  function formatDeadline(deadline) {
      const now = new Date();
      const timeLeft = deadline - now;
      if (timeLeft <= 0) {
          return "Expired";
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      return `${days}days ${hours}h ${minutes}m ${seconds}s left`;
  }

  // Call the function to update the content
  updateContent();
});
//smtp function
function sendmail(){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "chancepediano@gmail.com",
    Password : "C29ACF4DCCB4BBFA0FCBAE77D83A794D43EF",
    To : 'pedianostevoz@gmail.com',
    From : document.getElementById("inputemail").value,
    Subject : "new message", 
    Body : document.getElementById("exampleFormControlTextarea1").value + "" + `<br>`+"Name:" + document.getElementById("inputname").value +
     "" +`<br>` + "Mobile:" + document.getElementById("inputmobile").value
}).then(
  message => alert(message)
);
}

//login & Registration popup

document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const loginForm = document.getElementById("loginForm");
  const overlay = document.createElement("div");

  function showLoginForm() {
      overlay.classList.add("popup-overlay");
      document.body.appendChild(overlay);
      loginForm.style.display = "block";
  }

  function hideLoginForm() {
      overlay.classList.remove("popup-overlay");
      loginForm.style.display = "none";
  }

  function showRegisterForm() {
      overlay.classList.add("popup-overlay");
      document.body.appendChild(overlay);
      // Assuming your registration form is the second form in the loginForm div
      loginForm.getElementsByTagName("form")[1].style.display = "block";
  }

  function hideRegisterForm() {
      overlay.classList.remove("popup-overlay");
      // Assuming your registration form is the second form in the loginForm div
      loginForm.getElementsByTagName("form")[1].style.display = "none";
  }

  loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      showLoginForm();
      hideRegisterForm();
  });

  registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      showRegisterForm();
      hideLoginForm();
  });

  overlay.addEventListener("click", function () {
      hideLoginForm();
      hideRegisterForm();
  });
});

//registration
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const overlay = document.createElement("div");

  function showLoginForm() {
      overlay.classList.add("popup-overlay");
      document.body.appendChild(overlay);
      loginForm.style.display = "block";
  }

  function hideLoginForm() {
      overlay.classList.remove("popup-overlay");
      loginForm.style.display = "none";
  }

  function showRegisterForm() {
      overlay.classList.add("popup-overlay");
      document.body.appendChild(overlay);
      registerForm.style.display = "block";
  }

  function hideRegisterForm() {
      overlay.classList.remove("popup-overlay");
      registerForm.style.display = "none";
  }

  loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      showLoginForm();
      hideRegisterForm();
  });

  registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      showRegisterForm();
      hideLoginForm();
  });

  overlay.addEventListener("click", function () {
      hideLoginForm();
      hideRegisterForm();
  });
});
