import { palabrasDeRango, rango } from './utils.js'

const arrayPrimaire = palabrasDeEchelon(rango(1, 11));
const arrayCe2 = palabrasDeEchelon(rango(12, 15));
const arrayCm1 = palabrasDeEchelon(rango(16, 19));
const arrayCm2 = palabrasDeEchelon(rango(20, 23));
const array6eme = palabrasDeEchelon(rango(24, 27));
const array5eme = palabrasDeEchelon(rango(28, 35));
const arrayLycee = palabrasDeEchelon(rango(36, 43));

// Objeto que guarda ids, apuntando a un array
export const menuIdToArrays = {
    'menu-item-cpce1': arrayPrimaire,
    'menu-item-ce2': arrayCe2,
    'menu-item-cm1': arrayCm1,
    'menu-item-cm2': arrayCm2,
    'menu-item-6eme': array6eme,
    'menu-item-54eme': array5eme,
    'menu-item-3eme-lycee': arrayLycee,
};