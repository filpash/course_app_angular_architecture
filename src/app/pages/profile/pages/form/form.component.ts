import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, zip } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "@app/store";
import * as fromDictionaries from "@app/store/dictionaries";
import * as fromUser from "@app/store/user";
import * as fromForm from "../../store/form";

import { StepperService } from "./components/stepper/services";
import { MapperService } from "@app/pages/profile/pages/form/services";
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

  personal$: Observable<PersonalForm>;
  professional$: Observable<ProfessionalForm>;

  profile$: Observable<ProfileForm>;
  private user: fromUser.User;

  private isEditing: boolean;
  private destroy = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    public stepper: StepperService,
    public mapper: MapperService
  ) { }

  ngOnInit(): void {

    this.user = this.route.snapshot.data.user;
    this.isEditing = !!this.user;

    this.profile$ = this.store.pipe(select(fromForm.getFormState));
    this.personal$ = this.store.pipe(select(fromForm.getPersonalForm));
    this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm));

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));

    if (this.user) {
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(new fromForm.Set(form));
    }

    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' }
    ]);

    this.stepper.complete$.pipe(
      switchMap(() => zip(this.profile$, this.dictionaries$)),
      takeUntil(this.destroy))
        .subscribe(([profile, dictionaries]) => {
          this.onComplete(profile, this.user, dictionaries);
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
    this.store.dispatch(new fromForm.Update({ personal: data }));
  }

  onChangeProfessional(data: ProfessionalForm): void {
    this.store.dispatch(new fromForm.Update({ profession: data }));
  }

  private onComplete(profile: ProfileForm, user: fromUser.User, dictionaries: fromDictionaries.Dictionaries): void {

    if (this.isEditing) {

      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(new fromUser.Update(request));

    } else {

      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(new fromUser.Create(request));

    }
  }
}
