import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Users',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Ads Configuration',
    path: '/ads',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'App Configurations',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Modules Status',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Subscriptions',
    path: '/404',
    icon: icon('ic-lock'),
  },
];
