import { Jefe } from './enemigo.js';
import { Jugador } from './jugador.js';

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

    let turnos = 0;
    const MAX_TURNOS = 1000; 

    while (jugador.vidaActual > 0 && vidaEnemigo > 0) {
        turnos++;
        if (turnos > MAX_TURNOS) break;

        let danoRecibido = ataqueEnemigo - defensaJugador;
        if (danoRecibido < 0) danoRecibido = 0;

        jugador.vidaActual -= danoRecibido;

        if (jugador.vidaActual > 0) {
            vidaEnemigo -= ataqueJugador;
        }
    }

    const victoria = jugador.vidaActual > 0;
    let puntosGanados = 0;

    if (victoria) {
        let basePuntos = 100 + enemigo.ataque;

        if (enemigo instanceof Jefe) {
            puntosGanados = Math.round(basePuntos * enemigo.multiplicador);
            jugador.dinero = jugador.dinero + 1000;
        } else {
            puntosGanados = Math.round(basePuntos);
            jugador.dinero = jugador.dinero + 500;
        }
    } else {
        jugador.vidaActual = 0;
    }
    
    return {
        ganador: victoria ? jugador : enemigo,
        puntos: puntosGanados
    };
    
}