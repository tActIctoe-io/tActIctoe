import { Component, Host, Input, OnInit } from '@angular/core';
import { UltimateComponent } from '../ultimate/ultimate.component';
@Component({
  selector: 'app-little-board',
  templateUrl: './little-board.component.html',
  styleUrls: ['./little-board.component.css']
})
export class LittleBoardComponent implements OnInit {
  ai:any = 'X';
  human:any = 'O';
  scores:any = {
    X: 10,
    O: -10,
    tie: 0
  };
  @Input() values:any = [['','',''],['','',''],['','','']]; currentPlayer:any = this.human;
  @Input() square:any = 0; 
  @Input() state:any =0;
  

  constructor(@Host() private parentComp:UltimateComponent) { }

  ngOnInit(): void {
    
  }


  bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move:any;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (this.values[i][j] == '') {
          this.values[i][j] = this.ai;
          let score = this.minimax(this.values, 0, false);
          this.values[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    this.values[move.i][move.j] = this.ai;
    this.currentPlayer = this.human;
  }

  mousePressed(i:number,j:number) {
    this.parentComp.mousePressed(this.square,i,j);
    // if (this.currentPlayer == this.human) {
    //   // Human make turn
    //   // If valid turn
    //   if (this.values[i][j] == '') {
    //     this.values[i][j] = this.human;
    //     this.currentPlayer = this.ai;
    //     this.bestMove();
    //   }
    // }
  }
  
  minimax(board:any, depth:any, isMaximizing:any) {
    let result = this.checkWinner();
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
            let score = this.minimax(board, depth + 1, false);
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
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = '';
            if(bestScore>score) bestScore=score
          }
        }
      }
      return bestScore;
    }
  }
  
  equals3(a:any, b:any, c:any) {
    return a == b && b == c && a != '';
  }

  checkWinner() {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (this.equals3(this.values[i][0], this.values[i][1], this.values[i][2])) {
        winner = this.values[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (this.equals3(this.values[0][i], this.values[1][i], this.values[2][i])) {
        winner = this.values[0][i];
      }
    }
  
    // Diagonal
    if (this.equals3(this.values[0][0], this.values[1][1], this.values[2][2])) {
      winner = this.values[0][0];
    }
    if (this.equals3(this.values[2][0], this.values[1][1], this.values[0][2])) {
      winner = this.values[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.values[i][j] == '') {
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


}
