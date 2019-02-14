export class Piece {
    id: number;
    row: number;
    col: number;
    type: string;
    player: string;
    isAlive: boolean;
    firstMove: boolean;

    constructor(_id: number, _row: number, _col: number, _type: string, _player: string) {
        this.id = _id;
        this.row = _row;
        this.col = _col;
        this.type = _type;
        this.player = _player;
        this.isAlive = true;
        this.firstMove = true;
    }
}