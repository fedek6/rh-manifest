# Declaration files

* You can export types just as functions and variables. If you want your types to be available globally you can use `*.d.ts` files.
* You still need to import these files and also export specific types from them.
* These files are only for type declaration!
* You can define a function, but you cannot declare its body!
* In most cases, you should put your type definitions in modules, not in the `.d.ts` declarations.
* `d.ts` files are useful when you want to provide typings for the existing library.