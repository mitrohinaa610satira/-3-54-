import { ProductComponent } from '../../components/product/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';

export class ProductPage {
  constructor(parent, id, tracks, onBack) {
    this.parent = parent;
    this.id = Number(id);
    this.tracks = tracks;
    this.onBack = onBack;
  }

  getHTML() {
    return `<div class="app-shell">
      <header class="topbar">
        <div class="brand"><span class="brand-mark">≋</span><span>soundify</span></div>
        <div class="muted">Карточка подборки</div>
        <div class="avatar" aria-hidden="true">S</div>
      </header>
      <main id="product-root"></main>
      <footer class="footer">Учебный проект · Демонстрационные данные</footer>
    </div>`;
  }

  render() {
    const track = this.tracks.find(item => item.id === this.id);
    if (!track) {
      this.parent.innerHTML = '<div class="app-shell"><p>Подборка не найдена.</p><button class="back-btn" id="fallback-back">← Назад</button></div>';
      document.getElementById('fallback-back').addEventListener('click', this.onBack);
      return;
    }
    this.parent.innerHTML = this.getHTML();
    const productRoot = document.getElementById('product-root');
    new BackButtonComponent(productRoot).render(this.onBack);
    new ProductComponent(productRoot).render(track);
  }
}