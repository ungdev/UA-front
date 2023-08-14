var _paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(() => {
  let u = '//matomo.uttnetgroup.fr/';
  _paq.push(['setTrackerUrl', u + 'piwik.php']);
  _paq.push(['setSiteId', 3]);
  let d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = u + 'piwik.js';
  s.parentNode.insertBefore(g, s);
})();
