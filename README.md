# WaveSeed Agency

## Netlify Deployment

This project is configured for deployment on Netlify with support for:
- **Serverless Functions** (in `netlify/functions`)
- **SPA Routing** (via `public/_redirects`)

### Netlify Functions
- Place serverless functions in `netlify/functions/`.
- Example endpoint: `/.netlify/functions/hello`

### SPA Routing
- All routes are redirected to `index.html` for client-side routing.
- See `public/_redirects` for the rule.

### Configuration
- `netlify.toml` sets the publish and functions directories for Netlify.

## Local Development
- Usual React/Next.js/SPA workflow applies.
- Deploy to Netlify for full serverless and routing support.

---

For more, see Netlify docs: https://docs.netlify.com/
