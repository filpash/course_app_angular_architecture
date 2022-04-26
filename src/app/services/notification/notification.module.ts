import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { NotificationService } from "@app/services/notification/notification.service";
import { NotificationComponent } from '@app/services/notification/components';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NotificationModule,
      providers: [
        NotificationService
      ]
    }
  }
}
