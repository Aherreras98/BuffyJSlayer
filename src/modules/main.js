import { Jugador } from './jugador.js';
import { Mercado } from './mercado.js';
import { Enemigo, Jefe } from './enemigo.js';
import { RAREZA } from '../../constants.js';

const jugador = new Jugador("Buffy", "src/img/buffy.png");
const mercado = new Mercado();

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
        });
    });
}