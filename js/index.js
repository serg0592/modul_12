// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const minWeight = document.querySelector('.minweight__input'); //поле min вес
const maxWeight = document.querySelector('.maxweight__input'); //поле max вес
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
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
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON); // преобразование JSON в объект JavaScript

/*** ОТОБРАЖЕНИЕ ***/

const display = () => { // отрисовка карточек
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  
  while (fruitsList.firstChild) { //удаляем старые элементы
    fruitsList.removeChild(fruitsList.firstChild);
  }

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    let liClassColor;
    switch (fruits[i].color) { //добавляем класс согласно цвету элемента
      case "белый" :
        liClassColor = "white";
        break;
      case "красный" :
        liClassColor = "red";
        break;
      case "оранжевый" :
        liClassColor = "orange";
        break;
      case "желтый" :
        liClassColor = "yellow";
        break;
      case "зеленый" :
        liClassColor = "green";
        break;
      case "голубой" :
        liClassColor = "blue";
        break;
      case "синий" :
        liClassColor = "indigo";
        break;
      case "фиолетовый" :
        liClassColor = "violet";
        break;      
      case "розово-красный" :
        liClassColor = "carmazin";
        break;      
      case "светло-коричневый" :
        liClassColor = "lightbrown";
        break;
      case "черный" :
        liClassColor = "black";
        break;      
    }
    //HTML-параметры нового элемента
    var li = document.createElement('li');
    li.className = `fruit__item fruit_${liClassColor}`;
    li.innerHTML = `<div class = "fruit__info">
                     <div>index: ${i}</div>
                     <div>kind: ${fruits[i].kind}</div>
                     <div>color: ${fruits[i].color}</div>
                     <div>weight (кг): ${fruits[i].weight}</div>
                    </div>`;

    fruitsList.append(li); //размещаем элемент на странице
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

const getRandomInt = (min, max) => { // генерация случайного числа в заданном диапазоне
  return Math.floor(Math.random() * (max - min + 1)) - min;
};

const shuffleFruits = () => { // перемешивание массива
  let result = [];
  let fruitsCopy = fruits;
  while (fruits.length > 0) {
    let rndm = getRandomInt(0, (fruits.length - 1) );
    result.push(fruits[rndm]);
    fruits.splice(rndm, 1,);
  }
  let i = result.length;
  let equalArrs;
  while (i--) { //проверка перемешивания массива
    (result[i] === fruitsCopy[i]) ? (equalArrs = true) : (equalArrs = false);
  }
  if (equalArrs) {
    alert('Порядок фруктов не изменился');
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

const filterFruits = () => { // фильтрация массива
  fruits = fruits.filter(item => {
    // TODO: допишите функцию
    return ( (item.weight >= minWeight.value) && 
             (item.weight <= maxWeight.value) ); //сравнение с полями min вес и max вес
  })
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (fruit1, fruit2) => { //сравнение 2-х элементов по цвету (1)
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['белый', 'красный', 'светло-коричневый', 'оранжевый', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'розово-красный', 'черный'];
  const priority1 = priority.indexOf(fruit1.color);
  const priority2 = priority.indexOf(fruit2.color);
  return priority1 > priority2;
};

const comparationColor2 = (fruit1, fruit2) => { //сравнение 2-х элементов по цвету (2)
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['белый', 'красный', 'светло-коричневый', 'оранжевый', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'розово-красный', 'черный'];
  const position1 = priority.indexOf(fruit1.color);
  const position2 = priority.indexOf(fruit2.color);
  return position1 < position2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n-1-i; j++) {
        if (comparation(arr[j], arr[j+1])) { //вызов функции сравнения по цвету
            let temp = arr[j+1]; 
            arr[j+1] = arr[j]; 
            arr[j] = temp; 
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function swap(arr, firstEl, secondEl) { // функция обмена элементов
      const temp = arr[firstEl];
      arr[firstEl] = arr[secondEl];
      arr[secondEl] = temp;
    }

    function partition(arr, leftLimit, rightLimit) { // функция разделитель
      var pivot = arr[Math.floor((rightLimit + leftLimit) / 2)],
          i = leftLimit,
          j = rightLimit;
      while (i <= j) {
        while ( comparationColor2(arr[i], pivot) ) {
            i++;
        }
        while ( comparationColor(arr[j], pivot) ) {
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
  
    function quickSortAlg(arr, leftLimit, rightLimit) { //алгоритм сортировки
      var index;
      if (arr.length > 1) {
          leftLimit = typeof leftLimit != "number" ? 0 : leftLimit; //проверка левой границы
          rightLimit = typeof rightLimit != "number" ? arr.length - 1 : rightLimit; //проверка правой границы
          index = partition(arr, leftLimit, rightLimit);
          if (leftLimit < index - 1) {
              quickSortAlg(arr, leftLimit, index - 1);
          }
          if (index < rightLimit) {
              quickSortAlg(arr, index, rightLimit);
          }
      }
      return arr;
    }

    quickSortAlg(arr, 0, arr.length - 1 ); //запуск сортировки
  },

  startSort(sort, arr, comparation) { // выполняет сортировку и производит замер времени
    const start = new Date().getTime();

    sortTimeLabel.textContent = 'sorting...';

    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;

    sortTimeLabel.textContent = sortTime;
  }
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  (sortKind === 'bubbleSort') ? (sortKind = 'quickSort') : (sortKind = 'bubbleSort');
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput

  let kind = kindInput.value;
  let color = colorInput.value;
  let weight = weightInput.value;

  if (kind === '') { //проверка "пустого" ввода
    alert('Поле "kind" пустое!');
  } else if (color === '') {
    alert('Поле "color" пустое!');
  } else if (weight === '') {
    alert('Поле "weight" пустое!');
  } else {
    //записываем параметры нового элемента в строку    
    let newFruitJSON = `{"kind": "${kind}", "color": "${color}", "weight": ${weight}}`;
    let newFruit = JSON.parse(newFruitJSON);

    fruits.push(newFruit); //добавляем новый элемент в массив
  }
  display();
});
