import { Jugador } from './jugador.js';
import { Mercado } from './mercado.js';
import { Enemigo, Jefe } from './enemigo.js';
import { RAREZA } from '../../constants.js';
import { combatir } from './batalla.js';
import { obtenerRango } from './ranking.js';

const jugador = new Jugador("Buffy", "src/img/buffy.png");

const mercado = new Mercado();

const enemigos = [
    new Enemigo("Spike", "src/img/spike.png", 10, 50),
    new Enemigo("Demonio", "src/img/demon.png", 20, 80),
    new Jefe("Willow Oscura", "src/img/willow.png", 35, 150, 1.5)
];

let indiceBatalla = 0;

/**
 * Inicializa la lógica principal del juego al cargar el DOM.
 * Aplica ofertas aleatorias y configura los eventos iniciales.
 */
document.addEventListener('DOMContentLoaded', () => {
    const rarezas = Object.values(RAREZA);
    const azar = rarezas[Math.floor(Math.random() * rarezas.length)];
    mercado.aplicarOferta(azar, 20); 

    actualizarPerfil();
    pintarMercado();
    configurarNavegacion();
    configurarBotonBatalla(); 
});

/**
 * Actualiza la interfaz del perfil del jugador (Escena 1).
 * Crea el elemento HTML si no existe o actualiza sus valores.
 * @returns {void}
 */
function actualizarPerfil() {
    const contenedor = document.querySelector('#scene-1');
    let infoDiv = document.getElementById('player-info-card');
    
    if (!infoDiv) {
        infoDiv = document.createElement('div');
        infoDiv.id = 'player-info-card';
        infoDiv.className = 'card';
        contenedor.insertBefore(infoDiv, contenedor.querySelector('.btn-next'));
    }

    infoDiv.innerHTML = `
        <h3 class="profile-name">${jugador.nombre}</h3>
        <img src="${jugador.avatar}" alt="${jugador.nombre}" class="profile-avatar">
        
        <div class="stats-grid-4">
            <div class="stat-box">
                <span class="stat-icon">❤️</span>
                <p class="stat-value">Vida: ${jugador.vidaBase}</p>
            </div>
            <div class="stat-box">
                <span class="stat-icon">⚔️</span>
                <p class="stat-value">ATQ: ${jugador.obtenerAtaqueTotal()}</p>
            </div>
            <div class="stat-box">
                <span class="stat-icon">🛡️</span>
                <p class="stat-value">DEF: ${jugador.obtenerDefensaTotal()}</p>
            </div>
            <div class="stat-box">
                <span class="stat-icon">⭐</span>
                <p class="stat-value">Pts: ${jugador.puntos}</p>
            </div>
        </div>
    `;
}

/**
 * Renderiza la cuadrícula de productos del mercado (Escena 2).
 * Gestiona la lógica de botones "Añadir" y "Retirar" y sus eventos.
 * @returns {void}
 */
function pintarMercado() {
    const grid = document.getElementById('market-grid');
    grid.innerHTML = '';
    
    actualizarInventario();

    mercado.productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const enInventario = jugador.inventario.some(i => i.nombre === prod.nombre);
        if (enInventario) card.classList.add('bought');
        
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>${prod.rareza} | ${prod.tipo}</p> <p class="price">${prod.obtenerPrecioFormateado()}</p> <button class="btn-shop">${enInventario ? "Retirar" : "Añadir"}</button>
        `;

        const btn = card.querySelector('.btn-shop');
        btn.addEventListener('click', () => {
            if (btn.textContent === "Añadir") {
                if (jugador.inventario.length >= 5) {
                    alert("¡Mochila llena! Máximo 5 objetos.");
                    return;
                }
                jugador.anadirItem(prod);
                btn.classList.add('btn-animado');
                setTimeout(() => btn.classList.remove('btn-animado'), 500);
                
                card.classList.add('bought'); 
                btn.textContent = "Retirar";
            } else {
                const index = jugador.inventario.findIndex(i => i.nombre === prod.nombre);
                if (index > -1) {
                    jugador.inventario.splice(index, 1);
                }
                card.classList.remove('bought');
                btn.textContent = "Añadir";
            }
            actualizarInventario();
            actualizarPerfil();
        });
        grid.appendChild(card);
    });
}

/**
 * Muestra el inventario pequeño de 5 slots en la parte inferior (Escena 2).
 * @returns {void}
 */
function actualizarInventario() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';
        
        if (jugador.inventario[i]) {
            slot.classList.add('filled');
            slot.innerHTML = `<img src="${jugador.inventario[i].imagen}" alt="item">`;
        }
        container.appendChild(slot);
    }
}

/**
 * Renderiza el inventario completo y calcula estadísticas finales (Escena 3).
 * Actualiza los elementos DOM de ataque, defensa y vida total.
 * @returns {void}
 */
function pintarInventario() {
    const grid = document.getElementById('full-inventory-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    jugador.inventario.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <h3>${item.nombre}</h3>
            <p>${item.rareza}</p>
            <small>${item.tipo}</small>
        `;
        grid.appendChild(div);
    });
    
    document.getElementById('final-atk').textContent = jugador.obtenerAtaqueTotal();
    document.getElementById('final-def').textContent = jugador.obtenerDefensaTotal();
    document.getElementById('final-hp').textContent = jugador.vidaActual;
}

/**
 * Genera las tarjetas de los enemigos disponibles (Escena 4).
 * Diferencia visualmente si el enemigo es un Jefe.
 * @returns {void}
 */
function pintarEnemigos() {
    const grid = document.getElementById('enemies-grid');
    grid.innerHTML = '';
    
    enemigos.forEach(enemigo => {
        const card = document.createElement('div');
        card.className = 'card';
        
        if (enemigo instanceof Jefe) {
            card.classList.add('is-boss');
        }
        
        let extra = enemigo instanceof Jefe ? `<br><span class="boss-label">JEFE FINAL</span>` : '';
        
        card.innerHTML = `
            <img src="${enemigo.imagen}" alt="${enemigo.nombre}">
            <h3>${enemigo.nombre}</h3>${extra}
            <p>ATQ: ${enemigo.ataque} | HP: ${enemigo.vida}</p>
        `;
        grid.appendChild(card);
    });
}

/**
 * Configura los eventos de clic en los botones de navegación.
 * Gestiona el cambio de escenas y actualizaciones de interfaz.
 * @returns {void}
 */
function configurarNavegacion() {
    document.querySelectorAll('.btn-next').forEach(boton => {
        if (!boton.hasAttribute('data-to')) return;

        boton.addEventListener('click', (e) => {
            const idDestino = e.target.getAttribute('data-to');
            
            if (idDestino !== 'scene-1') {
                document.body.classList.add('hide-ui');
            } else {
                document.body.classList.remove('hide-ui');
            }

            if (idDestino === 'scene-3') {
                jugador.vidaActual = jugador.obtenerVidaTotal(); 
                pintarInventario();
            }
            if (idDestino === 'scene-4') pintarEnemigos();
            if (idDestino === 'scene-5') {
                mostrarEscena(idDestino);
                setTimeout(() => prepararBatalla(), 50);
                return;
            }

            mostrarEscena(idDestino);
        });
    });
}

/**
 * Añade funcionalidad al botón para avanzar al siguiente combate.
 * @returns {void}
 */
function configurarBotonBatalla() {
    const btnNext = document.getElementById('btn-next-battle');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            indiceBatalla++;
            prepararBatalla();
        });
    }
}

/**
 * Muestra una escena específica y oculta las demás.
 * @param {string} id - ID del elemento HTML de la escena.
 * @returns {void}
 */
function mostrarEscena(id) {
    document.querySelectorAll('.scene').forEach(sc => sc.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/**
 * Gestiona la lógica de un turno de batalla y su visualización (Escena 5).
 * Llama a la función 'combatir' importada y actualiza el DOM con el resultado.
 * Si es el último enemigo, llama a finJuego().
 * @returns {void}
 */
function prepararBatalla() {
    if (indiceBatalla >= enemigos.length) {
        finJuego();
        return;
    }
    
    const enemigo = enemigos[indiceBatalla];
    const arena = document.querySelector('.battle-arena');
    const resultadoTexto = document.getElementById('battle-result');
    const btnNext = document.getElementById('btn-next-battle');

    btnNext.classList.add('hidden');
    resultadoTexto.innerHTML = '¡Combatiendo!';
    
    arena.classList.add('start-anim');

    arena.innerHTML = `
        <div class="lado-jugador">
            <img src="${jugador.avatar}" class="fighter-img" alt="Tú"> 
            <h3>${jugador.nombre}</h3>
            <p>HP: ${jugador.vidaActual}</p>
        </div>
        <div class="lado-enemigo">
            <img src="${enemigo.imagen}" class="fighter-img" alt="Enemigo"> 
            <h3>${enemigo.nombre}</h3>
            <p>HP: ${enemigo.vida}</p>
        </div>
    `;

    void arena.offsetWidth;

    setTimeout(() => {
        arena.classList.remove('start-anim');
    }, 50);

    setTimeout(() => {
        const resultado = combatir(jugador, enemigo);
        
        if (resultado.ganador === jugador) {
            jugador.sumarPuntos(resultado.puntos);
            resultadoTexto.innerHTML = `<span class="result-victory">¡Victoria! +${resultado.puntos} pts</span>`;
        } else {
            resultadoTexto.innerHTML = `<span class="result-defeat">Derrota... (HP: 0)</span>`;
        }
        
        const hpText = arena.querySelector('.lado-jugador p');
        if(hpText) hpText.innerText = `HP: ${jugador.vidaActual}`;
        
        btnNext.classList.remove('hidden');
        
    }, 1500);
}

/**
 * Muestra la pantalla final con el rango obtenido (Escena 6).
 * Lanza confeti si el jugador ha ganado.
 * @returns {void}
 */
function finJuego() {
    mostrarEscena('scene-6');
    const rango = obtenerRango(jugador.puntos);
    document.getElementById('final-rank').innerHTML = `
        Rango: <strong class="rank-text">${rango}</strong>
        <br>Puntos: ${jugador.puntos}
    `;

    if (window.confetti) {
        window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
}