/**
 * Formatea el precio de céntimos a euros.
 * @param {number} precio 
 * @returns {string} Precio formateado.
 */
export function formatearPrecio(precio) {
    return `${(precio / 100).toFixed(2).replace('.', ',')}€`;
}