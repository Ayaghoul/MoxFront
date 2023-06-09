export class Menu {
    constructor(public id: number,
                public role: string,
                public title: string,
                public routerLink: string | null,
                public href: string | null, 
                public target: string | null,
                public hasSubMenu: boolean,
                public parentId: number) { }
} 
