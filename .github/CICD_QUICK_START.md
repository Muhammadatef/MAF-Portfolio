# CI/CD Quick Start Guide

## 🚀 What Just Happened?

I've set up a GitHub Actions pipeline that runs automatically every time you push code.

## 📁 Files Created

```
.github/
├── workflows/
│   ├── ci-cd.yml          # The pipeline configuration
│   └── README.md          # Detailed tutorial
└── CICD_QUICK_START.md    # This file (quick reference)
```

## ⚡ Quick Commands

### See Your Workflows Running
```bash
# Option 1: GitHub Web UI
# Visit: https://github.com/Muhammadatef/MAF-Portfolio/actions

# Option 2: GitHub CLI (if you have it installed)
gh workflow list
gh run list
gh run view  # View latest run
```

### Commit the CI/CD Setup
```bash
git add .github/
git commit -m "Add GitHub Actions CI/CD pipeline"
git push
```

After pushing, go to the **Actions** tab to see it run!

## 🎯 What the Pipeline Does

Every push to `main` triggers:

1. **Type Check** - Catches TypeScript errors
2. **Build** - Ensures the project builds successfully
3. **Deploy** - Vercel auto-deploys if all checks pass

## 🛠️ Common Customizations

### Add More Checks

Edit `.github/workflows/ci-cd.yml` and add:

```yaml
# Run tests
- name: Run tests
  run: npm test

# Run linter
- name: Lint
  run: npm run lint

# Check formatting
- name: Format check
  run: npx prettier --check .
```

### Run Only on Specific Files

```yaml
on:
  push:
    branches: [main]
    paths:  # Only run when these files change
      - 'src/**'
      - 'public/**'
      - 'package.json'
```

### Add Slack Notifications

```yaml
- name: Slack Notification
  if: always()  # Run even if previous steps fail
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🔐 Using Secrets

For sensitive data (API keys, tokens):

1. **Add Secret in GitHub:**
   - Go to: Settings → Secrets and variables → Actions
   - Click: "New repository secret"
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key

2. **Use in Workflow:**
```yaml
- name: Deploy
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: npm run deploy
```

## 📊 Monitoring Your Pipeline

### GitHub Actions Tab
- **Green ✅** = All checks passed
- **Yellow 🟡** = Running
- **Red ❌** = Failed (click to see why)

### Email Notifications
GitHub emails you when workflows fail. Configure in:
Settings → Notifications → Actions

### Status Badges
Add to your README.md:
```markdown
![CI/CD](https://github.com/Muhammadatef/MAF-Portfolio/workflows/CI%2FCD%20Pipeline/badge.svg)
```

## 🐛 Troubleshooting

### Pipeline Fails?
1. Click the failed run in Actions tab
2. Expand the red ❌ step
3. Read the error
4. Fix locally: `npm run build` (test the build)
5. Push fix

### Common Issues

**TypeScript errors:**
```bash
npx tsc --noEmit  # Run locally to see errors
```

**Build fails:**
```bash
npm run build  # Test build locally
```

**Dependencies missing:**
```bash
npm ci  # Clean install
```

## 🎓 Learning Path

1. **Week 1:** Let the basic pipeline run, watch the Actions tab
2. **Week 2:** Add linting and testing steps
3. **Week 3:** Add environment-specific deployments (staging/prod)
4. **Week 4:** Add notifications and status badges

## 📚 Resources

- [GitHub Actions Basics](https://docs.github.com/en/actions/learn-github-actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

## 🔥 Pro Tips

1. **Test locally first** - Run `npm run build` before pushing
2. **Use caching** - Already enabled for npm packages
3. **Keep it simple** - Add complexity gradually
4. **Monitor regularly** - Check Actions tab weekly
5. **Branch protection** - Require checks to pass before merging PRs

## 🎯 Next Steps

- [ ] Push this CI/CD setup to GitHub
- [ ] Watch the Actions tab after pushing
- [ ] Add tests to your project (`npm test`)
- [ ] Set up branch protection rules
- [ ] Add a status badge to README

---

**Questions?** Check `.github/workflows/README.md` for detailed explanations!
