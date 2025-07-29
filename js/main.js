/* global html2PDF */

const btn = document.getElementById('download-btn');
const page = document.getElementById('page');
console.log(btn, page, '😍')

btn.addEventListener('click', function(){
  html2PDF(page, {
    jsPDF: {
      format: 'a4',
    },
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    },
    imageType: 'image/jpeg',
    output: './pdf/generate.pdf'
  });
});


const STORAGE_KEY = 'resumeData';


function getEditableFields() {
  return Array.from(document.querySelectorAll('[contenteditable="true"]'))
    .filter(el => el.id);
}


function saveAllFields() {
  const data = {};
  getEditableFields().forEach(el => {
    data[el.id] = el.innerText.trim();
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


function loadAllFields() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const data = JSON.parse(raw);
  getEditableFields().forEach(el => {
    if (data[el.id] != null) {
      el.innerText = data[el.id];
    }
  });
}



document.addEventListener('DOMContentLoaded', () => {

  loadAllFields();

  getEditableFields().forEach(el => {
    el.addEventListener('input', saveAllFields);
    // или сохранять только при потере фокуса:
    // el.addEventListener('blur', saveAllFields);
  });
});

