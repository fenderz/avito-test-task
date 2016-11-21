var DEFAULT_CLASS = 'list__item';
var FLOODED_CLASS = 'list__item_flood';
var arr = [5, 2, 5, 2, 4, 6, 1, 2, 4, 5, 7, 8, 1, 5, 2, 4, 6, 1, 2, 4, 5, 9, 1, 5, 2, 4, 6, 1, 2, 4, 5];
var conteinerNode = document.querySelector('.js-list');

var className = DEFAULT_CLASS;

// Временное хранилище для затопленных столбцов
var buffer = [];
// Индексы затопленных столбцов
var drowned = [];
// Индекс максимального столбца в buffer
var m = 0;
// Индекс левой границы затопленных столбцов
var i = 0;
// Индекс правой границы затопленных столбцов
var j = 0;
var vol = 0;
var l = arr.length;

while (i < l) {
    j = i + 1;
    m = 0;

    // Ищем столбец с меньшим объемом
    // либо упираемся в конец
    while (arr[i] > arr[j] && j < l) {
        buffer.push(j);
        // Запоминаем индекс максимального элемента
        // для случая если добрались до конца массива
        // Индекс массива buffer
        if (arr[buffer[m]] < arr[j]) {
            m = j - i - 1;
        }
        j++;
    }

    // Если добрались до конца, то
    // отрезаем буфер до максимального элемента
    if (l == j) {
        j = buffer[m];
        buffer = buffer.slice(0, m);
    }

    vol += calcVolume(arr, buffer, arr[j] > arr[i] ? arr[j] : arr[i]);

    drowned = drowned.concat(buffer);
    buffer = [];

    // Продолжаем цикл с правой границы
    // затопленных столбцов
    i = j;
}

function calcVolume(items, indexes, max) {
    var vol = 0;

    indexes.forEach(function (index) {
        vol += max - items[index];
    });

    return vol;
}

function createItem(tag, name, text) {
    var element = document.createElement(tag);
    element.className = name;
    element.textContent = text;
    element.style.height = text * 25 + 'px';
    return element
}

arr.forEach(function (item, index) {
    if (drowned.indexOf(index) !== -1) {
        className = DEFAULT_CLASS + ' ' + FLOODED_CLASS;
    } else {
        className = DEFAULT_CLASS;
    }
    conteinerNode.appendChild(createItem('li', className, item));
});

document.querySelector('.title').textContent = vol;
