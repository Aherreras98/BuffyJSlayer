import { mercado } from './mercado.js';

console.log("=== INICIO DÍA 1: ESTRUCTURA ===");
console.log("Magic Box Abierto. Productos cargados:", mercado.length);
mercado.forEach(p => {
    console.log(`- ${p.nombre}: ${p.formatPrice()}`);
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Cargado. Escena 1 visible.");
});