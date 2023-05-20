import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivityService } from 'src/app/Views/core/services/activity.service';
import { SubscriptionService } from 'src/app/Views/core/services/subsciption.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
})
export class FilterContainerComponent implements OnInit, OnDestroy {
  filterform!: FormGroup;
  activities$!: Observable<any>;
  subscriptions$!: Observable<any>;
  private _unsubscribeAll: Subject<boolean> = new Subject();
  statuses: any[] = [
    { name: 'Active', value: 1 },
    { name: 'Not Active', value: 2 },
  ];
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _activitiesService: ActivityService,
    private _subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.initFormControl();
    this.watchFormChange();
    this.loadData();
  }

  private initFormControl() {
    this.filterform = this.fb.group({
      name: [''],
      activityId: [''],
      subscribtion: [''],
      status: [''],
    });
  }

  private loadData() {
    this._activitiesService.getAllactivities();
    this._subscriptionService.getAllsubscriptions();
    this.activities$ = this._activitiesService.activities$;
    this.subscriptions$ = this._subscriptionService.subscriptions$;
  }

  private watchFormChange() {
    this.filterform.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        const filter = {
          ...value,
        } as string;

        this.onFilterChange.emit(filter);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
  }
}
