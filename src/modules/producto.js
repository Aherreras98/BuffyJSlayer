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
     * @param {Object} bonus - Objeto con stats { ataque: X, defensa: Y, vida: Z }.
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
     * Formatea el precio (ej: 950 -> 9,50€).
     * @returns {string} Precio formateado.
     */
    formatPrice() {
        return `${(this.precio / 100).toFixed(2).replace('.', ',')}€`;
    }

    /**
     * Aplica descuento y devuelve una COPIA del producto.
     * @param {number} percent - Porcentaje (0-100).
     * @returns {Producto} Nueva instancia con precio reducido.
     */
    applyDiscount(percent) {
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