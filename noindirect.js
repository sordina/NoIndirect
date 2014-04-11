
/* Very strict pattern to match Google search URI. Last update: 188 domains*/
var google_pattern =
/*protocol */"^https?:\\/\\/" + 
/*subdomain*/"((www|encrypted|news|groups|maps|ditu|video|images|ipv6)\\.)?" + 
/*domain   */   "google\\.(com|" +
/* .tld    */"(a[demstz]|b[aefgijsy]|c[adfghilmnvz]|d[ejkmz]|e[es]|" +
                "f[imr]|g[aeglmpry]|h[nrtu]|i[emqst]|j[eo]|k[igz]|" +
                "l[aiktuv]|m[degklnsuvw]|n[eloru]|p[lnst]|r[ouw]|" +
                "s[cehiknomt]|t[dgklmnot]|v[gu]|ws|rs|cat)" +
/* .com.tld*/"|com\\.(a[fgiru]|b[dhnorz]|c[ouy]|do|e[cgt]|fj|g[hit]|hk" +
                "|jm|k[hw]|l[by]|m[txy]|n[afgip]|om|p[aehkry]" +
                "|qa|s[abglv]|t[jrw]|u[ay]|v[cn])" +
/* .co.tld */"|co\\.(ao|bw|c[kr]|i[dln]|jp|k[er]|ls|m[az]|nz" +
                "|t[hz]|u[gkz]|v[ei]|z[amw])" +
             ")(\\/|$)";

google_pattern = RegExp(google_pattern, 'i');

function main() {
  // Activate the features on known Google domains.
  if (!google_pattern.test(location.href)) return;

  preventURLRewrites();

  // Cleans links on hover to show a clear URL in the statusbar
  // bind_cleanOnHover();
  console.log("NoRedirect Loaded")
}

function preventURLRewrites() {
    // To be inserted in the page itself
    function injectedFunction() {
        // This part disables the UGLY URI-converting
        Object.defineProperty(window, 'rwt', {
          value: function() {return true;},
          writable: false, configurable: false
        });
    }
    /* Create script tag to inject in Google Search page */
    var s = document.createElement('script');
    s.textContent = '(' + injectedFunction + ')()';
    (document.head||document.documentElement).appendChild(s);
    s.parentNode.removeChild(s);
}

function bind_cleanOnHover() {
   // This part deals with already-converted URIs, by
   // Replacing http://www.google.nl/url?url=<URI> with <URI>.
   // Clean URL on hover (visual purposes only)
   function cleanURL(e) {
      var a = e.target, depth = 7;
      while (a && a.tagName !== 'A' && --depth > 0) a = a.parentNode;
      if (a && a.tagName === 'A') noTracks(a);
   }
   document.addEventListener('mouseover', cleanURL, true);
}

main()
