# Releasing / Publishing (npmjs.org)

This package is published to npmjs.org as `@microsoft/eslint-plugin-fluentui-jsx-a11y`.

## Roles / permissions

| Role | Who | What they can do |
|---|---|---|
| External contributor | Anyone | Open PRs, create issues |
| Internal maintainer | Microsoft team members | Approve publish jobs, rotate tokens, create releases/tags |
| npm publisher | Microsoft-owned service account | Publish `@microsoft/eslint-plugin-fluentui-jsx-a11y` to npmjs.org |

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

### 2. Store the `NPM_TOKEN` secret

1. Create (or rotate) an npm access token from the Microsoft-owned npm publisher
   account that has publish permission for the `@microsoft` scope.
2. In the `npm-publish` environment settings, click **Add secret**.
3. Name: `NPM_TOKEN`, value: the token from step 1.

Storing the secret on the environment (rather than at repo level) ensures that
only the publish job—after it receives environment approval—can access it.

### 3. Token rotation

When the token expires or is rotated:

1. Generate a new token from the Microsoft-owned npm publisher account.
2. Update the `NPM_TOKEN` secret in the `npm-publish` environment.
3. No code changes are required.

Recommended: add a calendar reminder for token rotation to avoid blocked releases.

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
   runs `npm publish`.

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
    run: npm publish --tag alpha
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
  ```

## Workflow reference

See [`.github/workflows/publish-npm.yml`](../.github/workflows/publish-npm.yml).

The existing [`.github/workflows/release-package.yml`](../.github/workflows/release-package.yml)
continues to publish to GitHub Packages (GPR) and is unaffected by this workflow.
