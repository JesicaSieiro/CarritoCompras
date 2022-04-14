/* CLASES */
class Carrito{
    constructor(id,productos, precioTotal){
        this.id=parseInt(id);
        this.productos=productos;
        this.precioTotal=Number(precioTotal).toFixed(2);
    }
    calcularTotalCarrito(){
        this.precioTotal=this.productos.reduce((acumulador,actual)=>acumulador+actual.totalProd,0)
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
        this.totalProd=totalProd.toFixed(2);
    }
    sumarIva(){
       return this.precio=this.precio*1.21;
    }
    calcularTotalProducto(){
       return this.totalProd=this.sumarIva()*this.cantidad;
    }
}

//INSTANCIO EL CARRITO
const carrito =new Carrito(1,listado=[],0);
//INSTANCIO PRODUCTOS
let manzanaRoja=new Producto(1,"Manzana Roja","Fruta","Delicioza. De seleccion. Precio por kilo.","./assets/images/productos/apple.png",120,0);
let banana=new Producto(2,"Banana","Importada de Brasil. De seleccion. Precio por kilo","Fruta","./assets/images/productos/banana.png",200,0);
let carne=new Producto(3,"Carne de Res","Corte Americano. Precio por kilo","Carnes","./assets/images/productos/beaf steak.png",980,0);
let brocoli=new Producto(4,"Brocoli","Precio por kilo","Verdura","./assets/images/productos/broccoli.png",100,0);

const listaProductos=[manzanaRoja,banana,carne,brocoli];
//obtengo los elementos del dom
const tarjeta=document.getElementById("tarjeta");

/* function generarTarjetas(){
    for (let producto of listaProductos){
       
        const div = document.createElement('div');
       
    }
} */