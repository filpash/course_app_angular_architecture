import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "@app/store";
import * as fromDictionaries from "@app/store/dictionaries";
import * as fromUser from "@app/store/user";

import { StepperService } from "./components/stepper/services";
import { PersonalForm } from "./components/personal/personal.component";
import { ProfessionalForm } from "./components/professional/professional.component";

export interface ProfileForm {
  personal: PersonalForm;
  profession: ProfessionalForm;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$: Observable<boolean>;

  private user: fromUser.User;

  private destroy = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    public stepper: StepperService
  ) { }

  ngOnInit(): void {

    this.user = this.route.snapshot.data.user;

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));

    this.stepper.init([
      { key: 'professional', label: 'Professional' },
      { key: 'personal', label: 'Personal' }
    ]);

    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('completed')
    });
    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('canceled')
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onChangePersonal(data: PersonalForm): void {
    console.log('personal changed = ', data);
  }

  onChangeProfessional(data: ProfessionalForm): void {
    console.log('professional changed = ', data);
  }
}
