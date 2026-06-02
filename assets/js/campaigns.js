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
  try {
    const campaigns = await loadJson('data/campaigns.json');
    target.innerHTML = campaigns.map(campaignRow).join('');
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
