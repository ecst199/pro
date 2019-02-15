import {Square} from "../models/Square";
import {Piece} from "./Piece";

class Chessboard {
    board: Square[][] = new Square[8];
    pieces: Piece[];
    
    constructor() {
        this.reset();
    }
    
    setSquare(row: number, col: number, pc: Piece){
        this.board[row][col].currentPiece = pc;
    }

    getSquare(row: number, col: number): Piece{
        return this.board[row][col].currentPiece;
    };

    reset(){
        this.board.slice(0, this.board.length)
        this.pieces.slice();

        this.createPieces();
        this.createSquares();
        this.setPieces();
    }

    createPieces(){
        let i: number;

        this.pieces.push(new Piece(i++, 0, 0, 'R', 'b'));
        this.pieces.push(new Piece(i++, 0, 1, 'N', 'b'));
        this.pieces.push(new Piece(i++, 0, 2, 'B', 'b'));
        this.pieces.push(new Piece(i++, 0, 3, 'Q', 'b'));
        this.pieces.push(new Piece(i++, 0, 4, 'K', 'b'));
        this.pieces.push(new Piece(i++, 0, 5, 'B', 'b'));
        this.pieces.push(new Piece(i++, 0, 6, 'N', 'b'));
        this.pieces.push(new Piece(i++, 0, 7, 'R', 'b'));

        this.pieces.push(new Piece(i++, 0, 0, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 1, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 2, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 3, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 4, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 5, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 6, 'p', 'b'));
        this.pieces.push(new Piece(i++, 0, 7, 'p', 'b'));

        this.pieces.push(new Piece(i++, 0, 0, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 1, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 2, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 3, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 4, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 5, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 6, 'p', 'w'));
        this.pieces.push(new Piece(i++, 0, 7, 'p', 'w'));

        this.pieces.push(new Piece(i++, 0, 0, 'R', 'w'));
        this.pieces.push(new Piece(i++, 0, 1, 'N', 'w'));
        this.pieces.push(new Piece(i++, 0, 2, 'B', 'w'));
        this.pieces.push(new Piece(i++, 0, 3, 'Q', 'w'));
        this.pieces.push(new Piece(i++, 0, 4, 'K', 'w'));
        this.pieces.push(new Piece(i++, 0, 5, 'B', 'w'));
        this.pieces.push(new Piece(i++, 0, 6, 'N', 'w'));
        this.pieces.push(new Piece(i++, 0, 7, 'R', 'w'));
    }

    createSquares(){
        let col: string = 'z';
        let white: boolean = true;

        for (let i: number; i < 8; i++){
            for (let j: number; j < 8; j++){sq: Square;

                let sq: Square = new Square();

                switch (j)
                {
                    case 0:
                        col = 'a';
                        break;
                    case 1:
                        col = 'b';
                        break;
                    case 2:
                        col = 'c';
                        break;
                    case 3:
                        col = 'd';
                        break;
                    case 4:
                        col = 'e';
                        break;
                    case 5:
                        col = 'f';
                        break;
                    case 6:
                        col = 'g';
                        break;
                    case 7:
                        col = 'h';
                        break;
                } 
                
                sq.row = i;
                sq.col = j;
                sq.location = col.toString() + (8 - i).toString();

                if (white) { sq.clrDefault = '#D3D3D3'; white = false; }
                else { sq.clrDefault = 	'#A9A9A9'; white = true; }

                this.board[i][j] = sq;
            }

            white = !white;

        }
    }

    setPieces(){
        let pc: Piece;

        for (let i: number = 0; i < this.pieces.length; i++)
            {
                pc = this.pieces[i];
                this.board[pc.row][pc.col].currentPiece = pc;
            }
    }

    possibleMoves(sq: Square, pc: Piece): Square[]{
        let moves: Square[];
        let currPiece: Piece;

        //Black pawns moves
        if (pc.player == 'b' && pc.type == 'P')
            {
                let r: number;
                let c: number;

                
                // Only allows these moves if there are enemies there

                // Bottom left
                r = pc.row + 1;
                c = pc.col - 1;
                if (r <= 7 && c >= 0)
                {
                    currPiece = this.board[r][c].currentPiece;
                    if (currPiece != null && currPiece.player != pc.player) { moves.push(this.board[r][c]); }
                }

                // Bottom Right
                r = pc.row + 1;
                c = pc.col + 1;
                if (r <= 7 && c <= 7)
                {
                    currPiece = this.board[r][c].currentPiece;
                    if (currPiece != null && currPiece.player != pc.player) { moves.push(this.board[r][c]); }
                }                

                // Square in front
                r = pc.row + 1;
                c = pc.col;
                if (r <= 7)
                {
                    currPiece = this.board[r][c].currentPiece;
                    if (currPiece == null) { moves.push(this.board[r][c]); }
                    else { return moves; }
                }

                // 2nd Square if it's the first move
                if (pc.firstMove)
                {
                    r = pc.row + 2;
                    c = pc.col;
                    if (r <= 7)
                    {
                        currPiece = this.board[r][c].currentPiece;
                        if (currPiece == null) { moves.push(this.board[r][c]); }
                    }
                }
                
            }

        //White pawns moves
        if (pc.player == 'w' && pc.type == 'P')
            {
                let r: number;
                let c: number;

                // Only allows these moves if there are enemies there

                // Top left
                r = pc.row - 1;
                c = pc.col - 1;
                if (r >= 0 && c >= 0)
                {
                    currPiece = this.board[r][c].currentPiece;
                    if (currPiece != null && currPiece.player != pc.player) { moves.push(this.board[r][c]); }
                }

                // Top Right
                r = pc.row - 1;
                c = pc.col + 1;
                if (r >= 0 && c <= 7)
                {
                    currPiece = this.board[r][c].currentPiece;
                    if (currPiece != null && currPiece.player != pc.player) { moves.push(this.board[r][c]); }
                }
                
                // Square in front
                r = pc.row - 1;
                c = pc.col;
                if (r >= 0)
                {
                    currPiece = this.board[r][c].currentPiece;
                    if (currPiece == null) { moves.push(this.board[r][c]); }
                    else { return moves; }
                }

                // 2nd Square if it's the first move
                if (pc.firstMove)
                {
                    r = pc.row - 2;
                    c = pc.col;
                    if (r >= 0)
                    {
                        currPiece = this.board[r][c].currentPiece;
                        if (currPiece == null) { moves.push(this.board[r][c]); }
                    }
                }
                let j: number;
            }
            
        //Rooks moves
        if (pc.type == 'R')
            {
                for (let i: number = pc.col; i > 0; i--)
                {
                    currPiece = this.board[sq.row] [i - 1].currentPiece;

                    if (currPiece == null || currPiece.player != pc.player)
                    {
                        moves.push(this.board[sq.row] [i - 1]);

                        if (currPiece != null)
                        {
                            if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                        }
                    }
                    else
                    {
                        break; // Friendly piece in the way
                    }
                }

                for (let i: number = pc.col; i < 7; i++)
                {
                    currPiece = this.board[sq.row][i + 1].currentPiece;

                    if (currPiece == null || currPiece.player != pc.player)
                    {
                        moves.push(this.board[sq.row][i + 1]);

                        if (currPiece != null)
                        {
                            if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                        }
                    }
                    else
                    {
                        break; // Friendly piece in the way
                    }
                }

                for (let i = pc.row; i > 0; i--)
                {
                    currPiece = this.board[i - 1][pc.col].currentPiece;

                    if (currPiece == null || currPiece.player != pc.player)
                    {
                        moves.push(this.board[i - 1][pc.col]);

                        if (currPiece != null)
                        {
                            if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                        }
                    }
                    else
                    {
                        break; // Friendly piece in the way
                    }
                }

                for (let i: number = pc.row; i < 7; i++)
                {
                    currPiece = this.board[i + 1][pc.col].currentPiece;

                    if (currPiece == null || currPiece.player != pc.player)
                    {
                        moves.push(this.board[i + 1][pc.col]);

                        if (currPiece != null)
                        {
                            if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                        }
                    }
                    else
                    {
                        break; // Friendly piece in the way
                    }
                }
            }

        //Knights moves
        if (pc.type == 'N')
        {
            let r: number;
            let c: number;

            // Top left
            r = pc.row - 2;
            c = pc.col - 1;
            if (r >= 0 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Top Right
            r = pc.row - 2;
            c = pc.col + 1;
            if (r >= 0 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Middle Left Top
            r = pc.row - 1;
            c = pc.col - 2;
            if (r >= 0 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Middle Left Bottom
            r = pc.row + 1;
            c = pc.col - 2;
            if (r <= 7 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Middle Right Top
            r = pc.row - 1;
            c = pc.col + 2;
            if (r >= 0 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Middle Right Bottom
            r = pc.row + 1;
            c = pc.col + 2;
            if (r <= 7 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Bottom left
            r = pc.row + 2;
            c = pc.col - 1;
            if (r <= 7 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Bottom Right
            r = pc.row + 2;
            c = pc.col + 1;
            if (r <= 7 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }
        }

        //Bishops moves
        if (pc.type == 'B')
        {
            let r: number;
            let c: number;

            r = pc.row - 1;
            c = pc.col - 1;
            while (r >= 0 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r--;
                c--;
            }

            r = pc.row - 1;
            c = pc.col + 1;
            while (r >= 0 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r--;
                c++;
            }

            r = pc.row + 1;
            c = pc.col - 1;
            while (r <= 7 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r++;
                c--;
            }

            r = pc.row + 1;
            c = pc.col + 1;
            while (r <= 7 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r++;
                c++;
            }
        }

        //Queens Moves
        if (pc.type == 'Q')
        {
            for (let i: number = pc.col; i > 0; i--)
            {
                currPiece = this.board[sq.row][i - 1].currentPiece;

                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[sq.row][i - 1]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }
            }

            for (let i: number = pc.col; i < 7; i++)
            {
                currPiece = this.board[sq.row][i + 1].currentPiece;

                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[sq.row][i + 1]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }
            }

            for (let i: number = pc.row; i > 0; i--)
            {
                currPiece = this.board[i - 1][pc.col].currentPiece;

                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[i - 1][pc.col]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }
            }

            for (let i: number = pc.row; i < 7; i++)
            {
                currPiece = this.board[i + 1][pc.col].currentPiece;

                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[i + 1][pc.col]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }
            }

            let r: number;
            let c: number;

            r = pc.row - 1;
            c = pc.col - 1;
            while (r >= 0 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r--;
                c--;
            }

            r = pc.row - 1;
            c = pc.col + 1;
            while (r >= 0 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r--;
                c++;
            }

            r = pc.row + 1;
            c = pc.col - 1;
            while (r <= 7 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r++;
                c--;
            }

            r = pc.row + 1;
            c = pc.col + 1;
            while (r <= 7 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player)
                {
                    moves.push(this.board[r][c]);

                    if (currPiece != null)
                    {
                        if (currPiece.player != pc.player) { break; } // Enemy piece in the way
                    }
                }
                else
                {
                    break; // Friendly piece in the way
                }

                r++;
                c++;
            }
        }

        // Kings moves
        if (pc.type == 'K')
        {
            let r: number;
            let c: number;

            // left
            r = pc.row - 1;
            c = pc.col - 1;
            if (r >= 0 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Right
            r = pc.row - 1;
            c = pc.col + 1;
            if (r >= 0 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Middle
            r = pc.row - 1;
            c = pc.col;
            if (r >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Left
            r = pc.row;
            c = pc.col - 1;
            if (c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Right
            r = pc.row;
            c = pc.col + 1;
            if (c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // left
            r = pc.row + 1;
            c = pc.col - 1;
            if (r <= 7 && c >= 0)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Right
            r = pc.row + 1;
            c = pc.col + 1;
            if (r <= 7 && c <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Middle
            r = pc.row + 1;
            c = pc.col;
            if (r <= 7)
            {
                currPiece = this.board[r][c].currentPiece;
                if (currPiece == null || currPiece.player != pc.player) { moves.push(this.board[r][c]); }
            }

            // Black
            if (pc.player == 'b')
            {
                if (pc.firstMove && this.pieces[0].firstMove && this.pieces[0].isAlive && this.board[0][1].currentPiece == null && this.board[0][2].currentPiece == null && this.board[0][3].currentPiece == null)
                {
                    moves.push(this.board[0][2]);
                }
                if (pc.firstMove && this.pieces[7].firstMove && this.pieces[7].isAlive && this.board[0][5].currentPiece == null && this.board[0][6].currentPiece == null)
                {
                    moves.push(this.board[0][6]);
                }
            }
            else // White
            {
                if (pc.firstMove && this.pieces[24].firstMove && this.pieces[24].isAlive && this.board[7][1].currentPiece == null && this.board[7][2].currentPiece == null && this.board[7][3].currentPiece == null)
                {
                    moves.push(this.board[7][2]);
                }
                if (pc.firstMove && this.pieces[31].firstMove && this.pieces[31].isAlive && this.board[7][5].currentPiece == null && this.board[7][6].currentPiece == null)
                {
                    moves.push(this.board[7][6]);
                }
            }
        }

        return moves;
    }

    turn(srcSq: Square, destSq: Square, pc: Piece): string{
        let action: string;

        action = pc.player.toString() + " @ " + srcSq.location + " ";

        // Removes enemy from board
        if (destSq.currentPiece != null)
        {
            action += " x  " + destSq.currentPiece.player.toString() + destSq.currentPiece.type.toString();
            action += " @ " + destSq.location;
            this.pieces[destSq.currentPiece.id].isAlive = false;
        }
        else
        {
            action += " -> " + destSq.location;
        }
        
        srcSq.currentPiece = null;
        destSq.currentPiece = pc;
        pc.col = destSq.col;
        pc.row = destSq.row;
        pc.firstMove = false;

        return action;
    }
}