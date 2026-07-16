# DNS & SEO Configuration Reference

This document contains the setup details, configurations, and troubleshooting steps for the domain registration, SSL setup, and Google SEO verification completed on **July 16, 2026**.

---

## 1. Domain & DNS Configurations

### Mozara Landing Page
* **Domain Name**: `mozaara.dpdns.org`
* **Registrar**: DigitalPlat (`dash.domain.digitalplat.org`)
* **Hosting Platform**: Netlify (`mozaara.netlify.app`)
* **DNS Manager**: Netlify DNS
* **Active Nameservers** (Configured on DigitalPlat):
  * `dns1.p06.nsone.net`
  * `dns2.p06.nsone.net`
  * `dns3.p06.nsone.net`
  * `dns4.p06.nsone.net`

---

## 2. Google Search Console & SEO

### Domain Verification
* **Method**: HTML File Verification
* **File Location**: `mukt-landing/public/google4d0b314c0faa3611.html`
* **File Content**: `google-site-verification: google4d0b314c0faa3611.html`
* **Crucial Note**: The verification file must be exactly **53 bytes** with **no trailing newlines or whitespace**. If modified, Google will reject it with a "wrong content" error.

### Sitemap & Robots Configuration
The following files were updated to point to the new domain instead of `mozara.in`:
* **Sitemap Location**: `mukt-landing/public/sitemap.xml` (Submits `https://mozaara.dpdns.org/`, `/privacy`, and `/terms`).
* **Robots Configuration**: `mukt-landing/public/robots.txt` (References `Sitemap: https://mozaara.dpdns.org/sitemap.xml`).
* **HTML Canonical & Open Graph Tags**: Updated in `mukt-landing/index.html`.

---

## 3. reCAPTCHA Setup
* **Google Account Owner**: `akshaymayya2@gmail.com`
* **Type**: reCAPTCHA v2 ("I'm not a robot" Checkbox)
* **Allowed Domains list**:
  * `localhost`
  * `mozaara.netify.app`
  * `mozaara.dpdns.org` (Ensure no `https://` prefix is added to this list in the Google Console).

---

## 4. Troubleshooting Guide

### A. Google Search Console displays "Couldn't fetch" for sitemap
* **Reason**: Google's fetch request is queued but has not run yet. The message is a standard temporary placeholder.
* **Fix**: Wait 24 to 48 hours for the queue to process.
* **Alternative workaround (if it remains stuck)**: Re-submit the sitemap in Google Search Console as `sitemap.xml/` (adding a trailing slash) to bypass caching.

### B. Netlify SSL Certificate creation fails with "certificate parameter is required..."
* **Reason**: Netlify's backend has a stale certificate record cached.
* **Fix**:
  1. Go to Netlify **DNS settings** for the domain, scroll to the bottom, and click **Delete DNS zone**.
  2. Go to your site's **Domain management**, click **Options** next to the domain, and select **Remove domain**.
  3. Wait 2 minutes.
  4. Re-add the custom domain in **Domain management** and select Netlify DNS.
  5. Go to the HTTPS section and click **Provision certificate**.

---

## 5. Instructions for Second Domain (Mayya Electronics)
When the Netlify rate limit resets (up to 1 hour from last change), you can set up `mayyaelectronics.netlify.app` with a custom domain (e.g. `mayyaelectronics.dpdns.org`):

1. **DigitalPlat**: Register `mayyaelectronics.dpdns.org` on DigitalPlat (leave nameservers blank/default for now).
2. **Netlify**: Go to your `mayyaelectronics` Netlify project > **Domain management** > **Add a domain you already own**. Enter the domain.
3. **Netlify DNS**: Set up Netlify DNS and copy the **4 nameservers** assigned to the project.
4. **DigitalPlat**: Log back in, click **Manage** on the domain, and update the nameservers to match the new Netlify ones.
5. **SSL**: Once nameservers update (takes 5-15 mins), click **Provision certificate** in Netlify.
