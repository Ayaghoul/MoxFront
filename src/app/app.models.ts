export class Restaurant {
    constructor(public id: number,
                public name: string,
                public address: string,
                public phone: string) {
    }
}

export class Employee {
    constructor(public id: number,
                public image: string,
                public firstName: string,
                public lastName: string,
                public middleName: string,
                public email: string,
                public phone: string,
                public addresses: Address[],
                public position: Position) {
    }
}

//['General Manager','Assistant Manager'] ... https://aptito.com/blog/restaurant-positions-and-descriptions
export class Position {
    constructor(public id: number,
                public name: string) {
    }
}

export class Address {
    constructor(public id: number,
                public country: Country,
                public city: string,
                public place: string,
                public postalCode: string,
                public addressLine: string) {
    }
}

export class Country {
    constructor(public name: string,
                public code: string) {
    }
}

export class Customer {
    constructor(public id: number,
                public fullName: string,
                public email: string,
                public phoneNumber: string,
                public address: string) {
    }
}

export class User {
    constructor(public id?: number,
                public username?: string,
                public email?: string,
                public phoneNumber?: string,
                public address?: string) {
    }
}

export class Reservation {
    constructor(public id: number,
                public date: string,
                public time: string,
                public customer: Customer,
                public user: User,
                public tableNumber: number,
                public status: ReservationStatus) {
    }
}

// Approved, Cancelled, Pending
export class ReservationStatus {
    constructor(public id: number,
                public name: string) {
    }
}


export class Order {
    constructor(public id: number,
                public date: string,
                public items: MenuItem[],
                public quantity: number,
                public amount: number,
                public status: OrderStatus) {
    }
}

export class Chef {
    constructor(public idChef: number,
                public description: string,
                public ChefName: string,
                public phoneNumber: number,
                public email: string,
                public menuItems: MenuItem[]) {
    }
}

//Completed, Processing, On Hold, Refunded, Pending
export class OrderStatus {
    constructor(public id: number,
                public name: string) {
    }
}

export class MenuItem {
    constructor(public id: number,
                public name: string,
                public description: string,
                public price: number,
                public image: string,
                public discount: number,
                public ratingsCount: number,
                public ratingsValue: number,
                public availableCount: number,
                public cartCount: number,
                public weight: number,
                public isVegetarian: boolean,
                public categoryId: number,
                public category: Category,
    ) {
    }
}


export class Category {
    constructor(public id: number,
                public name: string,
                public description: string) {
    }
}

export class Cart {
    constructor(public id: number,
                public customer: User,
                public items: MenuItem[]) {
    }
}

export class Pagination {
    constructor(public page: number,
                public perPage: number,
                public prePage: number | null,
                public nextPage: number | null,
                public total: number,
                public totalPages: number) {
    }
}

