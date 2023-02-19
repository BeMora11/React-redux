const estadoInicial = {
  productos: [
    { id: 1, nombre: 'Producto A' },
    { id: 2, nombre: 'Producto 2' },
    { id: 3, nombre: 'Producto 3' },
    { id: 4, nombre: 'Producto 4' }
  ],
  carrito: []
}

const reducer = (estado = estadoInicial, accion) => {

  switch (accion.type) {
    case 'AGREGAR_PRODUCTO_AL_CARRITO':
      const { nombre, idProducto } = accion;

      if (estado.carrito.length === 0) {
        return {
          ...estado,
          carrito: [{
            id: idProducto,
            nombre: nombre,
            cantidad: 1
          }]
        }
      } else {
        const nuevoCarrito = [...estado.carrito];

        const yaEstaEnCarrito = nuevoCarrito.filter((productoCarrito) => {
          return productoCarrito.id === idProducto;
        }).length > 0;

        if (yaEstaEnCarrito) {
          nuevoCarrito.forEach((productoDeCarrito, index) => {
            if (productoDeCarrito.id === idProducto) {
              const cantidad = nuevoCarrito[index].cantidad;
              nuevoCarrito[index] = {
                id: idProducto,
                nombre: nombre,
                cantidad: cantidad + 1
              }
            }
          })
        } else {
          nuevoCarrito.push({
            id: idProducto,
            nombre: nombre,
            cantidad: 1
          });
        }

        return {
          ...estado,
          carrito: nuevoCarrito
        }
      }
      break;

    default:
      return estado;
      break;
  }

  return estado;
}

export default reducer;