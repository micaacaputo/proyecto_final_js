let carrito = [];
let productosEnStock = [];

const precioTotal = document.getElementById('precioTotal');
const localStorage = window.localStorage;
verificarCarrito();


//Utilizo un JSON local
$.getJSON('stock.json', function (data){
    localStorage.setItem('stock', JSON.stringify(data));
    recuperarProductos();
    productosAnime(data.filter(el => el.tipo == 'manga'),'#contenedor-bootstrap');
    productosAnime(data.filter(el => el.tipo == 'figura'),'#contenedor-bootstrap2');
    guardarCarrito();
    });
    
//Guardamos en LocalStorage
function guardarEnLocalStorage() {
    console.log('local');
localStorage.setItem('carrito', JSON.stringify(carrito));
};

function guardarCarrito() {
let recuperado = JSON.parse(localStorage.getItem('carrito'));
if (recuperado) {
    recuperado.forEach(el=>{
        agregarProductos(el.id);
    });
};
};

function recuperarProductos(){
let recuperar = JSON.parse(localStorage.getItem('stock'));
if(recuperar){
    recuperar.forEach(e => productosEnStock.push(e));
};
};

//Modificamos el DOM
function productosAnime(productosEnStock, contenedor) {
    
    productosEnStock.forEach(producto => {
        
        $(contenedor).append(
                        `
                            <div class= "card">
                            <img src=${producto.img} class="card-img-top">
                            <div class="card-body ">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <button id="boton${producto.id}" class="btn btn-danger">Comprar</button>
                        </div>  
                        </div> 
                        </div>
                        `);

   $(`#boton${producto.id}`).on('click', function () {
        agregarProductos(producto.id);
        Toastify({
            text: "Producto agregado! 👉👈",
            backgroundColor: "#fa3434",
            position:'center',
            className: "info",
          }).showToast();
        });
    });
 };

//Agregamos productos al carrito
function agregarProductos(id){
    let productoDuplicado = carrito.find(prodR => prodR.id == id);
    if(productoDuplicado){
        productoDuplicado.cantidad = productoDuplicado.cantidad + 1;
        $(`#cantidad${productoDuplicado.id}`).html(`cantidad: ${productoDuplicado.cantidad}`); 
        totalCompra();
    }else{
            let productoCarrito = productosEnStock.find(producto=> producto.id == id);
    
            carrito.push(productoCarrito);
            productoCarrito.cantidad = 1;
            
            verificarCarrito();
            totalCompra();
            
            $("#contenedor-carrito").append(
            `<div class= "agregarProducto">
                            <img src=${productoCarrito.img} class="card-img-top imagen">
                            <p >${productoCarrito.nombre}</p>
                            <p>Precio: $${productoCarrito.precio}</p>
                            <p id="cantidad${productoCarrito.id}">Cantidad: ${productoCarrito.cantidad}</p>
                            <button id= "boton-borrar${productoCarrito.id}" class="btn btn-danger btn-sm">X</button>
                            <hr class = "separador">
                            </div>`);    
        
                            $(`#boton-borrar${productoCarrito.id}`).click(function () {
                                $(this).parent().remove();
                                carrito = carrito.filter(prodE => prodE.id != productoCarrito.id);
                                guardarEnLocalStorage();
                                totalCompra();
                                verificarCarrito();
                              }) 
        };
        guardarEnLocalStorage();
    };

//Momento de checkout
$("#comprar").on('click', function () {
    $("#contenedor-compra").empty()
    verificarCarrito();
        if(carrito.length>0){
            carrito = [];
            localStorage.clear();
            totalCompra();
            $(".agregarProducto").css('display', 'none');
            $("#contenedor-compra").append(`   <h2 id="mensaje">Para continuar con la compra, ingrese su mail: </h2>
                                                <form>
                                                    <div class="form-group">
                                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Escriba su mail...">
                                                    </div>
                                                </form>
                                                <div class = "centrar-boton">
                                                <button type="submit" id="boton-enviar-mail" class="btn btn-outline-danger mx-auto">Enviar</button>
                                              </div>
                                                `);
        };
        $("#boton-enviar-mail").on('click', function () {
            $("#contenedor-compra").empty();
            $("#contenedor-compra").append(`
                                            <h2 id="mensajeCompra"> Elija un medio de pago:</h2>
                                            <br>
                                            <button id="efectivo" class="btn btn-danger">Efectivo</button>
                                            <button id="tarjeta" class="btn btn-danger">Tarjeta débito/crédito</button>
                                            `);
                                            verificarCarrito();
            
                                            $("#efectivo, #tarjeta").on('click', function () {
                                            $("#contenedor-compra").empty();
                                            $("#contenedor-compra").append(`<h2 id="mensajeCompra"> Enviamos los pasos a seguir para continuar con su compra 🤙</h2>
                                                                            <h2 id="mensajeCompra"> Gracias vuelva prontos!</h2>`);
                                                                        });
        });    
});


//Mensaje de carrito vacio
function verificarCarrito() {
    if(carrito.length == 0){
        $("#contenedor-carrito").empty();
        $("#contenedor-carrito").append('<h2 id="mensaje">No hay productos en su carrito 🥺</h2>');
        $("#comprar , #vaciar").css('display','none')
    }else{
        $("#mensaje").css('display', 'none');
        $("#comprar , #vaciar").css('display','inline')
    };
};

//Suma el total de la compra
function totalCompra(){
    precioTotal.innerText = carrito.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
};

//Borramos todos los productos del carrito
function borrarCarrito() {
    carrito = [];
    localStorage.clear();
    totalCompra();
    verificarCarrito();
};

$("#vaciar").on('click', borrarCarrito);
