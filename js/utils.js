import { duboisData } from './duboisArray.js';


export const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));
export const extraerPalabrasDeRango = filtrarPor('echelon');
export const organizarNiveles = array => Array.from({ length: Math.ceil(array.length / 20) }, (_, i) => array.slice(i * 20, i * 20 + 20));
