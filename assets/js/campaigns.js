async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

function campaignRow(item) {
  return `
    <tr>
      <td>${item.week}</td>
      <td><a href="${item.url}">${item.title}</a></td>
      <td>${item.status}</td>
      <td>${item.reasonable_ask}</td>
      <td>${item.existing_workflow_checked}</td>
      <td>${item.outcome}</td>
    </tr>
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
  const target = document.querySelector('[data-campaigns-table]');
  if (!target) return;

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

    target.innerHTML = visible.map(campaignRow).join('');
    if (count) count.textContent = `${campaigns.length} weeks`;
    if (range) range.textContent = `Showing ${start + 1}–${end} of ${campaigns.length}`;
    if (previous) previous.disabled = currentPage === 0;
    if (next) next.disabled = currentPage >= totalPages - 1;
  }

  try {
    const campaigns = await loadJson('data/campaigns.json');
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
    target.innerHTML = `<tr><td colspan="6">Campaign tracker could not be loaded.</td></tr>`;
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
