# Notes on grids

## column-start - column-end example

This way we're creating a 6 columns grid without gutters. Notice that _grid-column-start_ and _grid-column-end_ works on lines not columns.

You can also use shorthands for this functionality:

```
grid-column: 2 / 4;
grid-row:    2 / 5;
```

```scss
.o-main-header {
    width: 100%;
    display: inline-grid;

    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
}

@include media-breakpoint-up(lg) { 
    .o-main-header {
        max-width: $desktop-layout-width;

        &__logo-container {
            align-self: center;

            grid-column-start: 1;
            grid-column-end: 2;
        }

        &__tools {
            grid-column-start: 5;
            grid-column-end: 7;
        }
    } 
}
```