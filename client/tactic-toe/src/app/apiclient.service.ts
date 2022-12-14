import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { succinctAi } from './aiType';
@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  allAi: BehaviorSubject<succinctAi[]> = new BehaviorSubject<succinctAi[]>([]);
  public sharedAllAi: Observable<succinctAi[]> = this.allAi.asObservable();
  chosen = 1;

  editAiState: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public sharedEditAi: Observable<any> = this.editAiState.asObservable();

  constructor(private api: HttpClient) {
    this.getAllAi()
  }

  editAi(id:number){
      this.editAiState.next({id:id});
  }

  getAiMove(board: string, id:number) {
    return this.api.post<string>(`api/ai/move`, JSON.stringify({board, id}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getRandomMove(board: string) {
    return this.api.post<string>(`api/ai/randommove`, JSON.stringify({board}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getPerfectMove(board: string, toPlay: 'X' | 'O') {
    return this.api.post<string>(`api/ai/perfectmove`, JSON.stringify({board, toPlay}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  sendMatch(matchMoves: ((number | string)[])[], result: 'win'|'draw'|'lose', id:number) {
    return this.api.post<any>(`api/ai/train`, JSON.stringify({
      match: {
        result,
        matchMoves
      },
      id
    }), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getAllAi() {
    this.api.get<succinctAi[]>('api/ai/getAllAi', {
      withCredentials: true
    }).subscribe({
      next: data => {
        this.allAi.next(data);

        if (data.length) this.chosen = (data[0] as any).id
      },
      error: error => console.log(error)
    })
  }

  getAi(id:number) {
    return this.api.post('api/ai/get', JSON.stringify({id: id}), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }

  createAi(ai: {name:string, win:number, lose:number, draw:number, color:string}) {
    return this.api.post('api/ai/create', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }
  deleteAi(ai:{id:number}){
    return this.api.post('api/ai/delete', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }
  updateAi(ai: {name:string, win:number, lose:number, draw:number, color:string, id:number}) {
    return this.api.post('api/ai/edit', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }

}
