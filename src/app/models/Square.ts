import { Color } from "@ionic/core";
import {Piece} from "./Piece";

export class Square {
    clrDefault: Color;          
    selected: boolean = false;     
    possibleMove: boolean = false; 
    currentPiece: Piece = null; 
    row: number;
    col: number;
    location: string;
    
    constructor() 
    {
        this.clrDefault = '#DEB887';
    }
    
}