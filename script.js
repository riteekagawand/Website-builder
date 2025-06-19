let selectedElement = null;

// Enable dragging for all elements and sections
document.querySelectorAll('.element, .section').forEach(elem => {
  elem.addEventListener('dragstart', e => {
    const type = elem.dataset.type || 'section';
    const section = elem.dataset.section || '';
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("section", section);
  });
});

// Handle dropping on canvas or inside droppable sections
document.querySelectorAll('#canvas, .droppable').forEach(dropZone => {
  dropZone.addEventListener('dragover', e => e.preventDefault());
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const sectionType = e.dataTransfer.getData("section");

    const dropTarget = e.target.closest('.droppable') || document.getElementById('canvas');

    if (type === 'section') {
      const sectionEl = createSection(sectionType);
      dropTarget.appendChild(sectionEl);
      return;
    }

    const element = createElement(type);
    dropTarget.appendChild(element);
    selectElement(element);
  });
});

// Create draggable elements
function createElement(type) {
  let newEl;
  switch (type) {
    case 'text':
      newEl = document.createElement('div');
      newEl.textContent = 'Edit this text';
      newEl.setAttribute('contenteditable', true);
      break;
    case 'image':
      newEl = document.createElement('img');
      newEl.src = 'https://via.placeholder.com/150';
      newEl.style.maxWidth = '100%';
      break;
    case 'button':
      newEl = document.createElement('button');
      newEl.textContent = 'Click Me';
      newEl.setAttribute('contenteditable', true);
      break;
  }

  newEl.classList.add('draggable');
  newEl.style.fontSize = '16px';
  newEl.style.color = '#000';
  newEl.style.backgroundColor = '#ffffff';
  newEl.setAttribute('draggable', true);
  newEl.addEventListener('click', () => selectElement(newEl));
  newEl.addEventListener('dragstart', dragStart);
  newEl.addEventListener('dragend', dragEnd);
  return newEl;
}

// Create section blocks
function createSection(type) {
  const section = document.createElement('section');
  section.classList.add(type);

  let content = '';

if (type === 'header') {
  content = `
    <header class="custom-header">
      <div class="header-container droppable">
        <a class="brand" contenteditable="true">
          <svg class="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Tailblocks</span>
        </a>
        <nav class="nav-links">
          <a contenteditable="true">First Link</a>
          <a contenteditable="true">Second Link</a>
          <a contenteditable="true">Third Link</a>
          <a contenteditable="true">Fourth Link</a>
        </nav>
        <button class="header-btn" contenteditable="true">
          Button
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  `;
}


 else if (type === 'hero') {
    content = `
      <div class="hero-container droppable">
        <div class="hero-image">
          <img alt="hero" src="https://dummyimage.com/720x600" />
        </div>
        <div class="hero-content">
          <h1 contenteditable="true">Before they sold out<br/>readymade gluten</h1>
          <p contenteditable="true">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag.
          </p>
          <div class="hero-buttons">
            <button contenteditable="true">Primary</button>
            <button contenteditable="true">Secondary</button>
          </div>
        </div>
      </div>
    `;}

else if (type === 'about') {
  content = `
    <section class="custom-about">
      <div class="about-container droppable">
        <div class="about-image">
          <img src="https://dummyimage.com/500x400" alt="about" />
        </div>
        <div class="about-text">
          <h2 contenteditable="true">About Our Company</h2>
          <p contenteditable="true">
            We specialize in delivering high-quality solutions for businesses around the globe. Our team is passionate about innovation, design, and technology.
          </p>
          <button class="about-btn" contenteditable="true">Learn More</button>
        </div>
      </div>
    </section>
  `;
}

else if (type === 'footer') {
  content = `
    <footer class="custom-footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a class="brand" contenteditable="true">
            <svg class="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>Tailblocks</span>
          </a>
          <p contenteditable="true">Air plant banjo lyft occupy retro adaptogen indego</p>
        </div>
        <div class="footer-columns">
          ${[...Array(4)].map(() => `
            <div class="footer-col">
              <h2 contenteditable="true">CATEGORIES</h2>
              <ul>
                <li><a contenteditable="true">First Link</a></li>
                <li><a contenteditable="true">Second Link</a></li>
                <li><a contenteditable="true">Third Link</a></li>
                <li><a contenteditable="true">Fourth Link</a></li>
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="footer-bottom">
        <p contenteditable="true">© 2020 Tailblocks — <a href="#" contenteditable="true">@knyttneve</a></p>
        <div class="footer-icons">
          <a><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
          <a><svg viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/></svg></a>
          <a><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
        </div>
      </div>
    </footer>
  `;
}

  section.innerHTML = content;

  // Allow selection of children inside section
  section.querySelectorAll('*').forEach(child => {
    child.addEventListener('click', e => {
      e.stopPropagation(); // prevent section itself from being selected
      selectElement(child);
    });
  });

  section.addEventListener('click', () => selectElement(section));
  return section;
}

// Select and populate properties panel
function selectElement(el) {
  document.querySelectorAll('.draggable, section').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  selectedElement = el;

  const isImg = el.tagName === 'IMG';
  document.getElementById('prop-text').value = isImg ? el.src : el.textContent;
  document.getElementById('prop-font-size').value = parseInt(getComputedStyle(el).fontSize || 16);
  document.getElementById('prop-color').value = rgbToHex(el.style.color || "#000");
  document.getElementById('prop-bg').value = rgbToHex(el.style.backgroundColor || "#fff");
  document.getElementById('prop-width').value = parseInt(el.style.width || 100);
}

// Live update style and content
document.getElementById('property-form').addEventListener('input', () => {
  if (!selectedElement) return;
  const isImg = selectedElement.tagName === 'IMG';
  const text = document.getElementById('prop-text').value;
  const fontSize = document.getElementById('prop-font-size').value + 'px';
  const color = document.getElementById('prop-color').value;
  const bg = document.getElementById('prop-bg').value;
  const width = document.getElementById('prop-width').value + '%';

  if (isImg) {
    selectedElement.src = text;
  } else {
    selectedElement.textContent = text;
  }

  selectedElement.style.fontSize = fontSize;
  selectedElement.style.color = color;
  selectedElement.style.backgroundColor = bg;
  selectedElement.style.width = width;
});

// Duplicate selected element
document.getElementById('duplicate').addEventListener('click', () => {
  if (!selectedElement) return;
  const clone = selectedElement.cloneNode(true);
  clone.classList.remove('selected');

  // Re-attach handlers
  clone.addEventListener('click', () => selectElement(clone));
  clone.addEventListener('dragstart', dragStart);
  clone.addEventListener('dragend', dragEnd);

  // If it's a section, add listener to all its children
  clone.querySelectorAll('*').forEach(child => {
    child.addEventListener('click', e => {
      e.stopPropagation();
      selectElement(child);
    });
  });

  document.getElementById('canvas').appendChild(clone);
  selectElement(clone);
});

// Delete selected element
document.getElementById('delete').addEventListener('click', () => {
  if (!selectedElement) return;
  selectedElement.remove();
  selectedElement = null;
});

document.getElementById('preview').addEventListener('click', () => {
  const canvasContent = document.getElementById('canvas').innerHTML;

  const previewWindow = window.open('', '_blank');

  previewWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Website Preview</title>
      <link rel="stylesheet" href="style.css">
      <style>
        html, body {
          height: auto;
          min-height: 100%;
          margin: 0;
          padding: 0;
          overflow-y: auto;
        }
        body {
          display: flex;
          flex-direction: column;
        }
        main.preview-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        section {
          width: 100%;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        button {
          max-width: 100%;
        }
      </style>
    </head>
    <body>
      <main class="preview-container">
        ${canvasContent}
      </main>
    </body>
    </html>
  `);

  previewWindow.document.close();
});



// Repositioning drag
let offsetX, offsetY;

function dragStart(e) {
  const rect = this.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
}

function dragEnd(e) {
  this.style.position = 'absolute';
  this.style.left = (e.clientX - offsetX) + 'px';
  this.style.top = (e.clientY - offsetY) + 'px';
}

// Helper: Convert RGB to HEX
function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  const result = rgb.match(/\d+/g);
  return "#" + result.map(x => (+x).toString(16).padStart(2, '0')).join('');
}
