    /**
     * Formatea el precio
     * @param {number} precio Precio en céntimos.
     * @returns {string} Precio formateado.
     */
    export function formatearPrecio(precio) {
        return `${(precio / 100).toFixed(2).replace('.', ',')}€`;
    }
