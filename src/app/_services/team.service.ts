import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import {team} from '@app/_models/team'

@Injectable({ providedIn: 'root' })

export class TeamService {
    public teams:team[]
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<team[]>(`${environment.apiUrl}/Teams/AllTeams`).pipe(
            map(team=>
                this.teams=team
                )
        );
    }

    getById(id: number) {
        return this.http.get<team>(`${environment.apiUrl}Teams/GetTeamsDetailsById/${id}`);
    }
    editById(team: team) {
        return this.http.patch<team>(`${environment.apiUrl}Teams/UpdateTeamDetails/${team.id}`,team);
    }
    addteam(team:team){
       this.http.post<team>(`${environment.apiUrl}Teams/InsertTeamDetails`,team);

    }
    deleteteam(id:number){
        this.http.delete<team>(`${environment.apiUrl}Teams/DeleteTeamDetails/${id}`);
    }
}