// ЛР 2. Calculator. JavaScript
// Митрохина Анастасия, гр. ИБМ3-54Б
// Логика построена по методичке: window.onload, переменные a/b/selectedOperation,
// доступ к элементам через getElementById/querySelectorAll, обработчики через .onclick

window.onload = function () {

  // --- Шаг 1: переменные для хранения чисел и операции ---
  let a = '';                    // первое число
  let b = '';                    // второе число
  let expressionResult = '';     // результат вычисления
  let selectedOperation = null;  // выбранная операция

  // --- Шаг 2: доступ к элементам калькулятора ---
  const outputElement = document.getElementById('result');
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

  // --- Шаг 3: формирование числа по нажатой цифре ---
  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
        a += digit;
      }
      outputElement.innerHTML = a || '0';
    } else {
      if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
        b += digit;
      }
      outputElement.innerHTML = b || '0';
    }
  }

  // --- Шаг 4: обработчики цифровых кнопок ---
  digitButtons.forEach((button) => {
    button.onclick = function () {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    };
  });

  // вычисление по выбранной операции
  function compute(x, y, op) {
    switch (op) {
      case 'x': return x * y;
      case '+': return x + y;
      case '-': return x - y;
      case '/': return y === 0 ? 0 : x / y;
      default: return y;
    }
  }

  // Задания 9-10 (накапливаемое сложение/вычитание): если оба числа уже введены
  // и снова выбирается операция без нажатия "=", сначала считаем промежуточный
  // результат и продолжаем накапливать его дальше — как в обычном калькуляторе.
  function chooseOperation(op) {
    if (a === '') return;
    if (selectedOperation && b !== '') {
      expressionResult = compute(+a, +b, selectedOperation);
      a = expressionResult.toString();
      outputElement.innerHTML = a;
      b = '';
    }
    selectedOperation = op;
  }

  document.getElementById('btn_op_mult').onclick = function () { chooseOperation('x'); };
  document.getElementById('btn_op_plus').onclick = function () { chooseOperation('+'); };
  document.getElementById('btn_op_minus').onclick = function () { chooseOperation('-'); };
  document.getElementById('btn_op_div').onclick = function () { chooseOperation('/'); };

  // --- Шаг 5: кнопка очистки ---
  document.getElementById('btn_op_clear').onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = '0';
  };

  // --- Шаг 6: кнопка равно ---
  document.getElementById('btn_op_equal').onclick = function () {
    if (a === '' || b === '' || !selectedOperation) return;
    expressionResult = compute(+a, +b, selectedOperation);
    a = expressionResult.toString();
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
  };

  // Вспомогательная функция: применить операцию к текущему вводимому числу (a или b)
  function applyToCurrentNumber(fn) {
    if (!selectedOperation) {
      if (a === '') return;
      a = fn(Number(a)).toString();
      outputElement.innerHTML = a;
    } else {
      if (b === '') return;
      b = fn(Number(b)).toString();
      outputElement.innerHTML = b;
    }
  }

  // Задание 1: смена знака +/-
  document.getElementById('btn_op_sign').onclick = function () {
    applyToCurrentNumber((n) => n * -1);
  };

  // Задание 2: процент
  document.getElementById('btn_op_percent').onclick = function () {
    applyToCurrentNumber((n) => n / 100);
  };

  // Задание 3: backspace — стереть последнюю введённую цифру
  document.getElementById('btn_backspace').onclick = function () {
    if (!selectedOperation) {
      a = a.slice(0, -1);
      outputElement.innerHTML = a || '0';
    } else {
      b = b.slice(0, -1);
      outputElement.innerHTML = b || '0';
    }
  };

  // Задание 5: квадратный корень √
  document.getElementById('btn_sqrt').onclick = function () {
    applyToCurrentNumber((n) => Math.sqrt(n));
  };

  // Задание 6: возведение в квадрат x²
  document.getElementById('btn_square').onclick = function () {
    applyToCurrentNumber((n) => n * n);
  };

  // Задание 7: факториал x!
  function factorial(n) {
    if (n < 0) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }
  document.getElementById('btn_factorial').onclick = function () {
    applyToCurrentNumber((n) => factorial(Math.round(n)));
  };

  // Задание 8: кнопка добавления сразу трёх нулей (000)
  document.getElementById('btn_triple_zero').onclick = function () {
    onDigitButtonClicked('0');
    onDigitButtonClicked('0');
    onDigitButtonClicked('0');
  };

  // Задание 12: индивидуальная операция — обратное число (1/x)
  document.getElementById('btn_reciprocal').onclick = function () {
    applyToCurrentNumber((n) => (n === 0 ? 0 : 1 / n));
  };

  // Задание 4: смена цвета фона страницы по кнопке (циклический перебор палитры)
  const bgPalette = ['#121212', '#141c14', '#12172b', '#241227', '#241a10'];
  let bgIndex = 0;
  document.getElementById('btn_bg_color').onclick = function () {
    bgIndex = (bgIndex + 1) % bgPalette.length;
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = bgPalette[bgIndex];
  };

  // Задание 11: смена цвета окна вывода результата по кнопке
  const resultPalette = ['#000000', '#1db954', '#2e77ff', '#8b5cf6', '#ff5252'];
  let resultIndex = 0;
  document.getElementById('btn_result_color').onclick = function () {
    resultIndex = (resultIndex + 1) % resultPalette.length;
    outputElement.style.background = resultPalette[resultIndex];
  };

  // --- Оформление из ЛР1: переключение тёмной/светлой темы ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.onclick = function () {
    document.body.classList.toggle('light');
    themeToggleBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  };

  // --- Оформление из ЛР1: выпадающий список акцентного цвета ---
  const accentSelect = document.getElementById('accent-select');
  accentSelect.onchange = function (e) {
    document.body.classList.remove('theme-green', 'theme-blue', 'theme-purple');
    document.body.classList.add(e.target.value);
  };
  document.body.classList.add('theme-green');
};
