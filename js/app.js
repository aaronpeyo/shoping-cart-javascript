const listaProductos = document.querySelector('#lista-productos');
const footerCarrito = document.querySelector('#footer-carrito');
const itemTotal = document.querySelector('.total span');

const btnCompra = document.querySelector('.btn-comprar');
const mensajeSuccess = document.querySelector('.contenedor-success');

const bodyCarrito = document.querySelector('#body-carrito');
const btnSumar = document.querySelector('.btn-more');
const btnRestar = document.querySelector('.btn-less');

const totalProductosElemento = document.querySelector('.totalProductos span');

const btnFuits = document.querySelector('#fuits');
const btnMeat = document.querySelector('#meat');
const btnBeverages = document.querySelector('#beverages');
const btnEggs = document.querySelector('#eggs');
const btnSnaks = document.querySelector('#snaks');

let total = 0;
let totalProductos = 0;


let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    eliminarProducto();
    sumarCantidad();
    restarCantidad();

    carrito = JSON.parse( localStorage.getItem('carritoLlave')) || []; 

    if(carrito.length !== 0) {
        llenarCarrito(carrito);
    }

});

btnFuits.addEventListener('click', (e) => {

    if(btnFuits.classList.contains('filtro-activado')) {
        btnFuits.classList.remove('filtro-activado');
        
        limpiarProductos();
        mostrarProductos(productos);

    }else {
        btnFuits.classList.add('filtro-activado');

        // remover la clase filtro activado de todos los botones de filtro
        btnMeat.classList.remove('filtro-activado');
        btnBeverages.classList.remove('filtro-activado');
        btnEggs.classList.remove('filtro-activado');
        btnSnaks.classList.remove('filtro-activado');

        const filtro = e.target.getAttribute('id');
        limpiarProductos();
        filtrarProductos(filtro);
        
    }
});

btnMeat.addEventListener('click', (e) => {

    if(btnMeat.classList.contains('filtro-activado')) {
        btnMeat.classList.remove('filtro-activado');
        
        limpiarProductos();
        mostrarProductos(productos);

    }else {
        btnMeat.classList.add('filtro-activado');

        // remover la clase filtro activado de todos los botones de filtro
        btnFuits.classList.remove('filtro-activado');
        btnBeverages.classList.remove('filtro-activado');
        btnEggs.classList.remove('filtro-activado');
        btnSnaks.classList.remove('filtro-activado');

        const filtro = e.target.getAttribute('id');
        limpiarProductos();
        filtrarProductos(filtro);
        
    }
});

btnBeverages.addEventListener('click', (e) => {

    if(btnBeverages.classList.contains('filtro-activado')) {
        btnBeverages.classList.remove('filtro-activado');
        
        limpiarProductos();
        mostrarProductos(productos);

    }else {
        btnBeverages.classList.add('filtro-activado');

        // remover la clase filtro activado de todos los botones de filtro
        btnFuits.classList.remove('filtro-activado');
        btnMeat.classList.remove('filtro-activado');
        btnEggs.classList.remove('filtro-activado');
        btnSnaks.classList.remove('filtro-activado');

        const filtro = e.target.getAttribute('id');
        limpiarProductos();
        filtrarProductos(filtro);
        
    }
});

btnEggs.addEventListener('click', (e) => {

    if(btnEggs.classList.contains('filtro-activado')) {
        btnEggs.classList.remove('filtro-activado');
        
        limpiarProductos();
        mostrarProductos(productos);

    }else {
        btnEggs.classList.add('filtro-activado');

        // remover la clase filtro activado de todos los botones de filtro
        btnFuits.classList.remove('filtro-activado');
        btnMeat.classList.remove('filtro-activado');
        btnBeverages.classList.remove('filtro-activado');
        btnSnaks.classList.remove('filtro-activado');

        const filtro = e.target.getAttribute('id');
        limpiarProductos();
        filtrarProductos(filtro);
        
    }
});

btnSnaks.addEventListener('click', (e) => {

    if(btnSnaks.classList.contains('filtro-activado')) {
        btnSnaks.classList.remove('filtro-activado');
        
        limpiarProductos();
        mostrarProductos(productos);

    }else {
        btnSnaks.classList.add('filtro-activado');

        // remover la clase filtro activado de todos los botones de filtro
        btnFuits.classList.remove('filtro-activado');
        btnMeat.classList.remove('filtro-activado');
        btnBeverages.classList.remove('filtro-activado');
        btnEggs.classList.remove('filtro-activado');

        const filtro = e.target.getAttribute('id');
        limpiarProductos();
        filtrarProductos(filtro);
        
    }
});


function filtrarProductos(categoriaFiltrar) {
    const arregloFiltrado = productos.filter(producto => producto.categoria === categoriaFiltrar);

    mostrarProductos(arregloFiltrado);
}


// Este ciclo muestra todos los productos
function mostrarProductos(mostrarArreglo) {

    mostrarArreglo.forEach(producto => {

        const { id, img, nombre, descripcion, precio } = producto;
    
        const elementProducto = document.createElement('article');
        elementProducto.classList.add('producto');
    
        elementProducto.innerHTML = `
        <figure class="img-producto">
            <img src="${img}" alt="img-producto">
        </figure>
    
        <div class="info-producto">
            <p class="nombre-producto">${nombre}</p>
            <p class="description-producto">${descripcion}</p>
    
            <div class="footer-producto">
                <p class="precio-producto">$<span>${precio}</span></p>
    
                <a href="#" class="btn-add" data-id="${id}">
                    
                </a>
            </div>
        </div>
                `;
    
    
        listaProductos.appendChild(elementProducto);
    });
}

// Agregar un producto al carrito
listaProductos.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('btn-add')) {
        const productoElegido = e.target.parentElement.parentElement.parentElement;

        agregarProducto(productoElegido);
    }

});


function agregarProducto(productoElegido) {

    const objProducto = {
        img: productoElegido.querySelector(".img-producto img").src,
        nombre: productoElegido.querySelector(".nombre-producto").textContent,
        descripcion: productoElegido.querySelector(".description-producto").textContent,
        precio: parseFloat(productoElegido.querySelector(".precio-producto span").textContent),
        id: productoElegido.querySelector(".btn-add").getAttribute("data-id"),
        cantidad: 1,
        cantidadPrecio: parseFloat(productoElegido.querySelector(".precio-producto span").textContent),
    }

    const existe = carrito.some(producto => producto.id === objProducto.id);

    if (existe) {
        // sumar cantidad
        const nuevoArreglo = carrito.map(producto => {

            if (producto.id === objProducto.id) {
                producto.cantidad++;
                producto.cantidadPrecio += producto.precio;
                return producto;

            } else {
                return producto;
            }
        });

        carrito = [...nuevoArreglo];

    } else {
        carrito = [...carrito, objProducto];
    }
    llenarCarrito(carrito);
}

function llenarCarrito(carritoArreglo) {

    limpiarBodyCarrito();

    carritoArreglo.forEach(producto => {

        const { img, nombre, cantidad, precio, descripcion, cantidadPrecio, id } = producto;

        const productoCarrito = document.createElement('div');
        productoCarrito.classList.add("item-cart");

        productoCarrito.innerHTML = `
            <figure class="item-img">
                <img src="${img}" alt="img-cart">
            </figure>

            <div class="center-item">
                <p class="item-nombre">${nombre}</p>
                <p class="item-description">${descripcion}</p>

                <div class="contendor-cantidad">
                    
                    <a class="btn-less" href="#">
                    </a>
                    
                    <p class="item-cantidad">${cantidad}</p>
                    
                    <a class="btn-more" href="#">
                    </a>
                
                </div>
            </div>

            <div class="end-item">
                <a class="btn-close" href="#" data-id="${id}">
                    <img src="img/close.svg" alt="img-close">
                </a>
                <p class="item-precio">$${cantidadPrecio.toFixed(2)}</p>
            </div>
        `;

        bodyCarrito.appendChild(productoCarrito);

    });

    footerCarrito.style = 'display: block';

    // calcula el total del arreglo actual

    carrito.forEach(producto => {
        total += producto.cantidadPrecio;
        totalProductos += producto.cantidad;
    });

    itemTotal.textContent = total.toFixed(2);
    totalProductosElemento.textContent = totalProductos;

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carritoLlave', JSON.stringify(carrito));
}


function limpiarBodyCarrito() {

    while (bodyCarrito.firstChild) {
        bodyCarrito.removeChild(bodyCarrito.firstChild);
    }
}

function limpiarProductos() {

    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
}

// eliminar un producto del carrito 
function eliminarProducto() {
    bodyCarrito.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.classList.contains('btn-close')) {

            const productoId = e.target.getAttribute('data-id');

            carrito = carrito.filter(producto => producto.id !== productoId);

            llenarCarrito(carrito);
        }
    })
}

function sumarCantidad() {
    bodyCarrito.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.classList.contains('btn-more')) {

            const itemSeleccionado = e.target.parentElement.parentElement.parentElement;
            const idItem = itemSeleccionado.querySelector('.btn-close').getAttribute('data-id');

            const arregloCantidad = carrito.map(producto => {

                if (producto.id === idItem) {
                    producto.cantidad++;
                    producto.cantidadPrecio += producto.precio;
                    return producto;
                } else {
                    return producto;
                }
            });

            carrito = [...arregloCantidad];
            llenarCarrito(carrito);
        }
    })
}

function restarCantidad() {

    bodyCarrito.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.classList.contains('btn-less')) {

            const itemSeleccionado = e.target.parentElement.parentElement.parentElement;
            const idItem = itemSeleccionado.querySelector('.btn-close').getAttribute('data-id');

            const arregloCantidad = carrito.map(producto => {

                if (producto.id === idItem) {
                    producto.cantidad--;
                    producto.cantidadPrecio -= producto.precio;
                    return producto;
                } else {
                    return producto;
                }
            });

            carrito = [...arregloCantidad];

            // borrar producto si esta en cero
            carrito = carrito.filter(producto => producto.cantidad !== 0);

            
            llenarCarrito(carrito);            
        }
        if(carrito.length === 0) {
            
            footerCarrito.style = 'display: none';

            bodyCarrito.innerHTML = ` 
            <div class="contenedor-vacio">
            <div class="caja-vacio">
                <img src="img/carrito-vacio.png" alt="icon-vacio">
                <p>Aun no hay productos en tu carrito!!</p>
                <a id="home">Volver a la tienda</a>
            </div>
        `;
    
        const btnHome = document.querySelector('#home');
    
        btnHome.addEventListener('click', (e) => {
            e.preventDefault();
        
            contendorCarrito.classList.remove('btn-active');
        });
    
        }

    })
}

// finalizar la compra
btnCompra.addEventListener('click', e => {

    e.preventDefault();

    mensajeSuccess.style = 'display: flex';

    carrito = [];
    limpiarBodyCarrito();
    
    sincronizarStorage();

    footerCarrito.style = 'display: none';

    contendorCarrito.classList.remove('btn-active');

    bodyCarrito.innerHTML = ` 
        <div class="contenedor-vacio">
        <div class="caja-vacio">
            <img src="img/carrito-vacio.png" alt="icon-vacio">
            <p>Aun no hay productos en tu carrito!!</p>
            <a id="home">Volver a la tienda</a>
        </div>
    `;

    const btnHome = document.querySelector('#home');

    btnHome.addEventListener('click', (e) => {
        e.preventDefault();
    
        contendorCarrito.classList.remove('btn-active');
    });
    

    setTimeout(() => {
        // mesaje de compra terminada
        mensajeSuccess.style = 'display: none';
    }, 4000);

});
