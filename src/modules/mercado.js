import { Producto } from './Producto.js';
import { RARITY, TYPE } from '../../constants.js'; 

export const mercado = [
    new Producto('Estaca Mr. Pointy', 'src/img/stake.png', 5000, RARITY.COMMON, TYPE.WEAPON, { ataque: 10 }),
    new Producto('Hacha de Giles', 'src/img/axe.png', 12000, RARITY.RARE, TYPE.WEAPON, { ataque: 25 }),
    new Producto('Guadaña Mística', 'src/img/scythe.png', 50000, RARITY.EPIC, TYPE.WEAPON, { ataque: 60 }),
    new Producto('Chaqueta de Cuero', 'src/img/jacket.png', 8000, RARITY.COMMON, TYPE.ARMOR, { defensa: 15 }),
    new Producto('Cruz de Plata', 'src/img/cross.png', 15000, RARITY.RARE, TYPE.ARMOR, { defensa: 35 }),
    new Producto('Agua Bendita', 'src/img/water.png', 4000, RARITY.COMMON, TYPE.CONSUMABLE, { vida: 30 }),
    new Producto('Hechizo de Willow', 'src/img/spell.png', 10000, RARITY.EPIC, TYPE.CONSUMABLE, { vida: 100 })
];