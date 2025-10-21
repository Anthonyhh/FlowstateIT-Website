# CodeRabbit Setup Instructions

## Overview

CodeRabbit is now configured for this repository with AI-powered code reviews aligned with your CLAUDE.md best practices.

## Configuration File

The `.coderabbit.yaml` file has been created in the repository root with:

- **Profile**: Assertive (thorough reviews following CLAUDE.md standards)
- **Auto-review**: Enabled for all PRs to master/main branch
- **Path-specific instructions**: Custom rules for API routes, utilities, components, and tests
- **Security focus**: Enforces XSS protection, input sanitization, and rate limiting checks
- **UI/Animation standards**: Validates performance, accessibility, and prefers-reduced-motion support
- **Test quality**: Ensures TDD compliance, property-based testing, and security attack vector testing
- **Tools enabled**: ESLint, Gitleaks, Markdownlint, YAMLlint

## Setup Steps

### 1. Install CodeRabbit GitHub App

You have three GitHub repositories connected to this project:
- `emergent`: https://github.com/Anthonyhh/FlowstateIT-Website.git (recommended)
- `origin`: https://github.com/Anthonyhh/Payload-Template.git
- `origin-flowstate`: https://github.com/Anthonyhh/flowstateit-blueprint.git

**To install CodeRabbit:**

1. Go to https://www.coderabbit.ai/
2. Click "Sign In" or "Get Started"
3. Authenticate with your GitHub account
4. Select which repository/repositories to enable:
   - For this project, select **FlowstateIT-Website** (emergent remote)
5. Grant the necessary permissions

### 2. Push Configuration to Repository

The `.coderabbit.yaml` configuration file needs to be in your repository:

```bash
# Add the configuration file
git add .coderabbit.yaml

# Commit with Conventional Commits format
git commit -m "chore: add CodeRabbit AI code review configuration

- Configure assertive review profile aligned with CLAUDE.md
- Enable auto-review for all PRs to master/main
- Add path-specific instructions for API, lib, components, tests
- Enforce security, UI/animation, and test quality standards
- Enable ESLint, Gitleaks, Markdownlint, YAMLlint tools"

# Push to your main repository (emergent remote)
git push emergent master
```

### 3. Test CodeRabbit

Create a test pull request to verify CodeRabbit is working:

```bash
# Create a test branch
git checkout -b test/coderabbit-setup

# Make a small change (e.g., update README)
echo "\n## AI Code Review\nThis project uses CodeRabbit for automated code reviews." >> README.md

# Commit and push
git add README.md
git commit -m "docs: add CodeRabbit information to README"
git push emergent test/coderabbit-setup

# Create PR via GitHub CLI (if installed)
gh pr create --base master --head test/coderabbit-setup --title "test: verify CodeRabbit setup" --body "Testing CodeRabbit AI code review integration"
```

Alternatively, create the PR manually on GitHub:
1. Go to https://github.com/Anthonyhh/FlowstateIT-Website/pulls
2. Click "New pull request"
3. Select your test branch
4. Create the PR

**Expected behavior:**
- CodeRabbit should automatically add a comment within 1-2 minutes
- You'll see a high-level summary and review comments
- Reviews will reference CLAUDE.md guidelines

### 4. Interact with CodeRabbit

On any pull request, you can use these commands:

- `@coderabbitai help` - Show available commands
- `@coderabbitai configuration` - Display current configuration in YAML format
- `@coderabbitai review` - Trigger a manual review
- `@coderabbitai resolve` - Mark a conversation as resolved
- `@coderabbitai ask <question>` - Ask CodeRabbit about the code

### 5. Optional: Install CodeRabbit CLI (2025)

For terminal-based code reviews:

```bash
# Install CodeRabbit CLI
curl -fsSL https://install.coderabbit.ai | sh

# Login
coderabbit login

# Review local changes
coderabbit review

# Configure CLI settings
coderabbit config set review-mode interactive
```

## Configuration Highlights

### Path-Specific Instructions

**API Routes** (`app/api/**/*.ts`):
- Verifies integration tests exist
- Checks error handling and logging with correlation IDs
- Ensures input sanitization and XSS protection
- Validates rate limiting
- Checks database connection pooling

**Shared Utilities** (`lib/**/*.ts`):
- Verifies unit tests exist
- Checks type safety with branded types
- Ensures functions are pure and testable

**React Components** (`components/**/*.tsx`):
- Checks accessibility (ARIA, keyboard navigation)
- Verifies animation performance
- Ensures CVA usage for variants
- Validates Radix UI primitive usage

**Tests** (`**/*.spec.ts`):
- Ensures tests can fail for real defects
- Checks for parameterized inputs
- Verifies property-based testing for security functions
- Validates separation of unit and integration tests

### Code Guidelines Enforced

1. **Implementation Best Practices**: TDD, branded types, import type usage
2. **Security Requirements**: Input sanitization, XSS protection, email validation
3. **UI/Animation Standards**: Performance, accessibility, prefers-reduced-motion
4. **Test Quality**: Property-based testing, attack vector testing, strong assertions
5. **Function Writing**: Readability, low complexity, consistent naming

## Customization

To modify CodeRabbit behavior, edit `.coderabbit.yaml`:

- **Change review intensity**: Set `profile: "chill"` for less strict reviews
- **Adjust auto-review**: Modify `auto_review.enabled` or `auto_review.drafts`
- **Add path filters**: Extend `path_filters` to ignore additional directories
- **Enable more tools**: Set `tools.<tool_name>.enabled: true`
- **Add Jira/Linear**: Configure `knowledge_base.jira.project_keys` or `knowledge_base.linear.team_keys`

Changes take effect immediately for new pull requests.

## Troubleshooting

**CodeRabbit not commenting:**
1. Verify the GitHub App is installed on your repository
2. Ensure `.coderabbit.yaml` exists in the feature branch
3. Check that the PR targets `master` or `main` branch
4. Verify the PR is not in draft mode (unless `drafts: true`)

**Reviews too strict/lenient:**
- Adjust `profile` between "chill" and "assertive"
- Modify `tone_instructions` to emphasize different aspects

**Need to exclude paths:**
- Add patterns to `path_filters` (e.g., `!**/generated/**`)

## Resources

- CodeRabbit Docs: https://docs.coderabbit.ai/
- YAML Template Reference: https://docs.coderabbit.ai/reference/yaml-template
- Configuration Reference: https://docs.coderabbit.ai/reference/configuration
- GitHub Repository: https://github.com/coderabbitai/coderabbit-docs

## Next Steps

1. Install CodeRabbit GitHub App on your repository
2. Push `.coderabbit.yaml` to your repository
3. Create a test PR to verify setup
4. Optionally install CodeRabbit CLI for local reviews
5. Customize configuration as needed for your workflow

---

**Questions or issues?** Check the CodeRabbit documentation or create an issue in your repository.
