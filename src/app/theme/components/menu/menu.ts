import { Menu } from './menu.model';

export const horizontalMenuItems = [ 
    new Menu (1,"USER", 'NAV.HOME', '/', null, null, false, 0),
    new Menu (2,"USER", 'MENU', '/menu', null, null, false, 0),
    new Menu (10,"USER", 'NAV.PAGES', null, null, null, true, 0),
    new Menu (11,"USER", 'RESERVATION', '/reservation', null, null, false, 10),
    new Menu (12,"USER", 'NAV.CHEFS', '/chefs', null, null, false, 10),
    new Menu (13,"USER", 'NAV.CHEF', '/chefs/1', null, null, false, 10),
    new Menu (20,"USER", 'ACCOUNT', null, null, null, true, 10),
    new Menu (21,"USER", 'LOGIN', '/login', null, null, false, 20),
    new Menu (22,"USER", 'REGISTER', '/register', null, null, false, 20),
    new Menu (40,"USER", 'NAV.SHOP', null, null, null, true, 10),
    new Menu (41,"USER", 'NAV.SINGLE_MENU', '/menu/17', null, null, false, 40),
    new Menu (42,"USER", 'NAV.CART', '/cart', null, null, false, 40),
    new Menu (43,"USER", 'NAV.CHECKOUT', '/checkout', null, null, false, 40),
    new Menu (60,"USER", 'FAQs', '/faq', null, null, false, 10),
    new Menu (62,"USER", 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 10),
    new Menu (63,"USER", 'Landing', '/landing', null, null, false, 10),
    new Menu (64,"USER", '404 Page', '/404', null, null, false, 10),
    new Menu (70,"USER", 'NAV.CONTACT', '/contact', null, null, false, 0),
    new Menu (80,"USER", 'NAV.ABOUT_US', '/about', null, null, false, 0),
    new Menu (90,"ADMIN", 'NAV.ADMIN', '/admin', null, null, false, 0),
    new Menu (140,"USER", 'NAV.OTHERS', null, null, null, true, 10),
    new Menu (141,"USER", 'NAV.EXTERNAL_LINK', null, 'http://themeseason.com', '_blank', false, 140),
    new Menu (142,"USER", 'NAV.MENU_ITEM', null, '/', '_blank', false, 140),
    new Menu (143,"USER", 'NAV.MENU_ITEM', null,'/', '_blank', false, 140),
    new Menu (144,"USER", 'NAV.MENU_ITEM', null,'/', '_blank', false, 140)
]

export const verticalMenuItems = [
    new Menu (1,"USER", 'NAV.HOME', '/', null, null, false, 0),
    new Menu (2,"USER", 'MENU', '/menu', null, null, false, 0),
    new Menu (10,"USER", 'NAV.PAGES', null, null, null, true, 0),
    new Menu (11,"USER", 'RESERVATION', '/reservation', null, null, false, 10),
    new Menu (12,"USER", 'NAV.CHEFS', '/chefs', null, null, false, 10),
    new Menu (13,"USER", 'NAV.CHEF', '/chefs/1', null, null, false, 10),
    new Menu (20,"USER", 'ACCOUNT', null, null, null, true, 10),
    new Menu (21,"USER", 'LOGIN', '/login', null, null, false, 20),
    new Menu (22,"USER", 'REGISTER', '/register', null, null, false, 20),
    new Menu (40,"USER", 'NAV.SHOP', null, null, null, true, 10),
    new Menu (41,"USER", 'NAV.SINGLE_MENU', '/menu/17', null, null, false, 40),
    new Menu (42,"USER", 'NAV.CART', '/cart', null, null, false, 40),
    new Menu (43,"USER", 'NAV.CHECKOUT', '/checkout', null, null, false, 40),
    new Menu (60,"USER", 'FAQs', '/faq', null, null, false, 10),
    new Menu (62,"USER", 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 10),
    new Menu (63,"USER", 'Landing', '/landing', null, null, false, 10),
    new Menu (64,"USER", '404 Page', '/404', null, null, false, 10),
    new Menu (70,"USER", 'NAV.CONTACT', '/contact', null, null, false, 0),
    new Menu (80,"USER", 'NAV.ABOUT_US', '/about', null, null, false, 0),
    new Menu (90,"ADMIN", 'NAV.ADMIN', '/admin', null, null, false, 0),
    new Menu (140,"USER", 'Level 1', null, null, null, true, 0),
    new Menu (141,"USER", 'Level 2', null, null, null, true, 140),
    new Menu (142,"USER", 'Level 3', null, null, null, true, 141),
    new Menu (143,"USER", 'Level 4', null, null, null, true, 142),
    new Menu (144,"USER", 'Level 5', null, '/', null, false, 143),
    new Menu (200,"USER", 'NAV.EXTERNAL_LINK', null, 'http://themeseason.com', '_blank', false, 0)
]
