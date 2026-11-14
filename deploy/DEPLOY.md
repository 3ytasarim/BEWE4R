# Deploying the prerendered (SSG) frontend

The frontend is built to static HTML (`artifacts/bewe4r/dist/public`). Nginx serves that directory, the API keeps
running under PM2 as `bewe4r-api`. Only the static files change, so the API is not touched by this release.

Paths below assume the repo lives in `/var/www/bewe4r`. Adjust if your server differs.

## 1. Build and validate (nothing live changes yet)

```bash
cd /var/www/bewe4r
git status                      # look first: never deploy over uncommitted server-only changes
git fetch origin
git checkout seo-ssg && git pull --ff-only origin seo-ssg

pnpm install --frozen-lockfile
pnpm --filter @workspace/bewe4r typecheck

# build into a copy so the live dist/public stays untouched until validation passes
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/bewe4r build
pnpm --filter @workspace/bewe4r test:seo      # must end with "28/28 checks passed"
```

The build fails by itself when a page has no `<h1>`, more than one `<main>`, or a render error.

## 2. Back up the current live frontend

`build` overwrites `dist/public`, so keep the previous one before step 1 if you build in place:

```bash
cd /var/www/bewe4r/artifacts/bewe4r
cp -a dist dist.backup-$(date +%Y%m%d-%H%M)      # run BEFORE `pnpm build` when building in place
```

## 3. Activate

```bash
# nginx config: apex -> www 301, trailing-slash rewrite, real 404, cache headers, gzip, /api proxy
sudo cp /etc/nginx/sites-available/bewe4r.conf /etc/nginx/sites-available/bewe4r.conf.bak-$(date +%Y%m%d)
sudo cp /var/www/bewe4r/deploy/nginx.bewe4r.conf /etc/nginx/sites-available/bewe4r.conf
# set the API port (proxy_pass) and ssl lines in that file first, then:
sudo nginx -t && sudo systemctl reload nginx
```

PM2 does not need a restart for a frontend-only release. If the api-server code changed too (brands API):

```bash
pnpm --filter @workspace/api-server build && pm2 restart bewe4r-api
```

## 4. Verify the raw HTML (no JavaScript)

```bash
curl -s https://www.bewe4r.com/ | grep -c "<h1"                 # 1
curl -s https://www.bewe4r.com/ | grep -o "<h2" | wc -l         # several
curl -s https://www.bewe4r.com/blog | grep -o 'href="/blog/[^"]*"'
curl -sI https://www.bewe4r.com/does-not-exist | head -1        # HTTP/2 404
curl -sI https://bewe4r.com/ | grep -i -E "^HTTP|^location"     # 301 -> https://www.bewe4r.com/
curl -sI https://www.bewe4r.com/sitemap.xml | grep -i content-type   # xml
curl -s https://www.bewe4r.com/robots.txt | head
```

## 5. Rollback

Frontend (seconds, API unaffected):

```bash
cd /var/www/bewe4r/artifacts/bewe4r
mv dist dist.failed && mv dist.backup-<timestamp> dist
```

nginx config:

```bash
sudo cp /etc/nginx/sites-available/bewe4r.conf.bak-<date> /etc/nginx/sites-available/bewe4r.conf
sudo nginx -t && sudo systemctl reload nginx
```

Code: `git checkout main` (main is not changed by the `seo-ssg` branch until it is merged).

## Notes

- Admin (`/admin`) is an empty client-rendered shell with `noindex` and `Disallow: /admin`; no private data is rendered.
- Adding a blog post in `src/data/blogPosts.ts` creates its HTML page and sitemap entry on the next build.
- After going live: submit `https://www.bewe4r.com/sitemap.xml` in Search Console and Bing Webmaster Tools.
