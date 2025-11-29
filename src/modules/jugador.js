import { TIPO } from '../../constants.js';

/**
 * Clase Jugador.
 */
export class Jugador {
    /**
     * @param {string} nombre 
     * @param {string} avatar 
     */
    constructor(nombre, avatar) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.inventario = [];
        this.vidaBase = 100;
        this.vidaActual = 100;
    }

    /**
     * Añade objeto clonado al inventario.
     * @param {Producto} producto 
     */
    anadirItem(producto) {
        const copia = structuredClone(producto);
        this.inventario.push(copia);
    }

    /**
     * Suma puntos.
     * @param {number} cantidad 
     */
    sumarPuntos(cantidad) {
        this.puntos += cantidad;
    }

    /**
     * Calcula ataque total.
     * @returns {number}
     */
    obtenerAtaqueTotal() {
        return this.inventario
            .filter(item => item.tipo === TIPO.ARMA)
            .reduce((total, item) => total + item.bonus, 0);
    }

    /**
     * Calcula defensa total.
     * @returns {number}
     */
    obtenerDefensaTotal() {
        return this.inventario
            .filter(item => item.tipo === TIPO.ARMADURA)
            .reduce((total, item) => total + item.bonus, 0);
    }

    /**
     * Calcula vida total (base + bonus).
     * @returns {number}
     */
    obtenerVidaTotal() {
        const bonus = this.inventario
            .filter(item => item.tipo === TIPO.CONSUMIBLE)
            .reduce((total, item) => total + item.bonus, 0);
        return this.vidaBase + bonus;
    }
}