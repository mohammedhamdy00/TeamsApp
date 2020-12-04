import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { team } from '@app/_models/team';
import { TeamService} from '@app/_services/team.service';
import { UserService, AuthenticationService } from '@app/_services';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({ templateUrl: 'team.component.html' })
export class TeamComponent {
    loading = false;
    currentUser: User;
    teamFromApi: team[];
    error:any
    constructor(
        private teamservice: TeamService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        
        return this.teamservice.getAll()
        .pipe(first())
        .subscribe(
            data => {
                this.teamFromApi=data
                this.loading = false;
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }
}