function reloadPage() {
    location.reload();
    window.location.href = "";
  }
  
  function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      section.scrollIntoView({ behavior: 'smooth' });
  }


  const toggleBtn = document.querySelector('.toggle_btn')
  const toggleBtnIcon = document.querySelector('.toggle_btn i')
  const dropDownMenu = document.querySelector('.dropdown_menu')
  var navUL = document.querySelector('nav ul');
  
  toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
  }
  
  function closeDropDownMenu() {
      dropDownMenu.classList.remove('open');
    }
  
    document.addEventListener('click', function (event) {
      const targetElement = event.target;
      if (!targetElement.closest('.dropdown_menu') && !targetElement.closest('.toggle_btn')) {
        closeDropDownMenu();
      }
    });
    
  
  window.addEventListener('scroll', function () {
      closeDropDownMenu();
  });
  




const REVSC = document.querySelectorAll('.REV');

function checkCardVisibility() {
  const threshold = 0.7; // Adjust this value as needed

  REVSC.forEach(REV => {
    const rect = REV.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate the threshold offset based on the card's height
    const thresholdOffset = rect.height * (1 - threshold);

    if (rect.top < windowHeight - thresholdOffset && rect.bottom >= 0) {
      REV.classList.add('animate-reveal');
    } else {
      REV.classList.remove('animate-reveal');
    }
  });
}

// Initial check
checkCardVisibility();

// Listen for scroll events
window.addEventListener('scroll', checkCardVisibility);



const homet = document.querySelectorAll('.homie');

function checkhomeVisibility() {
  const threshold = 1; // Adjust this value as needed

  homet.forEach(HOM => {
    const hoe = HOM.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate the threshold offset based on the card's height
    const thresholdOffset = hoe.height * (1 - threshold);

    if (hoe.top < windowHeight - thresholdOffset && hoe.bottom >= 0) {
        HOM.classList.add('animate-reveal');
    }
  });
}

// Initial check
checkhomeVisibility();

// Listen for scroll events
window.addEventListener('scroll', checkhomeVisibility);




const ServiceSection = document.querySelector('.SERVICES');
const cards = ServiceSection.querySelectorAll('.card1, .card2, .card3');


const optionsService = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4 // Adjust this value to control when the reveal effect is triggered
  };
  
  const revealCallbackService = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach(card => {
          card.classList.add('animate-reveal');
        });
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observerService = new IntersectionObserver(revealCallbackService, optionsService);
  observerService.observe(ServiceSection);
  

////////////**********STICKY NAV************///////////////

$(document).ready(function(){
    $(window).on('scroll', function(){
      if ($(window).scrollTop()) {
            $("header").addClass('bgc');
      }else{
            $("header").removeClass('bgc');
      }
    });
  });

  