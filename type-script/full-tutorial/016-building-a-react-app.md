# Building a React app

Options useful for React development:

| Name | Description |
|------|--------------|
| `allowSyntheticDefaultImports` | Allows importing modules without default export |
| `esModuleInterop` | Adds helper code for importing non default exported modules |
| `forceConsistentCasingInFileNames` | This option ensures that names in import statements match the case used by the imported file. |
| `isolatedModules` | This option treats each file as separate module (increased Babel compatibility) |
| `resolveJsonModule` | Allow importing JSON files |
| `skipLibCheck` | Speed up compilation by skipping normal checks for declaration files |
| `strict` | Stricter checks of TS code |

## Let's begin

```bash
npx create-react-app reactapp --typescript
```

> In WebPack TS does not create JS files (`noEmit: true`). For that purpose Babel is used. Also, `jsx` isn't compiled by the TS compiler (`jsx: preserve`). TypeScript is added only for type checking. 

p. 466
