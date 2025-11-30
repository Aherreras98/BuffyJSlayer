/**
 * Clase base para los oponentes.
 */
export class Enemigo {
    /**
     * @param {string} nombre - Nombre del enemigo.
     * @param {string} imagen - Ruta de la imagen.
     * @param {number} ataque - Puntos de ataque.
     * @param {number} vida - Puntos de vida.
     */
    constructor(nombre, imagen, ataque, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.ataque = ataque;
        this.vida = vida;
    }
}

/**
 * Subclase Jefe. Hereda de Enemigo.
 * Añade un multiplicador de daño.
 */
export class Jefe extends Enemigo {
    /**
     * @param {string} nombre 
     * @param {string} imagen 
     * @param {number} ataque 
     * @param {number} vida 
     * @param {number} multiplicador - Multiplicador de daño.
     */
    constructor(nombre, imagen, ataque, vida, multiplicador = 1.5) {
        super(nombre, imagen, ataque, vida);
        this.multiplicador = multiplicador;
    }
}