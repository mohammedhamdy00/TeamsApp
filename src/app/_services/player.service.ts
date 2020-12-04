import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import {player} from'@app/_models/player';


@Injectable({ providedIn: 'root' })
export class PlayerService {
    public player:player[]
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<player[]>(`${environment.apiUrl}/Players/GetPlayers`).pipe(
            map(player=>
                this.player=player)
        );
    }

    getById(id: number) {
        return this.http.get<player>(`${environment.apiUrl}Players/GetPlayerDetailsById/${id}`);
    }
    editById(player:player) {
        return this.http.patch<player>(`${environment.apiUrl}Players/UpdatePlayerDetails/${player.id}`,player);
    }
    addteam(player:player){
       this.http.post<player>(`${environment.apiUrl}Players/InsertPlayerDetails`,player);

    }
    deleteteam(id:number){
        this.http.delete<player>(`${environment.apiUrl}Players/DeletePlayerDetails/${id}`);
    }
}