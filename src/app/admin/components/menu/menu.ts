import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (10, 'ADMIN_NAV.DASHBOARD', '/admin', null, 'dashboard', null, false, 0),
    new Menu (20, 'ADMIN_NAV.MENU_ITEMS', null, null, 'grid_on', null, true, 0),  
    new Menu (21, 'ADMIN_NAV.CATEGORIES', '/admin/menu-items/categories', null, 'category', null, false, 20), 
    new Menu (22, 'ADMIN_NAV.MENU_ITEMS_LIST', '/admin/menu-items/list', null, 'list', null, false, 20), 
    new Menu (23, 'ADMIN_NAV.MENU_ITEM_DETAIL', '/admin/menu-items/detail', null, 'remove_red_eye', null, false, 20),  
    new Menu (24, 'ADMIN_NAV.ADD_MENU_ITEM', '/admin/menu-items/add', null, 'add_circle_outline', null, false, 20), 
    new Menu (30, 'ADMIN_NAV.SALES', null, null, 'monetization_on', null, true, 0),  
    new Menu (31, 'ADMIN_NAV.ORDERS', '/admin/sales/orders', null, 'list_alt', null, false, 30), 
    new Menu (32, 'ADMIN_NAV.TRANSACTIONS', '/admin/sales/transactions', null, 'local_atm', null, false, 30),  
    new Menu (40, 'ADMIN_NAV.USERS', '/admin/users', null, 'group_add', null, false, 0), 
    new Menu (45, 'ADMIN_NAV.RESERVATIONS', '/admin/reservations', null, 'event', null, false, 0),  
]
