import { ChangeDetectorRef, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IVirtualScrollOptions } from './basic';
import { ScrollObservableService } from './service';
import { IUserCmd } from './userCmd';
export declare class VirtualScrollComponent implements OnInit, OnDestroy {
    private _elem;
    private _cdr;
    private _componentFactoryResolver;
    private _obsService;
    private _zone;
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
    constructor(_elem: ElementRef, _cdr: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver, _obsService: ScrollObservableService, _zone: NgZone);
    private publish<T>(source);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
