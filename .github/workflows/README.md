# GitHub Actions CI/CD Pipeline - Tutorial

## What is CI/CD?

**CI (Continuous Integration):** Automatically test and build your code every time you push
**CD (Continuous Deployment):** Automatically deploy your code when tests pass

## How Your Pipeline Works

### When You Push Code:
```bash
git add .
git commit -m "Update profile"
git push
```

GitHub Actions automatically:
1. ✅ Checks out your code
2. ✅ Installs dependencies
3. ✅ Runs TypeScript type checking
4. ✅ Builds your Next.js project
5. ✅ Vercel deploys if everything passes

### Visual Flow:
```
Push to GitHub → GitHub Actions runs → Tests pass → Vercel deploys → Live! 🎉
                                    ↓
                               Tests fail → Get notified ❌
```

## Understanding the Workflow File

The file `.github/workflows/ci-cd.yml` contains all the automation rules.

### Key Sections Explained:

#### 1. Triggers (when to run)
```yaml
on:
  push:
    branches: [main]  # Run on every push to main
  pull_request:
    branches: [main]  # Run on every PR to main
```

#### 2. Jobs (what to do)
```yaml
jobs:
  quality-checks:  # Job name
    runs-on: ubuntu-latest  # Run on Ubuntu server
    steps:  # Individual steps
      - name: Checkout code
        uses: actions/checkout@v4  # Action to download your code
```

#### 3. Steps (individual tasks)
- **Checkout:** Gets your code from the repo
- **Setup Node:** Installs Node.js version 18
- **Install deps:** Runs `npm ci` to install packages
- **Type check:** Runs TypeScript compiler to catch type errors
- **Build:** Runs `npm run build` to build your Next.js app

## Viewing Your Workflow Results

1. Go to your GitHub repo: https://github.com/Muhammadatef/MAF-Portfolio
2. Click the **"Actions"** tab
3. See all your workflow runs
4. Click any run to see detailed logs

Green checkmark ✅ = Success!
Red X ❌ = Something failed (click to see what)

## Customizing Your Pipeline

### Add Testing:
```yaml
- name: Run tests
  run: npm test
```

### Add Linting:
```yaml
- name: Lint code
  run: npm run lint
```

### Add Environment Variables:
```yaml
- name: Build
  run: npm run build
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

**Important:** Never put real secrets in the YAML file! Use GitHub Secrets:
1. Go to repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add your secret (e.g., ANTHROPIC_API_KEY)

### Add Slack/Discord Notifications:
```yaml
- name: Notify on success
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Advanced: Deploy to Vercel via GitHub Actions

While Vercel auto-deploys from GitHub, you can control it via Actions:

```yaml
deploy:
  name: Deploy to Vercel
  runs-on: ubuntu-latest
  needs: quality-checks
  if: github.ref == 'refs/heads/main'

  steps:
    - uses: actions/checkout@v4

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

To get these tokens:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel login`
3. Run: `vercel link` in your project
4. Get token from: https://vercel.com/account/tokens
5. Get IDs from: `.vercel/project.json`

## Common Workflows for Data Engineers

### 1. Python Project with Tests:
```yaml
- name: Setup Python
  uses: actions/setup-python@v4
  with:
    python-version: '3.10'

- name: Install dependencies
  run: pip install -r requirements.txt

- name: Run tests
  run: pytest tests/

- name: Run linter
  run: flake8 .
```

### 2. Docker Build & Push:
```yaml
- name: Build Docker image
  run: docker build -t myapp:latest .

- name: Push to Docker Hub
  run: |
    echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
    docker push myapp:latest
```

### 3. Run Data Quality Checks:
```yaml
- name: Data quality checks
  run: |
    python scripts/validate_data.py
    python scripts/check_schemas.py
```

## Best Practices

1. **Keep workflows fast** - Cache dependencies, run tests in parallel
2. **Fail fast** - Put quick checks first (linting before building)
3. **Use secrets** - Never hardcode credentials
4. **Monitor** - Check the Actions tab regularly
5. **Branch protection** - Require checks to pass before merging

## Debugging Failed Workflows

When a workflow fails:
1. Click the failed job in the Actions tab
2. Expand the failed step
3. Read the error message
4. Fix locally and push again

Common issues:
- **Build fails:** TypeScript error or missing dependency
- **Type check fails:** Fix TypeScript errors in your code
- **Node version mismatch:** Update `node-version` in workflow

## Next Steps

1. ✅ Push this workflow to GitHub
2. ✅ Go to Actions tab and watch it run
3. ✅ Add more steps as your project grows
4. ✅ Set up GitHub Secrets for sensitive data
5. ✅ Add branch protection rules to enforce checks

## Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Vercel + GitHub](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

---

**Pro Tip:** Start simple and add more checks over time. A basic CI/CD pipeline that runs is better than a complex one that breaks!
