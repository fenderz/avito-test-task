var DEFAULT_CLASS = 'list__item';
var FLOODED_CLASS = 'list__item_flood';
var arr = [1, 2, 5, 2, 4, 6, 1, 2, 4, 5, 7, 8, 1, 5, 2, 4, 6, 1, 2, 4, 5, 9, 1, 5, 2, 4, 6, 1, 2, 4, 5];
var containerNode = document.querySelector('.js-list');
var volumeNode = document.querySelector('.js-volume');
var className = DEFAULT_CLASS;

// Временное хранилище для затопленных столбцов
var buffer = [];
// Индексы затопленных столбцов
var drowned = [];
// Индекс максимального столбца в buffer
var maxIndex = 0;
// Индекс левой границы затопленных столбцов
var indexLeft = 0;
// Индекс правой границы затопленных столбцов
var indexRight = 0;
var vol = 0;
var arrLength = arr.length;
var diff = {};
function main() {


    while (indexLeft < arrLength) {
        indexRight = indexLeft + 1;
        maxIndex = 0;

        // Ищем столбец с меньшим объемом
        // либо упираемся в конец
        while (arr[indexLeft] > arr[indexRight] && indexRight < arrLength) {
            buffer.push(indexRight);
            // Запоминаем индекс максимального элемента
            // для случая если добрались до конца массива
            // Индекс массива buffer
            if (arr[buffer[maxIndex]] < arr[indexRight]) {
                maxIndex = indexRight - indexLeft - 1;
            }
            indexRight++;
        }

        // Если добрались до конца, то
        // отрезаем буфер до максимального элемента
        if (arrLength === indexRight) {
            indexRight = buffer[maxIndex];
            buffer = buffer.slice(0, maxIndex);
        }

        buildDiff(arr, buffer, Math.min(arr[indexLeft], arr[indexRight]));
        vol += calcVolume(arr, buffer, Math.min(arr[indexLeft], arr[indexRight]));
        drowned = drowned.concat(buffer);
        buffer = [];

        // Продолжаем цикл с правой границы
        // затопленных столбцов
        indexLeft = indexRight;
    }

    arr.forEach(function (item, index) {
        if (drowned.indexOf(index) !== -1) {
            className = DEFAULT_CLASS + ' ' + FLOODED_CLASS;
            drownedHeight =  diff[index];
        } else {
            drownedHeight = 0;
            className = DEFAULT_CLASS;
        }
        containerNode.appendChild(createItem('li', className, item, drownedHeight));
    });

    volumeNode.textContent = 'Volume: ' + vol;
}
function calcVolume(items, indexes, max) {
    var vol = 0;

    indexes.forEach(function (index) {
        vol += max - items[index];
    });

    return vol;
}

function buildDiff(items, indexes, max) {

    indexes.forEach(function (index) {
        diff[index] = max - items[index];
    });

    return diff;
}
//console.log(diff);
function createItem(tag, name, text, height) {
    var element = document.createElement(tag);
    var span = document.createElement('span');
    span.style.height = height * 25 + 'px';
    span.className = 'list__item-submerged';
    element.className = name;
    element.textContent = text;
    element.style.height = text * 25 + 'px';
    element.appendChild(span);
    return element
}
var drownedHeight;


containerNode.addEventListener('click', function () {
    document.body.classList.remove('hide-drowned');
});
main();