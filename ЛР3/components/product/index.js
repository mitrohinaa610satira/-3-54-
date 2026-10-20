export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getTracksHTML(tracks) {
        return tracks.map((track, index) => (
            `
                <li class="track-row">
                    <span class="track-number">${index + 1}</span>
                    <span class="track-name">${track[0]}</span>
                    <span class="track-duration">${track[1]}</span>
                </li>
            `
        )).join('');
    }

    getHTML(data) {
        return (
            `
                <div class="product-hero">
                    <div class="card-img-wrap">
                        <img src="${data.src}" alt="${data.title}">
                        <span class="play-overlay play-overlay-lg">▶</span>
                    </div>
                    <h2>${data.title}</h2>
                    <p class="product-meta">${data.artist} · ${data.genre}</p>
                    <p>${data.fullText}</p>
                    <ul class="tracklist">
                        ${this.getTracksHTML(data.tracks)}
                    </ul>
                </div>
                <footer class="app-footer">
                    <span>ЛР выполнила Митрохина Анастасия Александровна, гр. ИБМ3-54Б</span>
                    <a href="https://github.com/mitrohinaa610satira/-3-54-" target="_blank" rel="noopener noreferrer">⭐ Репозиторий на GitHub</a>
                </footer>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
