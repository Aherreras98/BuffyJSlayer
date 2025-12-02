import { Producto } from './producto.js';
import { RAREZA, TIPO } from '../../constants.js';

export class Mercado {
    constructor() {
        this.productos = [
            new Producto('Estaca', 'src/img/estaca.png', 5000, RAREZA.COMUN, TIPO.ARMA, 10),
            new Producto('Ballesta', 'src/img/ballesta.png', 12000, RAREZA.RARA, TIPO.ARMA, 25),
            new Producto('Hacha', 'src/img/hacha.png', 42000, RAREZA.LEGENDARIA, TIPO.ARMA, 45),
            new Producto('Chaqueta', 'src/img/chaqueta.png', 8000, RAREZA.COMUN, TIPO.ARMADURA, 15),
            new Producto('Armadura', 'src/img/armadura.png', 12000, RAREZA.RARA, TIPO.ARMADURA, 20),
            new Producto('Amuleto', 'src/img/amuleto.png', 15000, RAREZA.LEGENDARIA, TIPO.ARMADURA, 30),
            new Producto('Vendas', 'src/img/vendas.png', 4000, RAREZA.COMUN, TIPO.CONSUMIBLE, 20),
            new Producto('Agua Bendita', 'src/img/agua.png', 9000, RAREZA.RARA, TIPO.CONSUMIBLE, 35),
            new Producto('Sangre de Campeón', 'src/img/sangre.png', 18000, RAREZA.LEGENDARIA, TIPO.CONSUMIBLE, 55)
        ];
    }

    /**
     * Filtra productos por rareza.
     * @param {string} rareza 
     * @returns {Producto[]}
     */
    filtrarPorRareza(rareza) {
        return this.productos.filter(producto => producto.rareza === rareza);
    }

    /**
     * Busca un producto por nombre.
     * @param {string} nombre 
     * @returns {Producto|undefined}
     */
    buscarProducto(nombre) {
        return this.productos.find(producto => producto.nombre === nombre);
    }

    /**
     * Aplica descuento a una rareza específica.
     * @param {string} rareza 
     * @param {number} porcentaje 
     */
    aplicarOferta(rareza, porcentaje) {
        this.productos = this.productos.map(producto => {
            if (producto.rareza === rareza) {
                return producto.aplicarDescuento(porcentaje);
            }
            return producto;
        });
    }
}