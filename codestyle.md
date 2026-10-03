# Code Style (Frontend)

This project follows the **Airbnb JavaScript Style Guide**
(source: https://github.com/airbnb/javascript).
For HTML/CSS it references the **Google HTML/CSS Style Guide**
(source: https://google.github.io/styleguide/htmlcssguide.html),
with the following project-specific conventions.

## 1. JavaScript

- Start every script file with `"use strict";`.
- Use `const` / `let`; never `var`. Keep string concatenation style
  consistent within a file.
- End statements with semicolons; indent with 2 spaces.
- Use named function expressions for callbacks (this project favors
  `function` expressions for compatibility and readability).
- Never execute dynamic strings with `eval`, `new Function`, or any
  equivalent mechanism.
- Variables and functions use camelCase; constants use
  UPPER_SNAKE_CASE, e.g. `API_BASE`.
- Cache DOM lookups in named variables (e.g. `expressionEl`); the `El`
  suffix marks element references.
- Route all asynchronous requests through the `requestJson` wrapper;
  errors are thrown as `Error` and handled by the caller.

## 2. HTML

- Use HTML5 semantic tags (`main`, `section`, `header`).
- Every button declares `type="button"`; interactive controls carry an
  accessible name or `aria-label`.
- Always specify `lang`, `charset` and `viewport`.

## 3. CSS

- Class names are lowercase, hyphen-separated (kebab-case), e.g.
  `.history-list`.
- Keep selectors flat; prefer class selectors and avoid deep nesting
  and `!important`.
- Group reusable values (colors, spacing) at the top of each component
  section for easy adjustment.

## 4. General

- Files use UTF-8 encoding with LF line endings.
- Comments explain "why", not "what".
