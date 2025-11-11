## Setup

```bash
# Created using.
npx create-next-app@latest --typescript --eslint --tailwind --app --src-dir

# Installed dependencies.
npm i resend @vercel/speed-insights @vercel/analytics react-pdf

# Vercel CLI (optional but handy).
npm i -g vercel

# Check that your Node version is ≥ 20 (Vercel uses the latest LTS).
node -v

# Check that your TypeScript compiles.
npx tsc

# Run a dev server.
npm run dev

# Other npm commands (see pacakge.json for complete list).
npm run build
npm run start
npm run lint

# Test the SignUp API endpoint.
curl -X POST http://localhost:3000/api/signup -H "Content-Type: application/json" -d '{"email": "test@mjrlee.com", "zip": 11201, "timestamp": 1678886400000}'
```

Supabase setup:

```bash
# Test it works
npx supabase --help

# Login (one-time)
npx supabase login

# Link your project (replace YOUR_PROJECT_REF with your Supabase project ref, e.g., abcdef123456)
npx supabase link --project-ref YOUR_PROJECT_REF

# Generate types (outputs to stdout – redirect to a file)
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/types/supabase.ts
```

## Learn More

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
