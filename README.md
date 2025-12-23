
# Loading Happiness Platform

This repository contains the full production-ready stack for **Loading Happiness**, a self-hosted platform powered by Next.js (apps/web), Payload CMS, PostgreSQL, MinIO, and Umami.

Note: the root-level Vite app has been moved to `legacy/vite` and is not used for deployment.

## 🏗️ Architecture Overview

- **Frontend/CMS**: Next.js 14 (App Router) with Payload CMS 2.x.
- **Database**: PostgreSQL 15 for both CMS and Analytics.
- **Storage**: MinIO (S3-compatible) for all media uploads.
- **Proxy/WAF**: Traefik with automatic Let's Encrypt TLS (Cloudflare ready).
- **Analytics**: Umami for privacy-focused self-hosted tracking.

## 🚀 Quick Start (Local/Dev)

1. **Clone the Repo**
   ```bash
   git clone https://github.com/loadinghappiness/loadinghappiness.git
   cd loadinghappiness/infra
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your secrets
   ```

3. **Deploy the Stack**
   ```bash
   docker-compose up -d
   ```

4. **Initialize Storage**
   - Visit `s3.loadinghappiness.com:9001` (or localhost:9001).
   - Login with `MINIO_ROOT_USER`.
   - Create a bucket named `media` and set its policy to `Public`.

5. **Access the CMS**
   - Visit `loadinghappiness.com/admin` to create your first admin user.

## 💾 Operations & Backups

### Database Backups
Run the provided backup script:
```bash
cd infra/scripts
chmod +x backup_postgres.sh
./backup_postgres.sh
```
Add this to a crontab for automatic daily backups.

### Media Backups (MinIO)
Use `rclone` or a simple `aws s3 sync` command to mirror the `media` bucket to an offsite location (e.g., Backblaze B2).

## 🛡️ Security Headers
Traefik is configured to handle SSL termination. The Next.js app includes standard security headers via `next.config.js`:
- Strict-Transport-Security
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Content-Security-Policy (configured to allow Payload Admin and MinIO assets)

## 📄 CMS Block Model
The platform uses a flexible Page/Block architecture.
- **Hero**: Main entry section with primary/secondary CTAs.
- **ServicesGrid**: Icon-based grid for Managed IT, Security, etc.
- **Stats**: Key metrics (Uptime, Impact).
- **CTASection**: High-impact banner for conversions.
- **RichText**: Standard content formatting.

---
*Built with ❤️ by the Loading Happiness Engineering Team.*
