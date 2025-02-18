import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AdMobConfigView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <AdMobConfigView />
    </>
  );
}
