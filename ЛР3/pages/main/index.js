import { TrackCardComponent } from '../../components/track-card/index.js';
import { ProductPage } from '../product/index.js';

const tracks = [
  { id: 1, title: 'Midnight City', artist: 'M83', genre: 'Электроника', year: 2011, duration: '4:03', coverClass: 'cover-one', symbol: '🌆', description: 'Атмосферная электронная композиция для вечернего города, прогулок и ощущения большого пространства.' },
  { id: 2, title: 'Ocean Eyes', artist: 'Billie Eilish', genre: 'Pop', year: 2016, duration: '3:20', coverClass: 'cover-two', symbol: '🌊', description: 'Мягкое звучание и воздушная мелодия. Подборка для спокойного настроения и наушников.' },
  { id: 3, title: 'Golden Hour', artist: 'JVKE', genre: 'Pop', year: 2022, duration: '3:29', coverClass: 'cover-three', symbol: '🌅', description: 'Светлая поп-композиция с кинематографичным настроением, напоминающая о красивых моментах.' },
  { id: 4, title: 'Space Song', artist: 'Beach House', genre: 'Dream pop', year: 2015, duration: '5:20', coverClass: 'cover-four', symbol: '🪐', description: 'Мечтательный дрим-поп с плавным развитием и космической атмосферой.' },
  { id: 5, title: 'Moon Song', artist: 'Phoebe Bridgers', genre: 'Indie', year: 2020, duration: '4:37', coverClass: 'cover-five', symbol: '🌙', description: 'Инди-подборка с камерным настроением и мягкой, личной подачей.' },
  { id: 6, title: 'Sunset Lover', artist: 'Petit Biscuit', genre: 'Electronic', year: 2015, duration: '3:57', coverClass: 'cover-six', symbol: '🌴', description: 'Лёгкая электронная композиция для дороги, отдыха и летних вечеров.' }
];

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.filteredTracks = tracks;
  }

  getHTML() {
    return `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand"><span class="brand-mark">≋</span><span>soundify</span></div>
          <div class="search-wrap">
            <input class="search-input" id="track-search" type="search"
              placeholder="Найти трек или исполнителя..." aria-label="Поиск по каталогу">
          </div>
          <div class="avatar" title="Учебный профиль">S</div>
        </header>
        <main>
          <section class="hero">
            <div class="eyebrow">Твоя музыка · твоё настроение</div>
            <h1>Здесь начинается<br>твой саундтрек.</h1>
            <p>Исследуй подборки, находи новые звучания и открывай карточки любимых треков. Учебный интерфейс, вдохновлённый музыкальными стриминг-сервисами.</p>
            <button class="primary-btn" id="explore-button" type="button">Исследовать музыку&nbsp; ↓</button>
          </section>
          <div class="section-head" id="catalog">
            <div><h2>Популярные подборки</h2><div class="muted">Небольшая коллекция для демонстрации интерфейса</div></div>
            <span class="muted" id="track-count">6 подборок</span>
          </div>
          <section class="track-grid" id="track-grid" aria-label="Музыкальные подборки"></section>
          <p class="empty-state d-none" id="empty-state">Ничего не найдено. Попробуй изменить запрос.</p>
        </main>
        <footer class="footer">
          <div>Учебный проект · Лабораторная работа № 3 · Не является официальным сервисом Spotify</div>
          <div class="github-footer">
            <span>Исходный код проекта:</span>
            <a href="https://github.com/mitrohinaa610satira/-3-54-" target="_blank" rel="noopener noreferrer">
              GitHub — Soundify / Spotify
            </a>
          </div>
        </footer>
      </div>`;
  }

  renderTracks(list) {
    const grid = document.getElementById('track-grid');
    grid.innerHTML = '';
    list.forEach(track => new TrackCardComponent(grid).render(track, id => this.openTrack(id)));
    document.getElementById('track-count').textContent = `${list.length} подборок`;
    document.getElementById('empty-state').classList.toggle('d-none', list.length !== 0);
  }

  openTrack(id) {
    new ProductPage(this.parent, id, tracks, () => this.render()).render();
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    this.renderTracks(this.filteredTracks);
    document.getElementById('track-search').addEventListener('input', event => {
      const query = event.target.value.trim().toLocaleLowerCase('ru');
      this.filteredTracks = tracks.filter(track =>
        `${track.title} ${track.artist} ${track.genre}`.toLocaleLowerCase('ru').includes(query));
      this.renderTracks(this.filteredTracks);
    });
    document.getElementById('explore-button').addEventListener('click', () => {
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  }
}