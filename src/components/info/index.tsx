import React from "react";
import { Player } from "../../types";

interface InfoProps {
    currentPlayer: Player;
    draw: boolean;
    win: boolean;
}

export const Info: React.FC<InfoProps> = ({ currentPlayer, draw, win }) => {
    const status = draw
    ? "Ничья"
    : win
    ? `Выиграл ${currentPlayer}`
    : `Сейчас ходит ${currentPlayer}`;
    return <span className='turn'>{status}</span>
}