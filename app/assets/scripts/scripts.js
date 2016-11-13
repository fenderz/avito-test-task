//var arr = [3,4,5,2,4,6,1,2,8];
var DEFAULT_CLASS = 'list__item';
var FLOODED_CLASS = 'list__item_flood';
var arr = [1,2,5,2,4,6,1,2,4,5,7,8,1,5,2,4,6,1,2,4,5,9,1,5,2,4,6,1,2,4,5];
var conteinerNode = document.querySelector('.js-list');
var floodArr = {
    propItems:[],
    propIndex:[],
    innerItems:[],
    innerIndex:[]
};

function createItem(tag, name, text) {
    var element = document.createElement(tag);

    element.className = name;
    element.textContent = text;
    element.style.height = text * 25 + 'px';

    return element
}

var compareItems = arr[0];
var className = DEFAULT_CLASS;

arr.forEach(function (item, index) {

    if(compareItems > item) {
        //debugger;
        floodArr.innerItems.push(item);
        floodArr.innerIndex.push(index);
    } else {
        compareItems = item;
        floodArr.propItems.push(item);
        floodArr.propIndex.push(index);
    }
    console.log(compareItems);

    if (floodArr.innerIndex.indexOf(index) !== -1){
        className = DEFAULT_CLASS + ' ' + FLOODED_CLASS;
        //className = DEFAULT_CLASS;
    } else {
        className = DEFAULT_CLASS;
    }

    conteinerNode.appendChild(createItem('li', className, item));
});


setTimeout(function(){
    console.log(floodArr);
}, 1000);
