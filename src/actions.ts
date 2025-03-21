import { WIN_PATTERNS } from "./constants";
import { Field, Player } from "./types";

export const checkWin = (fields: Field[], player: Player) => {
    return WIN_PATTERNS.find((combo) => combo.every(cIndex => fields[cIndex] === player));
};

export const checkDraw = (fields: Field[]): boolean => {
    return fields.every((field) => !!field);    
};
