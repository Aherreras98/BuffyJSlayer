/**
 * Determina el rango del jugador basado en sus puntos.
 * @param {number} puntos - Puntos totales.
 * @param {number} umbral - Puntos necesarios para ser La Elegida.
 * @returns {string} "La Elegida" o "Cazadora Novata".
 */
export function obtenerRango(puntos, umbral = 300) {
    if (puntos >= umbral) {
        return "La Elegida";
    } else {
        return "Cazadora Novata";
    }
}