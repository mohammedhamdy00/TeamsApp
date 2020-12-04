import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { player } from '@app/_models/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService} from '@app/_services/player.service';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'player.component.html' })
export class PlayerComponent {
    playerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    currentUser: User;
    playerFromApi: player[];
    

    constructor(
        private formBuilder: FormBuilder,
        private playerservice: PlayerService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        return this.playerservice.getAll()
        .pipe(first())
        .subscribe(
            data => {
                this.playerFromApi=data
                this.loading = false;
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }
}