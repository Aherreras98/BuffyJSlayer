import { formatearPrecio } from '../utils/utils.js';

/**
 * Clase que representa un ítem del mercado.
 */
export class Producto {
    
    /**
     * @param {string} name - Nombre del objeto.
     * @param {string} image - Ruta de la imagen.
     * @param {number} price - Precio base.
     * @param {string} rarity - Rareza (Común, Rara, Épica).
     * @param {string} type - Tipo (arma, armadura, consumible).
     * @param {number} bonus - Valor numérico que suma a la estadística.
     */
    constructor(name, image, price, rarity, type, bonus) {
        this.nombre = name;
        this.imagen = image;
        this.precio = price;
        this.rareza = rarity;
        this.tipo = type;
        this.bonus = bonus;
    }

    /**
     * Devuelve el precio formateado.
     * @returns {string} Precio en euros.
     */
    obtenerPrecioFormateado() {
        return formatearPrecio(this.precio);
    }

    /**
     * Aplica descuento y devuelve una COPIA del producto.
     * @param {number} percent - Porcentaje (0-100).
     * @returns {Producto} Nueva instancia con precio reducido.
     */
    aplicarDescuento(percent) {
        const newPrice = this.precio - (this.precio * (percent / 100));
        return new Producto(
            this.nombre, 
            this.imagen, 
            newPrice, 
            this.rareza, 
            this.tipo, 
            this.bonus
        );
    }
}