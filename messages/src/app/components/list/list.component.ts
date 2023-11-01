import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { DBService } from 'src/app/services/db.service';
import { NewComponent } from '../new/new.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NewComponent],
  providers: [DBService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public emittedFirst = false;
  public messages$!: Observable<any[]>;
  dbSvs = inject(DBService);

  constructor() {
    this.messages$ = this.dbSvs.db.messages
      .find({
        selector: {},
        sort: [{ id: 'desc' }],
      })
      .$.pipe(
        tap(() => {
          if (!this.emittedFirst) {
            this.emittedFirst = true;
          }
        })
      );
  }
}
