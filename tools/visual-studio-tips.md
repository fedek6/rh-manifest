# IDE tips & tricks

## Fix identation in VS Code

* On Windows Shift + Alt + F.
* On Mac Shift + Option + F.
* On Ubuntu Ctrl + Shift + I.

## Run command

Press _ctrl+shift+p_ and type your command.

## Emmet

[Emmet cheat-sheet](https://docs.emmet.io/cheat-sheet/)

## PHP-CS-Fixer 

If you install this tool in a global path:

```bash
composer global require friendsofphp/php-cs-fixer
```

You can use the _PHP Formatter_ VSC extension. 

After installation of both things you can add a shortcut to format your files (edit keybinding.json file).

```json
// Place your key bindings in this file to override the defaults
[
    {"key": "ctrl+shift+i", "command": "phpformatter.fix", "when": "editorFocus"}
]
```