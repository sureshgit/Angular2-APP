export class searchFilters {
    query: string | null;
    location: string | null;
    category: string | null;
    state: string | number;
    subcategory: string | null;
    business: string | null;
    offering: number | null;        
    isRefreshing: boolean = false;

    constructor(query = null, location = null, category = null, state = null, subcategory = null, business = null, offering = null) {
        this.query = query;
        this.location = location;
        this.category = category;
        this.state = state;
        this.subcategory = subcategory;
        this.business = business;
        this.offering = offering;                        
        this.isRefreshing = false;
    }
}