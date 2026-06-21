const assistants = [
  { name: 'Pip', service: 'Codex', model: 'GPT-5', color: 'codex', prompts: 590, cost: 20.96 },
  { name: 'Nimbus', service: 'Claude', model: 'Sonnet 4', color: 'claude', prompts: 402, cost: 13.96 },
  { name: 'Sparky', service: 'Gemini', model: '2.5 Pro', color: 'gemini', prompts: 292, cost: 7.88 }
];

const series = {
  7: [34, 52, 45, 66, 58, 72, 49],
  30: [22, 31, 27, 38, 45, 33, 29, 51, 44, 47, 62, 55, 39, 35, 48, 58, 68, 52, 44, 71, 64, 59, 76, 61, 54, 69, 73, 66, 79, 70],
  90: [32, 38, 35, 44, 41, 48, 52, 47, 56, 61, 57, 65, 60, 68, 72, 66, 75, 71]
};

const assistantGrid = document.querySelector('#assistantGrid');
const chart = document.querySelector('#activityChart');
const dialog = document.querySelector('#usageDialog');
const toast = document.querySelector('#toast');

function renderAssistants() {
  assistantGrid.innerHTML = assistants.map((assistant) => `
    <article class="assistant-card">
      <div class="assistant-top"><div class="avatar ${assistant.color}" aria-hidden="true"></div><div class="assistant-name"><strong>${assistant.name}</strong><span>${assistant.service}</span><span class="model-chip">${assistant.model}</span></div></div>
      <div class="assistant-stats"><div><strong>${assistant.prompts.toLocaleString()}</strong><span>prompts</span></div><div class="assistant-cost"><strong>$${assistant.cost.toFixed(2)}</strong><span>this month</span></div></div>
    </article>`).join('');
}

function renderChart(days = 30) {
  chart.innerHTML = series[days].map((value) => `<div class="bar-wrap" data-value="${value}" style="--h:${value}%"><span class="bar" style="height:${value}%"></span></div>`).join('');
}

document.querySelectorAll('[data-range]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-range]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  renderChart(Number(button.dataset.range));
}));

document.querySelector('#addButton').addEventListener('click', () => dialog.showModal());
document.querySelector('#themeButton').addEventListener('click', () => document.body.classList.toggle('dark'));
document.querySelector('#settingsButton').addEventListener('click', () => showToast('Settings are ready for your real API keys.'));
document.querySelector('#viewAllButton').addEventListener('click', () => showToast('All four assistants are already at the party.'));

document.querySelector('#usageForm').addEventListener('submit', (event) => {
  if (event.submitter?.value === 'cancel') return;
  event.preventDefault();
  const amount = Number(document.querySelector('#promptInput').value);
  const index = Number(document.querySelector('#assistantSelect').value);
  assistants[index].prompts += amount;
  const total = assistants.reduce((sum, item) => sum + item.prompts, 0);
  document.querySelector('[data-metric="prompts"]').textContent = total.toLocaleString();
  renderAssistants();
  dialog.close();
  showToast(`${amount} prompts added to ${assistants[index].name}. Nice work!`);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

renderAssistants();
renderChart();
