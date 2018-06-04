import { SortDirection } from '../../ss-elements/common/models/ss-sort-model';
import { SsSortModel } from './../../ss-elements/common/models/ss-sort-model';

export class AtlasApiResponse<T> {
    private _Entities: Array<T>;
    private _OtherInfo: any;
    private _PagingInfo: PagingInfo;

    get Entities(): Array<T> {
        return this._Entities;
    }
    set Entities(value: Array<T>) {
        this._Entities = value;
    }

    get OtherInfo(): any {
        return this._OtherInfo;
    }
    set OtherInfo(value: any) {
        this._OtherInfo = value;
    }

    get PagingInfo(): PagingInfo {
        return this._PagingInfo;
    }
    set PagingInfo(value: PagingInfo) {
        this._PagingInfo = value;
    }
    constructor() {
        this._Entities = [];
        this._PagingInfo = new PagingInfo(0, 0, 1, 10);
    }
}

export class PagingInfo {
    private _count: number;
    private _totalCount: number;
    private _pageNumber: number;
    private _pageSize: number;

    get PageSize(): number {
        return this._pageSize;
    }
    set PageSize(value: number) {
        this._pageSize = value;
    }

    get Count(): number {
        return this._count;
    }
    set Count(value: number) {
        this._count = value;
    }

    get TotalCount(): number {
        return this._totalCount;
    }
    set TotalCount(value: number) {
        this._totalCount = value;
    }


    get PageNumber(): number {
        return this._pageNumber;
    }
    set PageNumber(value: number) {
        this._pageNumber = value;
    }

    constructor(count: number, totalCount: number, pageNumber: number, pageSize: number) {
        this._count = count;
        this._totalCount = totalCount;
        this._pageNumber = pageNumber;
        this._pageSize = pageSize;
    }

}

export class AtlasApiRequest {
    PageNumber: number;
    PageSize: number;
    SortBy: SsSortModel = { SortField: 'createdon', Direction: SortDirection.Descending };

    constructor(pageNumber: number, pageSize: number, sortBy: string, sortDirection: SortDirection) {
        this.PageNumber = pageNumber;
        this.PageSize = pageSize;
        this.SortBy = { SortField: sortBy, Direction: sortDirection };
    }
}


export class AtlasApiRequestWithParams extends AtlasApiRequest {
    private _atlasParams: AtlasParams[];
    get Params(): AtlasParams[] {
        return this._atlasParams;
    }
    set Params(value: AtlasParams[]) {
        this._atlasParams = value;
    }

    constructor(pageNumber: number, pageSize: number, sortBy: string, sortDirection: SortDirection, paramArray: AtlasParams[]) {
        super(pageNumber, pageSize, sortBy, sortDirection);
        this._atlasParams = paramArray;
    }
}

export class AtlasParams {
    private _key: string;
    private _value: any;
    get Key(): string {
        return this._key;
    }
    set Key(value: string) {
        this._key = value;
    }
    get Value(): any {
        return this._value;
    }
    set Value(value: any) {
        this._value = value;
    }
    constructor(key: string, value: any) {
        this._key = key;
        this._value = value;
    }
}