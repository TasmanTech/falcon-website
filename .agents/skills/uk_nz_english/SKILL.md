---
name: uk-nz-english
description: >-
  Detailed UK / NZ English spelling list and audit procedure. Use when auditing or converting existing
  copy, metadata, llms.txt, emails or docs to UK / NZ English, or when unsure of a spelling. The
  always-on essentials are in the uk_nz_english rule.
---

# UK / NZ English

The `uk_nz_english` rule holds the essentials and loads on every request. This skill adds the detail.

## Spellings
| Use | Not |
|---|---|
| organise, customise, specialise, prioritise, realise, recognise, minimise | -ize forms |
| organisation, personalisation, optimisation | -ization forms |
| analyse, paralyse | analyze |
| colour, behaviour, favour, labour, neighbour, honour | -or forms |
| centre, metre, fibre, theatre | -er forms |
| travelled, cancelled, labelled, modelling, fulfil, enrol, enrolment | single-l forms |
| licence (noun) / license (verb), practice (noun) / practise (verb) | |
| defence, offence | defense, offense |
| catalogue, programme (but "program" for software), cheque, grey, tyre, aluminium, jewellery | US forms |

## Formats
- Dates: day before month, e.g. "7 October 2026" or `07/10/2026` (the admin portal and invoices use DD/MM/YYYY in NZ time).
- Times: "7 am to 9 pm".
- Money: `NZ$20` or `NZD` where a reader could confuse it with another dollar.
- Vocabulary: keep trade terms plain and widely understood (e.g. "car lockout", "jump start"); use NZ terms such as "tyre" and "spanner" where they fit.

## Out of scope (leave in US spelling)
Code identifiers, CSS properties and Tailwind classes (`color`, `text-center`), HTML attributes, JSON / API field names, npm package names, and anything a framework or third party expects verbatim (e.g. Schema.org `"@type": "Organization"`, `openingHoursSpecification`).

## Audit procedure
1. Search the target files for common US forms, e.g. from the repo root:
   `git grep -nIiE "\b(organiz|optimiz|customiz|specializ|prioritiz|realiz|recogniz|analyz|color|behavior|favor|neighbor|center|traveled|canceled|labeled|defense)" -- apps/front-end/app apps/front-end/components apps/front-end/public/llms.txt apps/back-end/src`
2. Ignore hits inside code identifiers, class names and schema keys; fix only user-facing strings and comments written as prose.
3. Re-run the related tests, because many assert on exact copy.

If a file consistently uses another locale for a reason (e.g. a third-party template), point out the mismatch instead of silently mixing spellings.
