import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ultimate',
  templateUrl: './ultimate.component.html',
  styleUrls: ['./ultimate.component.css']
})
export class UltimateComponent implements OnInit {

  scores:any = {
    X: 10,
    O: -10,
    tie: 0
  };
  initialSquares:any = [0,1,2,3,4,5,6,7,8];
  dictNextSquare:any = {'00':0,'01':1,'02':2,'10':3,'11':4,'12':5,'20':6,'21':7,'22':8};
  nextSquareToPlay:any=4;
  ai:any = 'X';
  EveryState:any = [0,0,0,0,0,0,0,0,0]
  human:any = 'O';
  currentPlayer:any = this.human;
  board:any=[[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']]];
  constructor() { }

  ngOnInit(): void {
    
  }
  mousePressed(square:number,i:number,j:number){
    console.log(square,i,j);
    if (this.currentPlayer == this.human) {
        // Human make turn
        // If valid turn
        if (this.board[square][i][j] == '') {
          this.board[square][i][j] = this.human;
          this.currentPlayer = this.ai;
          this.nextSquareToPlay= this.dictNextSquare[`${i}${j}`];
          console.log('nextMove is:', this.nextSquareToPlay)
          this.bestMove();
        }
      }
  }

  bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move:any;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (this.board[this.nextSquareToPlay][i][j] == '') {
          this.board[this.nextSquareToPlay][i][j] = this.ai;
          let score = this.minimax(this.board[this.nextSquareToPlay], 0, false,this.nextSquareToPlay);
          this.board[this.nextSquareToPlay][i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
          this.EveryState = [0,0,0,0,0,0,0,0,0];
        }
      }
    }
    
    this.board[this.nextSquareToPlay][move.i][move.j] = this.ai;
    console.log(move.i,move.j)
    this.nextSquareToPlay=this.dictNextSquare[`${move.i}${move.j}`];
    this.currentPlayer = this.human;
    
  }


  minimax(board:any, depth:any, isMaximizing:any,nextSquare:any) {
    if(this.EveryState[nextSquare] === 3)
    if(depth===3) return 0;//BLOCKING JUst 3 thoughts for each board
    let result = this.checkWinner(board);
   
    console.log(result)
    if (result !== null) {
      return this.scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = this.ai;
            let nextSquare = this.dictNextSquare[`${i}${j}`];
            if(this.EveryState[nextSquare] === 0){
              depth=0;
            }
            let score = this.minimax(this.board[nextSquare], depth + 1, false,nextSquare);
            board[i][j] = '';
            if(bestScore<score) bestScore=score
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = this.human;
            let nextSquare = this.dictNextSquare[`${i}${j}`];
            let score = this.minimax(this.board[nextSquare], depth + 1, true,nextSquare);
            board[i][j] = '';
            if(bestScore>score) bestScore=score
          }
        }
      }
      return bestScore;
    }

  }
  checkWinner(board:any) {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (this.equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (this.equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (this.equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (this.equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  equals3(a:any, b:any, c:any) {
    return a == b && b == c && a != '';
  }
}
