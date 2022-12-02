// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Манго", "color": "зеленый", "weight": 30},
  {"kind": "Питахайя", "color": "розово-красный", "weight": 38},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 58},
  {"kind": "Маракуйя", "color": "фиолетовый", "weight": 44},
  {"kind": "Авокадо", "color": "зеленый", "weight": 73},
  {"kind": "Кивано", "color": "желтый", "weight": 9},
  {"kind": "Дуриан", "color": "желтый", "weight": 23},
  {"kind": "Папайя", "color": "светло-коричневый", "weight": 5}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';



  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.className = 'fruit__info';

    const div_index = document.createElement('div');
    div_index.innerHTML = 'index: ' + i;

    const div_kind = document.createElement('div');
    div_kind.innerHTML = 'kind: ' + fruits[i].kind;

    const div_color = document.createElement('div');
    div_color.innerHTML = 'color: ' + fruits[i].color;

    const div_weight = document.createElement('div');
    div_weight.innerHTML = 'weight (кг): ' + fruits[i].weight;

    switch (fruits[i].color) {
      case 'фиолетовый':
        li.className = 'fruit__item fruit_violet';
        break;
      case 'зеленый':
        li.className = 'fruit__item fruit_green';
        break;
      case 'розово-красный':
        li.className = 'fruit__item fruit_carmazin';
        break;
      case 'желтый':
        li.className = 'fruit__item fruit_yellow';
        break;
      case 'светло-коричневый':
        li.className = 'fruit__item fruit_lightbrown';
        break;
    }

    fruitsList.appendChild(li);
    li.appendChild(div);
    div.appendChild(div_index);
    div.appendChild(div_kind);
    div.appendChild(div_color);
    div.appendChild(div_weight);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let copyFruits = fruits.slice();

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let i = getRandomInt(0, fruits.length - 1);
    result.push(fruits[i]);
    fruits.splice(i, 1);
  }

  if (JSON.stringify(copyFruits) === JSON.stringify(result)) {
    alert('Проядок массива не изменился');
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = JSON.parse(fruitsJSON);
  const minWeightInput = document.querySelector('.minweight__input').value;
  const maxWeightInput = document.querySelector('.maxweight__input').value;
  return fruits.filter((item) => {
    // TODO: допишите функцию
    if (item.weight >= minWeightInput && item.weight <= maxWeightInput)
      return item;
  })
    .map(item => item);

};

filterButton.addEventListener('click', () => {
  if (document.querySelector('.minweight__input').value == '' || document.querySelector('.maxweight__input').value == '') {
    alert('Введите значения min и max для фильтрации');
  } else {
    fruits = filterFruits();
  }

  document.querySelector('.minweight__input').value = '';
  document.querySelector('.maxweight__input').value = '';
  display();
});



/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  const kindNew = kindInput.value;
  const colorNew = colorInput.value;
  const weightNew = weightInput.value;

  if (kindInput.value == '' || colorInput.value == '' || weightInput.value == '') {
    alert('Вы ввели пустое поле');
  } else {
    let temp = JSON.parse(fruitsJSON);
    temp.push({ 'kind': kindNew, 'color': colorNew, 'weight': weightNew });
    fruitsJSON = JSON.stringify(temp);
    fruits = JSON.parse(fruitsJSON);
  }

  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';

  display();

});

