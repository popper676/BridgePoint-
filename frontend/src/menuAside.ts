import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/bookings/bookings-list',
    label: 'Bookings',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCalendarCheck ? icon.mdiCalendarCheck : icon.mdiTable,
    permissions: 'READ_BOOKINGS',
  },
  {
    href: '/feedback/feedback-list',
    label: 'Feedback',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiComment ? icon.mdiComment : icon.mdiTable,
    permissions: 'READ_FEEDBACK',
  },
  {
    href: '/promotions/promotions-list',
    label: 'Promotions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTag ? icon.mdiTag : icon.mdiTable,
    permissions: 'READ_PROMOTIONS',
  },
  {
    href: '/purchases/purchases-list',
    label: 'Purchases',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCart ? icon.mdiCart : icon.mdiTable,
    permissions: 'READ_PURCHASES',
  },
  {
    href: '/rooms/rooms-list',
    label: 'Rooms',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiHome ? icon.mdiHome : icon.mdiTable,
    permissions: 'READ_ROOMS',
  },
  {
    href: '/tickets/tickets-list',
    label: 'Tickets',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTicket ? icon.mdiTicket : icon.mdiTable,
    permissions: 'READ_TICKETS',
  },
  {
    href: '/socialmediadata/socialmediadata-list',
    label: 'Socialmediadata',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_SOCIALMEDIADATA',
  },
  {
    href: '/revenue/revenue-list',
    label: 'Revenue',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_REVENUE',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_ORGANIZATIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/contact',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
