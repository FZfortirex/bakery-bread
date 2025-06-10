const slider = document.querySelector('.menus');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

document.querySelectorAll('.card').forEach(card => {
  const item = card.querySelector('.item');
  const itemBack = card.querySelector('.item-back');

  itemBack.style.display = 'none';

  item.addEventListener('mouseenter', () => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.display = 'none';
      itemBack.style.display = 'flex';
      itemBack.style.opacity = 0;
      itemBack.offsetHeight;
      itemBack.style.opacity = 1;
    }, 100);
  });

  itemBack.addEventListener('mouseleave', () => {
    itemBack.style.opacity = 0;
    setTimeout(() => {
      itemBack.style.display = 'none';
      item.style.display = 'flex';
      item.style.opacity = 0;
      item.offsetHeight;
      item.style.opacity = 1;
    }, 50);
  });

  card.addEventListener('click', () => {
    if (item.style.display !== 'none') {
      item.style.opacity = 0;
      setTimeout(() => {
        item.style.display = 'none';
        itemBack.style.display = 'flex';
        itemBack.style.opacity = 0;
        itemBack.offsetHeight;
        itemBack.style.opacity = 1;
      }, 100);
    } else {
      itemBack.style.opacity = 0;
      setTimeout(() => {
        itemBack.style.display = 'none';
        item.style.display = 'flex';
        item.style.opacity = 0;
        item.offsetHeight;
        item.style.opacity = 1;
      }, 50);
    }
  });
});

let isDown = false;
let startX;
let scrollLeft;

const scrollAmount = 250;

function updateButtons() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

  if (slider.scrollLeft <= 0) {
    btnLeft.style.visibility = 'hidden';
  } else {
    btnLeft.style.visibility = 'visible';
  }

  if (slider.scrollLeft >= maxScrollLeft - 1) {
    btnRight.style.visibility = 'hidden';
  } else {
    btnRight.style.visibility = 'visible';
  }
}

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
  updateButtons();
});

btnLeft.addEventListener('click', () => {
  slider.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

btnRight.addEventListener('click', () => {
  slider.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

slider.addEventListener('scroll', () => {
  updateButtons();
});

updateButtons();