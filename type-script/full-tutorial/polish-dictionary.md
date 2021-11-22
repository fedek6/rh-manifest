# Polish dictionary for TS terms

---

`Inferred` — `wywnioskowany`.

---

`Explicit` — `wyraźny`. 

---

`Spread operator` — `operator rozwinięcia`.

---

`Rest operator` — `operator reszty`.

---

`Type annotations` — `adnotacje typów`.

---

`Tuple` — `krotka [skończona sekwencja obiektów]`.

---

`enum` — `wyliczenie`.

---

`override` — `nadpisanie`.

---

`literal` — `dosłowny`.

---

`excess` — `nadmiar`.

---

`intersection` — `skrzyżowanie`.

Intersection means logical AND. Merged interfaces need to contain all types.

```ts
interface Cat {
    name: string;
    breed: string;
}

interface Dog {
    name: string;
    breed: string;
    chip: boolean;
}

type DogoCat = Cat | Dog;
```

---

`union` — `unia`.

Union in TypeScript means logical OR. If interfaces are joined using union only common types will be outputted.

```ts
type Primitive = string | number
```

---

`predicate` — `predykat` 

Predicate functions are functions that return a single TRUE or FALSE. You use predicate functions to check if your input meets some condition.

---