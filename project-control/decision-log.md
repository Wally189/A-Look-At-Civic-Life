# Decision Log

Use this file to record important project decisions so they do not have to be re-argued later.

## Decisions

### 2026-06-02 — Project Web Builder method adopted

**Decision:** Use the Project Web Builder method for this site and, where suitable, other simple content-led website repositories.

**Meaning:**

- Alan remains the owner and final decision-maker.
- ChatGPT acts as project manager, editor, reviewer and builder.
- GitHub acts as the source of truth for files, task status and project memory.
- Work proceeds through a task board, current task file, mini-tasks, page-by-page review, decisions log and launch checklist.

**Reason:** This works well for straightforward static websites where the hard work is content, structure, tone, public usefulness and polish rather than complex engineering.

---

### 2026-06-02 — No separate blog during pilot

**Decision:** Do not add a separate blog page during the pilot.

**Reason:** Current Week and individual week pages are already the field journal. A blog would add extra structure and maintenance before the basic method has been tested.

**Review point:** Pilot review after Week 4.

---

### 2026-06-02 — No polls during pilot

**Decision:** Do not add polls during the pilot.

**Reason:** Polls create privacy, bias, moderation and fake-consultation risks. This project criticises weak consultation, so it must not run weak pretend-consultation itself.

**Review point:** Pilot review after Week 4.

---

### 2026-06-02 — No comments or mailing list during pilot

**Decision:** Do not add comments or a mailing list during the pilot.

**Reason:** They add privacy, moderation and maintenance burdens. Corrections and useful sources can come through the project email once confirmed.

**Review point:** Pilot review after Week 4.

---

### 2026-06-02 — Campaign Log is for real public actions only

**Decision:** The Campaign Log must not include setup/admin work.

**Reason:** The public log should record real civic actions: questions asked, routes used, replies received, outcomes and next steps. Setup belongs in project-control files.

---

### 2026-06-02 — Weekly pages should be data-driven

**Decision:** `current-week.html` and `week.html?week=N` should be reusable templates driven by data files rather than hand-coded each week.

**Reason:** This reduces weekly maintenance and makes the site easier to update.

**Files:**

- `data/current-week.json`
- `data/week-details.json`
- `data/campaigns.json`
- `current-week.html`
- `week.html`

---

### 2026-06-02 — Video supports the field notes but does not replace them

**Decision:** The written week page remains the public record. Any video or audio is a public explanation of the same work.

**Reason:** Written sources, asks, responses and corrections are easier to audit than video alone.
