# Google fonts

## Fastest way to load fonts

* Preload;
* Inline font declarations.

```html
<link rel="preload" href="https://studentmunch.com/wp-content/themes/studentmunch/fonts/quicksand.woff2" as="font" crossorigin>
<style>
@font-face {
 font-family: 'Quicksand';
 font-style: normal;
 font-weight: 400;
 src: local('Quicksand Regular'), local('Quicksand-Regular'), url(https://studentmunch.com/wp-content/themes/studentmunch/fonts/quicksand.woff2) format('woff2');
 unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
```

## ... or without downloading local copies

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link rel="preload" href="https://fonts.gstatic.com/s/quicksand/v7/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2" as="font" crossorigin>
<link rel="preload" href="https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2" as="font" crossorigin>
<style>
@font-face {
 font-family: 'Lato';
 font-style: normal;
 font-weight: 400;
 src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
 unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
 font-family: 'Quicksand';
 font-style: normal;
 font-weight: 400;
 src: local('Quicksand Regular'), local('Quicksand-Regular'), url(https://fonts.gstatic.com/s/quicksand/v7/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2) format('woff2');
 unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
```