# SassdDoc examples

## Mixin

```sass
/// Rem output with px fallback.
///
/// @group Typography
/// @author Adam Laki
///
/// @param {Number} $sizeValue - Element's font size
/// @output `font-size` with fallback
///
/// @example scss - Set rem font-size to `.foo`
///   .foo {
///       @include font-size(1.2);
///   }
@mixin font-size($sizeValue: 1) {
    font-size: ($sizeValue * 16) * 1px;
    font-size: $sizeValue * 1rem;
}
```

