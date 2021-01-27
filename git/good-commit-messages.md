# How to Write a good Git Commit Message

## 1. Separate subject from body with a blank line

```
Derezz the master control program

MCP turned out to be evil and had become intent on world domination.
This commit throws Tron's disc into MCP (causing its deresolution)
and turns it back into a chess game.
```

## 2. Limit the subject line to 50 characters

`Tip: If you’re having a hard time summarizing, you might be committing too many changes at once. Strive for atomic commits (a topic for a separate post).`

## 3. Capitalize the subject line

```
Accelerate to 88 miles per hour
```

## 4. Do not end the subject line with a period
## 5. Use the imperative mood in the subject line.

Imperative mood just means “spoken or written as if giving a command or instruction”. A few examples:

* Refactor subsystem X for readability
* Update getting started documentation
* Remove deprecated methods
* Release version 1.0.0

__A properly formed Git commit subject line should always be able to complete the following sentence:__ If applied, this commit will your subject line here.

## 6. Wrap the body at 72 characters
## 7. Use the body to explain what and why vs. how

```
commit eb0b56b19017ab5c16c745e6da39c53126924ed6
Author: Pieter Wuille <pieter.wuille@gmail.com>
Date:   Fri Aug 1 22:57:55 2014 +0200

   Simplify serialize.h's exception handling

   Remove the 'state' and 'exceptmask' from serialize.h's stream
   implementations, as well as related methods.

   As exceptmask always included 'failbit', and setstate was always
   called with bits = failbit, all it did was immediately raise an
   exception. Get rid of those variables, and replace the setstate
   with direct exception throwing (which also removes some dead
   code).

   As a result, good() is never reached after a failure (there are
   only 2 calls, one of which is in tests), and can just be replaced
   by !eof().

   fail(), clear(n) and exceptions() are just never called. Delete
   them.
```

Based on: https://chris.beams.io/posts/git-commit/