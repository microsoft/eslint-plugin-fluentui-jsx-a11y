# Releasing / Publishing (npmjs.org)

This package is published to npmjs.org as `@microsoft/eslint-plugin-fluentui-jsx-a11y`.

## Roles / permissions

| Role | Who | What they can do |
|---|---|---|
| External contributor | Anyone | Open PRs, create issues |
| Internal maintainer | Microsoft team members | Approve publish jobs, create releases/tags, configure Trusted Publishing |

Publishing to npm always requires approval from an internal maintainer via the protected
GitHub Environment `npm-publish`. External contributors cannot trigger an npm publish
unilaterally, even if they have repository write access.

## One-time setup (maintainers only)

The following steps need to be done once before the first automated npm publish.

### 1. Create the `npm-publish` GitHub Environment

1. Go to **Settings → Environments** in the repository.
2. Click **New environment** and name it `npm-publish`.
3. Under **Deployment protection rules**, enable **Required reviewers** and add at
   least two internal maintainers (e.g. `ryanlynch` + one backup).
4. Optionally restrict the environment to the `main` branch only.

### 2. Configure Trusted Publishing on npmjs.com

Publishing uses npm's [Trusted Publishing (OIDC)](https://docs.npmjs.com/generating-provenance-statements)
feature. No long-lived `NPM_TOKEN` secret is required. A one-time configuration
on npmjs.com is needed instead:

1. Sign in to npmjs.com as a user with owner/maintainer rights on
   `@microsoft/eslint-plugin-fluentui-jsx-a11y`.
2. Open the package settings and navigate to **Trusted Publishers**.
3. Add a new trusted publisher with:
   - **Provider:** GitHub Actions
   - **Organization:** `microsoft`
   - **Repository:** `eslint-plugin-fluentui-jsx-a11y`
   - **Workflow filename:** `publish-npm.yml`
   - **Environment (recommended):** `npm-publish`
4. Save.

The workflow already has `permissions: id-token: write` on the publish job and
publishes with `npm publish --access public --provenance`, so no further code
changes are needed after the npmjs.com configuration is complete.

## How to publish

### A) Publish from a GitHub Release (recommended)

1. Ensure the version in `package.json` is correct and merged to `main`.
2. Create a tag pointing at the desired commit:
   ```sh
   git tag v1.2.3
   git push origin v1.2.3
   ```
3. Go to **Releases → Draft a new release**, select the tag, fill in release notes,
   and click **Publish release**.
4. The `publish-npm` workflow triggers automatically.
5. The **publish job pauses** and waits for an internal maintainer to approve it in
   the `npm-publish` environment.
6. After approval, the job checks out the exact tagged commit, builds, tests, and
   runs `npm publish --access public --provenance`.

### B) Publish from a `v*` tag push

Pushing a tag directly also triggers the workflow:

```sh
git tag v1.2.3
git push origin v1.2.3
```

The publish job is still gated by environment approval before anything is published.

### C) Manual publish via GitHub Actions (`workflow_dispatch`)

1. Go to **Actions → Publish to npmjs.org**.
2. Click **Run workflow**, select the branch or tag ref to run from, then click
   **Run workflow**.
3. The publish job will pause for environment approval before publishing.

> **Note:** When using manual dispatch, ensure the `package.json` version and the
> corresponding `v*` tag exist and match before triggering.

## Tag and version conventions

| Situation | Tag | `package.json` version |
|---|---|---|
| Stable release | `v1.2.3` | `1.2.3` |
| Release candidate | `v1.2.3-rc.1` | `1.2.3-rc.1` |
| Alpha prerelease | `v1.2.3-alpha.1` | `1.2.3-alpha.1` |

Rules:

- Tags must follow the format `vX.Y.Z` (semver with a `v` prefix).
- The `package.json` version must match the tag exactly (without the leading `v`).
- Prerelease versions are published with the default npm dist-tag `latest` unless
  you pass `--tag <dist-tag>` to `npm publish`. Consider updating the workflow's
  publish step for prereleases:
  ```yaml
  - name: Publish (prerelease)
    run: npm publish --access public --provenance --tag alpha
  ```

## Workflow reference

See [`.github/workflows/publish-npm.yml`](../.github/workflows/publish-npm.yml).

The existing [`.github/workflows/release-package.yml`](../.github/workflows/release-package.yml)
continues to publish to GitHub Packages (GPR) and is unaffected by this workflow.
