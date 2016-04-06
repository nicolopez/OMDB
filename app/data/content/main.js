var formulario = document.getElementById('formSearch');
var searchValue;
var update = document.getElementById('updater');


formulario.onsubmit = function (event) {
    event.preventDefault();
    searchValue = document.getElementById('search');
    console.log(searchValue.value);
    searchValue.value = null;
};

update.onclick = function () {
    console.log('holis');
};