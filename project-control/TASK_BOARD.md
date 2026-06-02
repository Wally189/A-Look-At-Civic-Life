# A Look at Civic Life — Task Board

Use this as the single source of truth for the launch.

Status options: **Not started**, **Next**, **In progress**, **Blocked**, **Done**, **Deferred**.

Working rule:

> When Alan asks “what task are we working on?”, look for the first task marked **Next** or **In progress**.

## Current board

| ID | Phase | Task | Target date | Status | Current next action |
|---|---|---|---:|---|---|
| ALCL-000 | Setup | Freeze master brief v0.1 | 2026-06-02 | Done | Use the frozen brief as the basis for the website skeleton. |
| ALCL-001 | Phase 1 — Build skeleton | Create project working structure in GitHub | 2026-06-03 | Done | Project-control files, task cards and week folders have been added to this repo. |
| ALCL-002 | Phase 1 — Build skeleton | Build first static website skeleton directly in GitHub | 2026-06-03 | Done | Static pages, CSS, JS and JSON tracker/log files have been added. |
| ALCL-003 | Phase 1 — Build skeleton | Check website output folder structure | 2026-06-04 | Done | GitHub Pages works, main pages load, footer works, tracker works, and campaign log contains campaign actions only. |
| ALCL-004 | Phase 1 — Mobile visual review | Check first build visually on mobile | 2026-06-05 | Done | Home, About, 52 Weeks, Current Week, Campaign Log, Method and Contact have been visually reviewed and improved on mobile. |
| ALCL-004A | Phase 1 — Desktop visual review | Check first build visually on desktop | 2026-06-05 | Next | Open the site on desktop and check spacing, width, typography, navigation, footer, cards, directory rows and any awkward empty space. |
| ALCL-005 | Phase 2 — Final visual sanity pass | Review against no-card-soup rule | 2026-06-06 | Not started | Check no card soup, no fake campaign gloss, no unnecessary features, mobile readability, public-facing tone and field-journal feel. |
| ALCL-006 | Phase 2 — Data and rendering check | Check tracker, campaign log and reusable week pages | 2026-06-07 | Not started | Check `campaigns.json`, `log.json`, `current-week.json`, `week-details.json`, `current-week.html` and `week.html?week=0` render correctly. |
| ALCL-007 | Phase 3 — Core pages | Draft and polish Home, About and Method pages | 2026-06-11 | Done | Home, About and Method now have public-facing tone, safeguards, responsible AI wording and civic directory. |
| ALCL-008 | Phase 3 — Contact and legal pages | Draft Contact and review Privacy pages | 2026-06-12 | In progress | Contact has been restructured. Privacy, Cookies, Accessibility and Terms still need a final plain-English review. |
| ALCL-009 | Phase 4 — Public basics | Decide domain and email | 2026-06-14 | Not started | Confirm final project email, then replace the Contact placeholder with a proper email button. |
| ALCL-010 | Phase 4 — SEO and sharing basics | Add launch SEO and social preview basics | 2026-06-15 | Not started | Add/confirm meta descriptions, Open Graph tags, social preview image, alt text, sitemap, robots and canonical URLs once domain is final. |
| ALCL-011 | Phase 5 — Week 0 | Prepare Week 0 for quiet launch | 2026-06-16 | Not started | Confirm Week 0 page, current-week data, no public actions yet, and public log remains empty until real civic action occurs. |
| ALCL-012 | Phase 6 — Pilot Week 1 | Prepare Week 1: Plain-English public documents | 2026-06-23 | Not started | Pick one public document type, gather 3–5 public sources, define one reasonable ask and prepare the first field note. |
| ALCL-013 | Phase 6 — Video format | Prepare first simple video/audio script | 2026-06-24 | Not started | Use Week 1 page to draft a short public-information style script; no presenter camera required. |
| ALCL-014 | Phase 7 — Pilot review | Run pilot review | 2026-07-18 | Not started | After Week 4, review friction, enjoyment, contact discipline, workload, usefulness and whether to simplify before expanding. |

## Pilot feature decisions

- Do **not** add a separate blog during the pilot. Treat Current Week and individual week pages as the field journal.
- Do **not** add polls during the pilot. They create privacy, bias, moderation and fake-consultation risks.
- Do **not** add comments or a mailing list during the pilot.
- The eventual video/vlog supports the written field notes; it does not replace them.
- The Campaign Log is for real public civic actions only, not setup/admin work.
- `current-week.html` is now reusable and data-driven through `data/current-week.json`.
- Individual week pages use the reusable `week.html?week=N` structure.
- Future richer week content should go into `data/week-details.json`.

## How to use this board with ChatGPT

1. Ask: “Use the task board. What task are we working on?”
2. ChatGPT should identify the first task marked **Next** or **In progress**.
3. Ask: “Break this task into mini tasks.”
4. Work through the mini tasks one by one.
5. When done, change the task status to **Done** and mark the next task as **Next**.

## Important

ChatGPT can remember the broad plan, but the most accurate status will always be this file.
