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

function campaignUrl(item) {
  return `week.html?week=${Number(item.week)}`;
}

function campaignRow(item) {
  return `
    <tr>
      <td>${item.week}</td>
      <td><a href="${campaignUrl(item)}">${item.title}</a></td>
      <td>${item.status}</td>
      <td>${item.reasonable_ask}</td>
      <td>${item.existing_workflow_checked}</td>
      <td>${item.outcome}</td>
    </tr>
  `;
}

function campaignCard(item) {
  return `
    <article class="campaign-card">
      <p class="campaign-card-week">Week ${item.week}</p>
      <h2><a href="${campaignUrl(item)}">${item.title}</a></h2>
      <p><strong>Layer:</strong> ${campaignLayer(Number(item.week))}</p>
      <p><strong>Status:</strong> ${item.status}</p>
      <p><strong>Reasonable ask:</strong><br>${item.reasonable_ask}</p>
      <p><strong>Workflow:</strong> ${item.existing_workflow_checked}</p>
      <p><strong>Outcome:</strong> ${item.outcome}</p>
    </article>
  `;
}

function logRow(item) {
  return `
    <tr>
      <td>${item.date}</td>
      <td>${item.week}</td>
      <td>${item.issue}</td>
      <td>${item.action_type}</td>
      <td>${item.person_or_organisation}</td>
      <td>${item.route_used}</td>
      <td>${item.summary}</td>
      <td>${item.status}</td>
      <td>${item.next_step}</td>
    </tr>
  `;
}

async function renderCampaigns() {
  const tableTarget = document.querySelector('[data-campaigns-table]');
  const cardTarget = document.querySelector('[data-campaigns-cards]');
  if (!tableTarget && !cardTarget) return;

  const count = document.querySelector('[data-campaigns-count]');
  const range = document.querySelector('[data-campaigns-range]');
  const previous = document.querySelector('[data-campaigns-prev]');
  const next = document.querySelector('[data-campaigns-next]');
  const pageSize = 6;
  let currentPage = 0;

  function renderPage(campaigns) {
    const totalPages = Math.ceil(campaigns.length / pageSize);
    const start = currentPage * pageSize;
    const end = Math.min(start + pageSize, campaigns.length);
    const visible = campaigns.slice(start, end);

    if (tableTarget) tableTarget.innerHTML = visible.map(campaignRow).join('');
    if (cardTarget) cardTarget.innerHTML = visible.map(campaignCard).join('');
    if (count) count.textContent = 'Week 0 + 52 campaign weeks';
    if (range) range.textContent = `Showing ${start + 1}–${end} of ${campaigns.length} entries`;
    if (previous) previous.disabled = currentPage === 0;
    if (next) next.disabled = currentPage >= totalPages - 1;
  }

  try {
    const loadedCampaigns = await loadJson('data/campaigns.json');
    const campaigns = loadedCampaigns
      .filter((item) => Number(item.week) >= 0 && Number(item.week) <= 52)
      .sort((a, b) => Number(a.week) - Number(b.week));

    renderPage(campaigns);

    if (previous) {
      previous.addEventListener('click', () => {
        if (currentPage > 0) {
          currentPage -= 1;
          renderPage(campaigns);
        }
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        if ((currentPage + 1) * pageSize < campaigns.length) {
          currentPage += 1;
          renderPage(campaigns);
        }
      });
    }
  } catch (error) {
    if (tableTarget) tableTarget.innerHTML = `<tr><td colspan="6">Campaign tracker could not be loaded.</td></tr>`;
    if (cardTarget) cardTarget.innerHTML = `<article class="campaign-card"><p>Campaign tracker could not be loaded.</p></article>`;
  }
}

async function renderLog() {
  const target = document.querySelector('[data-log-table]');
  if (!target) return;
  try {
    const log = await loadJson('data/log.json');
    target.innerHTML = log.map(logRow).join('');
  } catch (error) {
    target.innerHTML = `<tr><td colspan="9">Campaign log could not be loaded.</td></tr>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCampaigns();
  renderLog();
});
