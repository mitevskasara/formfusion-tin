# @formfusion/tin

Set of validation rules for worldwide TIN numbers.

A zero-dependency lookup table of **27 country-specific regex patterns** for validating TIN (Tax Identification Number) numbers. Every pattern is anchored and works directly as an HTML [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) attribute value, so you can use it with plain HTML, React, FormFusion, or `new RegExp()`.

## Why

TIN number formats differ per country across the EU. Germany uses an 11-digit Steuer-ID, France splits numbers with spaces, Spain mixes letters and digits (NIF/CIF/NIE), Austria and Czechia use dashes, Czechia and Slovakia allow slashes, and several countries have distinct national formats. Every app that collects a taxpayer ID ends up re-implementing and re-maintaining this table.

This package ships it as one flat object so you don't have to.

## Installation

```bash
npm install @formfusion/tin
```

```bash
yarn add @formfusion/tin
```

## Usage

The package exports a single default object mapping lowercase ISO 3166-1 alpha-2 country codes to regex **strings**.

### ES modules

```js
import tin from '@formfusion/tin';

console.log(tin.de); // "^(\\d{3})-(\\d{3})/(\\d{5})-(\\d{2})$"
```

### CommonJS

```js
const tin = require('@formfusion/tin').default;

new RegExp(tin.de).test('12345678901'); // true
new RegExp(tin.de).test('12345678'); // false
```

### Plain HTML

The patterns are valid `pattern` attribute values, so they work without any JavaScript:

```html
<label for="tin">TIN number (Germany)</label>
<input id="tin" name="tin" type="text" pattern="^\d{11}$" required />
```

### With FormFusion

FormFusion passes unknown `type` values straight through to the input's `pattern` attribute, so you can hand it a pattern directly:

```jsx
import React from 'react';
import { Form, Input } from 'formfusion';
import 'formfusion/style.css';
import tin from '@formfusion/tin';

const MyForm = () => (
  <Form onSubmit={(data) => console.log('Submitted', data)}>
    <Input id="tin" name="tin" type={tin.de} label="TIN number" required />
    <button type="submit">Submit</button>
  </Form>
);
```

### Dynamic country selection

```jsx
const [country, setCountry] = useState('de');

<Select name="country" value={country} onChange={setCountry}>
  {Object.keys(tin).map((code) => (
    <option key={code} value={code}>
      {code.toUpperCase()}
    </option>
  ))}
</Select>

<Input name="tin" type={tin[country]} label="TIN number" required />
```

### Standalone validation

```js
import tin from '@formfusion/tin';

export function isValidTin(value, country) {
  const pattern = tin[String(country).toLowerCase()];
  if (!pattern) return false; // unknown country
  return new RegExp(pattern).test(value);
}

isValidTin('12345678901', 'DE'); // true
isValidTin('12345678', 'de'); // false
```

### TypeScript

Typings are hand-written in `index.d.ts` and mirror the lowercase keys via a mapped type (all 27 keys declared). Because the declaration uses `export =`, you need `esModuleInterop` or `allowSyntheticDefaultImports`.

```ts
import tin from '@formfusion/tin';

const de: string = tin.de;
// @ts-expect-error - unknown country
const xx: string = tin.xx;
```

## API

The export is a plain object with no functions or classes:

```ts
{ [countryCode: string]: string }
```

Country codes are **lowercase** (`de`, `fr`, `es`). Lookups are case-sensitive, so normalize user input first.

**No country prefix is included.** None of the patterns match a prefixed code (e.g. `DE`). Prepend the country prefix yourself if your input requires it.

Coverage: 27 EU member states. Greece is keyed `el` (the EU-standard prefix), not `gr`.

Enumerate the available codes at runtime with `Object.keys(tin)`.

## Caveats

Read these before relying on the patterns.

**Format only, no checksum.** These are shape checks. There is no checksum validation (e.g. mod-11) or external lookup. A well-formed number that does not exist will pass. For authoritative verification consult your local tax authority.

**Partial anchoring in a few patterns.** `es`, `mt`, `pl`, and `sk` use alternations where not every branch is fully anchored. With `new RegExp(...)` (outside HTML `pattern`), extra characters before/after the intended match may pass in some branches. When used in an HTML `pattern` attribute, the browser implicitly anchors the entire value as `^(?:…)$`, which mitigates this.

**`mt` contains a literal `till`.** `tin.mt` includes the literal substring `till` (`^(\d{4})\d[a-zA-Z]till\d{7}[a-zA-Z]|\d{9}$`). Treat that as part of the national format definition in this dataset.

**`es` has a duplicated branch.** The Spanish pattern contains a repeated alternative (`[a-zA-Z]\d{7}[a-zA-Z]`) — cosmetic duplication with no behavioral change.

**Whitespace in `fr`.** `tin.fr` uses `\s`, which matches any whitespace (space, tab, newline), not only a single space. Be aware of how you normalize input.

## Development

```bash
git clone https://github.com/mitevskasara/formfusion-tin.git
cd formfusion-tin
npm install
npm run build
```

### How it works

All source lives in [`src/index.js`](src/index.js) as a single object of uppercase country codes. The last step lowercases every key before exporting, so `AT` becomes `at`.

[`esbuild.js`](esbuild.js) bundles that into a minified CommonJS `index.js` at the repo root, targeting Node 14. Consumers get the built file, so **changes are not live until you rebuild and commit `index.js`**:

```bash
npm run build
```

### Commit convention

This repo follows [Conventional Commits](https://www.conventionalcommits.org/), and `CHANGELOG.md` is generated from those subjects:

```
Feat: add Bolivian TIN pattern
Fix: escape wildcards in Brazilian pattern
```

### Adding a country

1. Add the entry to `src/index.js`, using an uppercase country code.
2. Add the uppercase key to the `Tin` type in `index.d.ts`.
3. Run `npm run build` and commit the regenerated `index.js`.
4. Add a test in the FormFusion repo under `src/__tests__/tin/`.

## Related packages

Part of the FormFusion family of extracted validation rule sets:

- [`@formfusion/postcodes`](https://www.npmjs.com/package/@formfusion/postcodes)
- [`@formfusion/licence-plates`](https://www.npmjs.com/package/@formfusion/licence-plates)
- [`@formfusion/iban`](https://www.npmjs.com/package/@formfusion/iban)
- [`@formfusion/passports`](https://www.npmjs.com/package/@formfusion/passports)
- [`@formfusion/phones`](https://www.npmjs.com/package/@formfusion/phones)
- [`@formfusion/vat`](https://www.npmjs.com/package/@formfusion/vat)
- [`formfusion`](https://www.npmjs.com/package/formfusion) — the core library

## Issues

Report bugs and feature requests at https://github.com/mitevskasara/formfusion-tin/issues.

## License

BSD-2-Clause. Copyright (c) 2023, Mitevska Sara.