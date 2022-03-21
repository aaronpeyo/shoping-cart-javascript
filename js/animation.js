const btnCarrito = document.querySelector('#btn-carrito');
const contendorCarrito = document.querySelector('.contendor-carrito');
const btnCerrar = document.querySelector('#btn-cerrar');
const home = document.querySelector('#home');

// boton mostrar carrito
btnCarrito.addEventListener('click', (e) => {
    e.preventDefault();

    if(contendorCarrito.classList.contains('btn-active')){
        contendorCarrito.classList.remove('btn-active');
        return;
    }
    contendorCarrito.classList.add('btn-active');

});

// boton cerrar carrito
btnCerrar.addEventListener('click', (e) => {
    e.preventDefault();

    contendorCarrito.classList.remove('btn-active');
});

home.addEventListener('click', (e) => {
    e.preventDefault();

    contendorCarrito.classList.remove('btn-active');
});
