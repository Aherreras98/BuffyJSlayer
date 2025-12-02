import { Jugador } from './jugador.js';
import { Mercado } from './mercado.js';
import { Enemigo, Jefe } from './enemigo.js';
import { RAREZA } from '../../constants.js';
import { combatir } from './batalla.js';

const jugador = new Jugador("Buffy", "src/img/buffy.png");
const mercado = new Mercado();
let indiceBatalla = 0;

const enemigos = [
    new Enemigo("Spike", "src/img/spike.png", 10, 50),
    new Enemigo("Demonio Venganza", "src/img/demonio.png", 20, 80),
    new Jefe("Willow Oscura", "src/img/willow.png", 35, 150)
];

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema cargado. Enemigos añadidos.");
    
    const rarezas = Object.values(RAREZA);
    const azar = rarezas[Math.floor(Math.random() * rarezas.length)];
    mercado.aplicarOferta(azar, 20); 

    actualizarPerfil();
    pintarMercado();
    configurarNavegacion();
});

function actualizarPerfil() {
    const contenedor = document.querySelector('#scene-1');

    let infoDiv = document.getElementById('player-info-card');
    if (!infoDiv) {
        infoDiv = document.createElement('div');
        infoDiv.id = 'player-info-card';
        infoDiv.className = 'card';
        const btn = contenedor.querySelector('.btn-next');
        contenedor.insertBefore(infoDiv, btn);
    }

    infoDiv.innerHTML = `
        <h3>${jugador.nombre}</h3>
        <p>Vida: ${jugador.vidaBase}</p>
        <p>Puntos: ${jugador.puntos}</p>
        <p><small>Objetos: ${jugador.inventario.length}</small></p>
    `;
}

function pintarMercado() {
    const grid = document.getElementById('market-grid');
    grid.innerHTML = '';

    mercado.productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Tipo: ${prod.tipo}</p>
            <p>Rareza: ${prod.rareza}</p>
            <p class="price">${prod.obtenerPrecioFormateado()}</p>
            <button class="btn-shop">Añadir</button>
        `;

        const btn = card.querySelector('.btn-shop');

        btn.addEventListener('click', () => {
            if (btn.textContent === "Añadir") {
                jugador.anadirItem(prod);
                
                card.classList.add('bought'); 
                btn.textContent = "Retirar";
                console.log("Comprado:", prod.nombre);
            } else {
                const index = jugador.inventario.findIndex(i => i.nombre === prod.nombre);
                if (index > -1) {
                    jugador.inventario.splice(index, 1);
                }

                card.classList.remove('bought');
                btn.textContent = "Añadir";
                console.log("Retirado:", prod.nombre);
            }
            actualizarPerfil();
        });

        grid.appendChild(card);
    });
}

function pintarEnemigos() {
    const grid = document.getElementById('enemies-grid');
    grid.innerHTML = ''; // Limpiar

    enemigos.forEach(enemigo => {
        const card = document.createElement('div');
        card.className = 'card';
        
        let estiloExtra = '';
        let etiqueta = '';
        
        if (enemigo instanceof Jefe) {
            estiloExtra = 'border-color: #d4af37; border-width: 3px;';
            etiqueta = '<br><strong style="color: #d4af37">¡JEFE FINAL!</strong>';
        }

        card.style.cssText = estiloExtra;

        card.innerHTML = `
            <h3>${enemigo.nombre}</h3>
            ${etiqueta}
            <p>⚔️ Ataque: ${enemigo.ataque}</p>
            <p>❤️ Vida: ${enemigo.vida}</p>
        `;

        if (enemigo instanceof Jefe) {
            card.innerHTML += `<p><small>Multiplicador de daño: x${enemigo.multiplicador}</small></p>`;
        }

        grid.appendChild(card);
    });
}

function configurarNavegacion() {
    document.querySelectorAll('.btn-next').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idDestino = e.target.getAttribute('data-to');
            
            document.querySelectorAll('.scene').forEach(sc => sc.classList.remove('active'));
            document.getElementById(idDestino).classList.add('active');

            if (idDestino === 'scene-3') {
                console.log("Inventario actual:", jugador.inventario);
            }

            if (idDestino === 'scene-4') {
                pintarEnemigos();
            }

            if (idDestino === 'scene-5') {
                prepararBatalla();
            }
        });
    });
}

function prepararBatalla() {
    if (indiceBatalla >= enemigos.length) {
        finJuego();
        return;
    }

    const enemigo = enemigos[indiceBatalla];
    const arena = document.querySelector('.battle-arena');
    const resultadoTexto = document.getElementById('battle-result');
    const btnNext = document.getElementById('btn-next-battle');

    btnNext.style.display = 'none';
    resultadoTexto.innerHTML = '¡Luchando...!';

    arena.innerHTML = `
        <div class="lado-jugador">
            <h3>${jugador.nombre}</h3>
            <p>HP: ${jugador.vidaActual}</p>
        </div>
        <div class="lado-enemigo">
            <h3>${enemigo.nombre}</h3>
            <p>HP: ${enemigo.vida}</p>
            <p><small>ATQ: ${enemigo instanceof Jefe ? (enemigo.ataque * enemigo.multiplicador).toFixed(0) : enemigo.ataque}</small></p>
        </div>
    `;

    setTimeout(() => {
        const resultado = combatir(jugador, enemigo);
        
        if (resultado.ganador === jugador) {
            jugador.sumarPuntos(resultado.puntos);
            resultadoTexto.innerHTML = `<span style="color:green">¡Victoria! +${resultado.puntos} pts</span>`;
        } else {
            resultadoTexto.innerHTML = `<span style="color:red">Derrota... Te has quedado sin fuerzas.</span>`;
        }

        arena.querySelector('.lado-jugador p').innerText = `HP: ${jugador.vidaActual}`;

        btnNext.style.display = 'block';

        btnNext.onclick = () => {
            indiceBatalla++;

            const s5 = document.getElementById('scene-5');
            s5.classList.remove('active');
            void s5.offsetWidth;
            s5.classList.add('active');
            
            prepararBatalla();
        };

    }, 1000);
}

function finJuego() {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById('scene-6').classList.add('active');

    document.getElementById('final-rank').innerText = `Puntos Finales: ${jugador.puntos}`;
}