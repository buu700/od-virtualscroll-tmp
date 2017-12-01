import { ChangeDetectorRef, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/partition';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import { IVirtualScrollOptions } from './basic';
import { ScrollObservableService } from './service';
import { IUserCmd } from './userCmd';
export declare class VirtualScrollComponent implements OnInit, OnDestroy {
    private _elem;
    private _cdr;
    private _componentFactoryResolver;
    private _obsService;
    private _templateRef;
    private _viewContainer;
    vsData: Observable<any[]>;
    vsOptions: Observable<IVirtualScrollOptions>;
    vsResize: Observable<any>;
    vsUserCmd: Observable<IUserCmd>;
    vsDebounceTime: number;
    vsEqualsFunc: (prevIndex: number, curIndex: number) => boolean;
    height: number;
    width: string;
    private _rowFactory;
    private _subs;
    constructor(_elem: ElementRef, _cdr: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver, _obsService: ScrollObservableService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}