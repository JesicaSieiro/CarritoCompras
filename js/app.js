/* CLASES */
class Carrito{
    constructor(id,productos, precioTotal){
        this.id=parseInt(id);
        this.productos=productos;
        this.precioTotal=Number(precioTotal).toFixed(2);
    }
    calcularTotalCarrito(){
        this.precioTotal=this.productos.reduce((acumulador,actual)=>acumulador+parseInt(actual.totalProd),0)
    }
}

class Producto{
    constructor(id=0,nombre="",categoria="", descripcion="", imagen="", precio=0, cantidad=0, totalProd=0){
        this.id=parseInt(id);
        this.nombre=nombre.toUpperCase();
        this.categoria=categoria.toUpperCase();
        this.descripcion=descripcion;
        this.imagen=imagen;
        this.precio=Number(precio).toFixed(2);
        this.cantidad=parseInt(cantidad);
        this.totalProd=totalProd;
    }
    sumarIva(){
       return this.precio=this.precio*1.21;
    }
    calcularTotalProducto(){
       return this.totalProd=this.sumarIva()*this.cantidad;
    }
}


listado=[];
const listaProductos=[];

//obtengo los elementos del dom
const tarjeta=document.getElementById("tarjeta");
const listadoProdCarrito=document.getElementById("listaProdCarrito");
const btnCarrito=document.getElementById("btnCarrito");
const btnComprar=document.getElementById("btnComprar");
//FUNCIONES
/* desestructuta el objeto producto */
const desestructurar=(item)=>{ 
    return  {id,nombre,categoria,descripcion,imagen,precio,cantidad,totalProd}=item
}
function agregarProdLocalStorage(prods){
    if(prods){
        let productosJson=JSON.stringify(prods);
        localStorage.setItem("listadoProductos",productosJson);
    }  
    
}

function obtenerCompraLocalStorage(){
   let productos=[];  
  const almacenados=JSON.parse(localStorage.getItem("listadoProductos"));
  if(almacenados!==null ){
    for(prod of almacenados){
        desestructurar(prod)
        productos.push(new Producto(id,nombre,categoria,descripcion,imagen,precio,cantidad,totalProd));
        console.log(prod)
      }
  }
  
  return productos;
}
listado=obtenerCompraLocalStorage();
/* crea productos para agregar a la lista del carrito */
function generarProdPedido(item,cantidad){
    desestructurar(item)
    let productoNuevo=new Producto(id,nombre,categoria,descripcion, imagen,precio,cantidad);
    productoNuevo.totalProd=productoNuevo.calcularTotalProducto(productoNuevo.cantidad)
    
    //agrego el producto al carrito
    listado.push(productoNuevo);
    console.log(listado);
    agregarProdLocalStorage(listado);
    return productoNuevo;
}
/* en base a lo elegido por el usuario crea el producto para agregar al carrito */
function seleccionProductos(producto,cantidad){
    let productoElegido;
    let productoNuevo;

    productoElegido=listaProductos.find(prodElegido=>prodElegido.id==producto);
    productoNuevo=generarProdPedido(productoElegido,cantidad)

    return productoNuevo;
}
//INSTANCIO EL CARRITO
const carrito =new Carrito(1, lista=[],0);

btnCarrito.addEventListener("click",clickBtnCarrito= (e)=>{
     //OBTENER LOS PRODUCTOS DE LOCALSTORAGE
     const productosComprar=obtenerCompraLocalStorage();
   //si el ul tiene hijos lo limpio
   if(listadoProdCarrito.children.length>0){
      listadoProdCarrito.innerHTML="";
   }
    console.log(productosComprar);
    //INSTANCIO EL CARRITO
    carrito.productos=productosComprar;
    carrito.calcularTotalCarrito();
   
    carrito.productos.forEach(prod=>{
        const div = document.createElement('div');
         div.innerHTML=`<li class="list-group-item d-flex justify-content-between align-items-center">
         ${prod.cantidad}-${prod.nombre}
         <span class="badge bg-primary rounded-pill">${prod.totalProd}</span>
       </li>`;
       listadoProdCarrito.append(div);
    })
    const divTotal=document.createElement('div');
    divTotal.innerHTML=`<li class="list-group-item d-flex justify-content-between align-items-center">
        <h3>Total</h3> 
    <span class="badge bg-primary rounded-pill">${carrito.precioTotal}</span>
    </li>`;
    listadoProdCarrito.append(divTotal);
});

const compraConfirmacion= btnComprar.addEventListener("click",()=>{
    if(listadoProdCarrito.children.length>1){
        Swal.fire({
            title: 'Desea realizar la compra',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Comprar',
            denyButtonText: `Volver a pagina principal`,
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Compra realizada!', 'Gracias por comprar con nosotros', 'success')
            } else if (result.isDenied) {
                Swal.fire('La compra no fue realizada', '', 'info')
            }
          })
    }
    else{
        Swal.fire('No ha ingresado ningun producto')
    }
    
})


const generarTarjetas=async()=>{
    const respuesta= await
    fetch('js/datos.json')
    const data=await respuesta.json()
    data.forEach(element=>{
        const div = document.createElement('div');
         div.innerHTML=`<div class="col">
         <div class="card">
           <div class="d-flex justify-content-between card-body card_precio">
               <div >
                   <label id="${element.id}-precio" class=" card_precioColor">${element.precio}</label>
               </div>
               <div >
                   <button type="button" class="btn btn-outline-success "><i class="bi bi-zoom-in"></i></button>
               </div>
           </div>
           <img src="${element.imagen}" class="card_img" alt="...">
           <div class="card-body">
             <h5 class="card-title" id="${element.id}-producto">${element.nombre}</h5>
             <p class="card-text" id="descripcion">${element.descripcion}</p>
             <div class="row g-3">
               <div class="col-sm-7">
                 <input type="number" id="${element.id}-cantidad" min="1" step=".5" class="form-control" placeholder="Cantidad" aria-label="Cantidad">
               </div>
               <div class="col-sm">
                   <button type="submit" id="${element.id}" name="btnAgregar"  class="btn btn-success">Agregar</button>
               </div>
              
             </div>
           </div>
         </div>
       </div>`;
       tarjeta.append(div);
       //guardo cada elemento en la lista
       listaProductos.push(element.nombre=new Producto(element.id,element.nombre,element.categoria,element.descripcion,element.imagen,element.precio,element.cantidad))
    //ontengo el elemento btn que acabo de crear en el dom
    const btnAgregar=document.getElementById(element.id);
    btnAgregar.addEventListener("click",clickBtnAgregar= (e)=>{
        e.preventDefault();
        let dato=e.target;
        let cantidad=document.getElementById(dato.id+"-cantidad");
        if(cantidad.value!=null && cantidad.value>0 && cantidad!=undefined){
            seleccionProductos(dato.id,cantidad.value)
            cantidad.value="";
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El producto de agrego al carrito',
                showConfirmButton: false,
                timer: 1500
              })
        }
        else{
            Swal.fire('Debe ingresar un numero mayor a cero para agregar el producto')
        }
        

        });
    })
}

generarTarjetas();



