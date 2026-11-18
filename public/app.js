const API_URL = '/stocks';
const tracksContainer = document.getElementById('tracks');
const trackForm = document.getElementById('trackForm');
const searchInput = document.getElementById('searchInput');
const statusElement = document.getElementById('status');
const formMessage = document.getElementById('formMessage');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
let editingId = null;
let allTracks = [];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
}[char]));

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Ошибка запроса: ${response.status}`);
  return data;
}

function renderTracks(tracks) {
  document.getElementById('trackCount').textContent = `${tracks.length} трек(ов)`;
  if (!tracks.length) {
    tracksContainer.innerHTML = '<div class="empty">Ничего не найдено. Добавь первый трек в коллекцию.</div>';
    return;
  }
  tracksContainer.innerHTML = tracks.map((track) => `
    <article class="track-card">
      <img src="${escapeHtml(track.src)}" alt="Обложка: ${escapeHtml(track.title)}" loading="lazy" onerror="this.src='https://placehold.co/600x400/222/1ed760?text=Spotify'">
      <div class="track-info">
        <h3>${escapeHtml(track.title)}</h3>
        <p>${escapeHtml(track.text)}</p>
        <div class="card-actions">
          <button class="small-btn" data-edit="${track.id}">Изменить</button>
          <button class="small-btn delete" data-delete="${track.id}">Удалить</button>
        </div>
      </div>
    </article>`).join('');
}

async function loadTracks() {
  statusElement.textContent = 'Загружаем данные…';
  tracksContainer.innerHTML = '<div class="loading">Загружаем твою музыку…</div>';
  try {
    allTracks = await request(API_URL);
    applySearch();
    statusElement.textContent = '● Сервер подключён';
  } catch (error) {
    tracksContainer.innerHTML = `<div class="empty">${escapeHtml(error.message)}. Проверь, запущен ли сервер.</div>`;
    statusElement.textContent = '● Нет соединения с сервером';
  }
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  renderTracks(allTracks.filter((track) => track.title.toLowerCase().includes(query)));
}

function resetForm() {
  editingId = null;
  trackForm.reset();
  formTitle.textContent = 'Добавить трек';
  submitBtn.textContent = '＋ Добавить в коллекцию';
  cancelEditBtn.classList.add('hidden');
  formMessage.textContent = '';
  formMessage.classList.remove('error');
}

trackForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    title: trackForm.elements.title.value.trim(),
    src: trackForm.elements.src.value.trim(),
    text: trackForm.elements.text.value.trim()
  };
  try {
    if (editingId !== null) {
      await request(`${API_URL}/${editingId}`, { method: 'PATCH', body: JSON.stringify(payload) });
      formMessage.textContent = 'Изменения сохранены.';
    } else {
      await request(API_URL, { method: 'POST', body: JSON.stringify(payload) });
      formMessage.textContent = 'Трек добавлен в коллекцию.';
    }
    formMessage.classList.remove('error');
    resetForm();
    await loadTracks();
    formMessage.textContent = editingId === null ? 'Готово! Коллекция обновлена.' : 'Готово! Коллекция обновлена.';
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.classList.add('error');
  }
});

tracksContainer.addEventListener('click', async (event) => {
  const editButton = event.target.closest('[data-edit]');
  const deleteButton = event.target.closest('[data-delete]');
  if (editButton) {
    const track = allTracks.find((item) => item.id === Number(editButton.dataset.edit));
    if (!track) return;
    editingId = track.id;
    trackForm.elements.title.value = track.title;
    trackForm.elements.src.value = track.src;
    trackForm.elements.text.value = track.text;
    formTitle.textContent = 'Редактировать трек';
    submitBtn.textContent = 'Сохранить изменения';
    cancelEditBtn.classList.remove('hidden');
    formMessage.textContent = '';
    document.querySelector('.form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (deleteButton) {
    const id = Number(deleteButton.dataset.delete);
    if (!window.confirm('Удалить этот трек из коллекции?')) return;
    try {
      await request(`${API_URL}/${id}`, { method: 'DELETE' });
      if (editingId === id) resetForm();
      await loadTracks();
    } catch (error) {
      statusElement.textContent = error.message;
    }
  }
});

searchInput.addEventListener('input', applySearch);
document.getElementById('reloadBtn').addEventListener('click', loadTracks);
cancelEditBtn.addEventListener('click', resetForm);
loadTracks();
