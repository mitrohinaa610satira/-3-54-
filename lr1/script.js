// ЛР 1. Calculator — логика калькулятора и переключение тем
// Митрохина Анастасия, гр. ИБМ3-54Б

const resultEl = document.getElementById('result');

let current = '0';
let previous = null;
let operator = null;
let resetOnNextDigit = false;

function updateDisplay() {
  resultEl.textContent = current;
}

function inputDigit(digit) {
  if (current === '0' || resetOnNextDigit) {
    current = digit;
    resetOnNextDigit = false;
  } else {
    current += digit;
  }
  updateDisplay();
}

function inputDot() {
  if (resetOnNextDigit) {
    current = '0';
    resetOnNextDigit = false;
  }
  if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  resetOnNextDigit = false;
  updateDisplay();
}

function toggleSign() {
  if (current !== '0') {
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
  }
  updateDisplay();
}

function toPercent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

function compute(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case 'x': return a * b;
    case '/': return b === 0 ? 0 : a / b;
    default: return b;
  }
}

function chooseOperator(op) {
  if (operator && !resetOnNextDigit) {
    equals();
  }
  previous = current;
  operator = op;
  resetOnNextDigit = true;
}

function equals() {
  if (operator === null || previous === null) return;
  const result = compute(parseFloat(previous), parseFloat(current), operator);
  current = String(Math.round(result * 1e10) / 1e10);
  operator = null;
  previous = null;
  resetOnNextDigit = true;
  updateDisplay();
}

// --- привязка кнопок ---
document.querySelectorAll('[id^="btn_digit_"]').forEach((btn) => {
  if (btn.id === 'btn_digit_dot') {
    btn.addEventListener('click', inputDot);
  } else {
    const digit = btn.id.replace('btn_digit_', '');
    btn.addEventListener('click', () => inputDigit(digit));
  }
});

document.getElementById('btn_op_clear').addEventListener('click', clearAll);
document.getElementById('btn_op_sign').addEventListener('click', toggleSign);
document.getElementById('btn_op_percent').addEventListener('click', toPercent);
document.getElementById('btn_op_plus').addEventListener('click', () => chooseOperator('+'));
document.getElementById('btn_op_minus').addEventListener('click', () => chooseOperator('-'));
document.getElementById('btn_op_mult').addEventListener('click', () => chooseOperator('x'));
document.getElementById('btn_op_div').addEventListener('click', () => chooseOperator('/'));
document.getElementById('btn_op_equal').addEventListener('click', equals);

// --- п.12 - переключение тёмной/светлой темы ---
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// --- п.17 - выпадающий список смены акцентного цвета ---
const accentSelect = document.getElementById('accent-select');
accentSelect.addEventListener('change', (e) => {
  document.body.classList.remove('theme-green', 'theme-blue', 'theme-purple');
  document.body.classList.add(e.target.value);
});
document.body.classList.add('theme-green');
