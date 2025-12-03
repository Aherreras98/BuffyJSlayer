import { Jefe } from './enemigo.js';

/**
 * Función combate.
 * @param {Jugador} jugador 
 * @param {Enemigo} enemigo 
 * @returns {Object} Resultado con ganador y puntos.
 */
export function combatir(jugador, enemigo) {
    if (jugador.vidaActual <= 0) {
        return { ganador: enemigo, puntos: 0 };
    }

    let vidaEnemigo = enemigo.vida;
    const defensaJugador = jugador.obtenerDefensaTotal(); 
    const ataqueJugador = jugador.obtenerAtaqueTotal();

    let ataqueEnemigo = enemigo.ataque;
    
    if (enemigo instanceof Jefe) {
        ataqueEnemigo = ataqueEnemigo * enemigo.multiplicador;
    }

    while (jugador.vidaActual > 0 && vidaEnemigo > 0) {
        
        let danoRecibido = ataqueEnemigo - defensaJugador;
        if (danoRecibido < 0) danoRecibido = 0;

        jugador.vidaActual -= danoRecibido;

        vidaEnemigo -= ataqueJugador;
    }

const victoria = jugador.vidaActual > 0;
    let puntosGanados = 0;

    if (victoria) {
        let basePuntos = 100 + enemigo.ataque;

        if (enemigo instanceof Jefe) {
            puntosGanados = Math.round(basePuntos * enemigo.multiplicador);
        } else {
            puntosGanados = Math.round(basePuntos);
        }
    } else {
        jugador.vidaActual = 0;
    }
}