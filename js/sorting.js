const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButtonKind = document.querySelector('.sort__action__btn_kind'); // кнопка сортировки kind
const sortActionButtonColor = document.querySelector('.sort__action__btn_color'); // кнопка сортировки color
const sortActionButtonWeight = document.querySelector('.sort__action__btn_weight'); // кнопка сортировки weight

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationWeight = (element1, element2) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return element1.weight > element2.weight ? true : false;
};

const comparationKind = (element1, element2) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return element1.kind > element2.kind ? true : false;
};

const comparationColor = (element1, element2) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return element1.color > element2.color ? true : false;
};

function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

function partition(arr, comparation, left, right) {
  let pivot = arr[Math.floor((right + left) / 2)];
  i = left;
  j = right;
  while (i <= j) {
    while (comparation(pivot, arr[i])) {
      i++;
    }

    while (comparation(arr[j], pivot)) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function startQuickSort(arr, comparation, left, right) {
  let index;
  if (arr.length > 1) {
    left = typeof left != 'number' ? 0 : left;
    right = typeof right != 'number' ? arr.length - 1 : right;
    index = partition(arr, comparation, left, right);
    if (left < index - 1) {
      startQuickSort(arr, comparation, left, index - 1);
    }
    if (index < right) {
      startQuickSort(arr, comparation, index, right);
    }
  }
  return arr;

}

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = fruits.length - 1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },


  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    return startQuickSort(arr, comparation);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = performance.now();
    sort(arr, comparation);
    const end = performance.now();
    sortTime = (end - start) + ' ' + `ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind == 'bubbleSort' ? 'quickSort' : 'bubbleSort';

  sortKindLabel.textContent = sortKind;

});

sortActionButtonKind.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationKind);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

sortActionButtonColor.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

sortActionButtonWeight.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationWeight);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});