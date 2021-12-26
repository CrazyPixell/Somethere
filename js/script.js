'use strict';

const header = document.querySelector('.header');
const nav = document.querySelector('nav');
const navBar = document.querySelector('.header__navbar');
const btnNav = document.querySelector('.header__btn-toggle');
const allSections = document.querySelectorAll('.section');

// Nav toggle
btnNav.addEventListener('click', function (e) {
  nav.classList.toggle('nav--show');
});

// Nav smmoth
nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Sticky nav
const navHeight = navBar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting === false)
    navBar.classList.add('header__navbar--sticky');
  else navBar.classList.remove('header__navbar--sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Tours OOP
class Tour {
  constructor(name, image, location, duration, price) {
    this.name = name;
    this.image = image;
    this.location = location;
    this.duration = duration;
    this.price = price;
  }
}

const tour1 = new Tour(
  'Himalayan adventure',
  'img/tour1.jpg',
  'Nepal',
  7,
  1000
);

const tour2 = new Tour(
  'Carribean Adventure',
  'img/tour2.jpg',
  'Nassau',
  12,
  1500
);

const tour3 = new Tour('Savanna Adventure', 'img/tour3.jpg', 'Kenya', 5, 800);

const tour4 = new Tour('Alpes Adventure', 'img/tour4.jpg', 'Nassau', 4, 600);

class TourList {
  tours = [tour1, tour2, tour3, tour4];

  render() {
    console.log(this.tours);
    const tourContainer = document.querySelector('.featured__tours');
    for (const tour of this.tours) {
      const tourItem = new TourItem(tour);
      const tourEl = tourItem.render();
      tourContainer.append(tourEl);
    }
  }
}

class TourItem {
  constructor(tour) {
    this.tour = tour;
  }

  render() {
    const tourEl = document.createElement('div');
    tourEl.classList.add('tour');
    tourEl.innerHTML = `
   <img src="${this.tour.image}" alt="Tour photo" class="tour__img"/>
   <h4 class="tour__title"><span>${this.tour.name.split(' ')[0]} </span>${
      this.tour.name.split(' ')[1]
    }</h4>
  <div class="tour__location">
    <i class="fas fa-map-marked-alt tour__icon"></i>
    ${this.tour.location}
  </div>
  <div class="tour__detailes">
    <span>${this.tour.duration}</span>days <br />
    ${this.tour.price}<span>$</span>
  </div>  
  `;
    return tourEl;
  }
}

const tourList = new TourList();
tourList.render();
