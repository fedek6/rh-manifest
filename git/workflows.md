# GitHub workflows

## Trigger remotely

Generate GitHub personal access token:

https://github.com/settings/tokens/new

Mark `workflows` in scopes.

Add `repository_dispatch` event in your worflow:

```yaml
name: S3 Deploy
on:
  repository_dispatch:
    types: [publish]
  push:
    branches:
      - main
```

URL for triggering workflow looks like this:

https://api.github.com/repos/[USERNAME]/[REPOSITORY]/dispatches

For eg. https://api.github.com/repos/Memocracy/frontend/dispatches

Test it:
```
curl -X POST \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token <token>" \
    --data '{"event_type": "publish"}' \
    https://api.github.com/repos/Memocracy/frontend/dispatches
```