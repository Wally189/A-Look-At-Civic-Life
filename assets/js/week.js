async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

function campaignLayer(week) {
  if (week === 0) return 'Preparation';
  if (week <= 8) return 'Readability and accountability';
  if (week <= 16) return 'Public money and fair work';
  if (week <= 24) return 'Health and public-service safety';
  if (week <= 32) return 'Household survival';
  if (week <= 40) return 'Housing';
  if (week <= 48) return 'Transport, skills and local economy';
  return 'Justice, resettlement and resilience';
}

function getRequestedWeek() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('week');
  if (requested === null) return null;
  const week = Number(requested);
  return Number.isInteger(week) ? week : null;
}

function paragraphList(paragraphs = []) {
  return paragraphs.map((text) => `<p>${text}</p>`).join('');
}

function renderSummary(summary = [], fallback) {
  const rows = summary.length ? summary : [
    ['Status', fallback.status],
    ['Layer', campaignLayer(Number(fallback.week))],
    ['Reasonable ask', fallback.reasonable_ask]
  ];

  return `<div class="week-summary">${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join('')}</div>`;
}

function renderSections(sections = [], fallback) {
  if (sections.length) {
    return sections.map((section) => `
      <section class="section">
        <h2>${section.heading}</h2>
        ${paragraphList(section.paragraphs)}
      </section>
    `).join('');
  }

  return `
    <section class="section">
      <h2>What is being tested?</h2>
      <p>${fallback.reasonable_ask}</p>
      <p>This week has not yet been prepared in detail. The campaign card records the planned issue, layer and starting ask. When the week becomes active, this page will be expanded with sources, route checks, contacts, responses and outcomes.</p>
    </section>
    <section class="section">
      <h2>Starting point</h2>
      <p><strong>Theme:</strong> ${fallback.theme}</p>
      <p><strong>Existing workflow:</strong> ${fallback.existing_workflow_checked}</p>
      <p><strong>Outcome:</strong> ${fallback.outcome}</p>
    </section>
  `;
}

function renderCards(cards = []) {
  if (!cards.length) return '';
  return `
    <section class="section week-grid">
      ${cards.map((card) => `
        <div class="week-card">
          <h3>${card.heading}</h3>
          <ul>${card.items.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
      `).join('')}
    </section>
  `;
}

function renderFieldNote(note) {
  if (!note) return '';
  return `
    <aside class="section field-note">
      <h2>Field note</h2>
      <p>${note}</p>
    </aside>
  `;
}

function renderNext(detail) {
  const heading = detail.next_heading || 'What comes next?';
  const text = detail.next_text || 'This week will be updated as the project develops.';
  return `
    <section class="section">
      <h2>${heading}</h2>
      <p>${text}</p>
      <div class="action-row">
        <a class="button" href="52-weeks.html">Explore the 52-week ladder</a>
        <a class="button secondary" href="campaign-log.html">View the campaign log</a>
      </div>
    </section>
  `;
}

function renderWeekPage(campaign, detail, isCurrent) {
  const target = document.querySelector('[data-week-page]');
  if (!target) return;

  const week = Number(campaign.week);
  const eyebrow = detail.eyebrow || `${isCurrent ? 'Current field note' : 'Week archive'} · Week ${week}`;
  const title = detail.title || campaign.title;
  const lede = detail.lede || campaign.reasonable_ask;

  document.title = `Week ${week} — ${campaign.title} | A Look at Civic Life`;

  target.innerHTML = `
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="lede">${lede}</p>
    ${renderSummary(detail.summary, campaign)}
    ${renderSections(detail.sections, campaign)}
    ${renderCards(detail.cards)}
    ${renderFieldNote(detail.field_note)}
    ${renderNext(detail)}
  `;
}

async function initWeekPage() {
  const target = document.querySelector('[data-week-page]');
  if (!target) return;

  try {
    const campaigns = await loadJson('data/campaigns.json');
    const details = await loadJson('data/week-details.json');
    const current = await loadJson('data/current-week.json');
    const requested = getRequestedWeek();
    const activeWeek = requested === null ? Number(current.active_week) : requested;
    const campaign = campaigns.find((item) => Number(item.week) === activeWeek);

    if (!campaign) {
      target.innerHTML = '<h1>Week not found</h1><p>This week is not in the public tracker.</p>';
      return;
    }

    renderWeekPage(campaign, details[String(activeWeek)] || {}, requested === null);
  } catch (error) {
    target.innerHTML = '<h1>Week could not be loaded</h1><p>The week data could not be loaded. Please try again later.</p>';
  }
}

document.addEventListener('DOMContentLoaded', initWeekPage);
