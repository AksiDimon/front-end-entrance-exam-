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


// main.js

// Ключ в localStorage
const STORAGE_KEY = 'resumeData';

// Собираем все редактируемые элементы
function getEditableFields() {
  return Array.from(document.querySelectorAll('[contenteditable="true"]'))
    // фильтруем только те, у кого есть id
    .filter(el => el.id);
}

// Сохраняем текущее содержимое всех полей
function saveAllFields() {
  const data = {};
  getEditableFields().forEach(el => {
    data[el.id] = el.innerText.trim();
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Загружаем данные из localStorage и заполняем поля
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


// Устанавливаем слушатели
document.addEventListener('DOMContentLoaded', () => {
  // Восстановим данные
  loadAllFields();

  // На каждое изменение сохраняем
  getEditableFields().forEach(el => {
    // можно использовать 'input' или 'blur'
    el.addEventListener('input', saveAllFields);
    // если хотите сохранять только при потере фокуса:
    // el.addEventListener('blur', saveAllFields);
  });
});

