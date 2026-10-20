export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    getHTML(data) {
        return (
            `
                <div class="col-12 col-sm-6 col-lg-4 mb-4">
                    <div class="card h-100">
                        <div class="card-img-wrap">
                            <img class="card-img-top" src="${data.src}" alt="${data.title}">
                            <span class="play-overlay">▶</span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text flex-grow-1">${data.text}</p>
                            <button class="btn btn-primary mt-2" id="click-card-${data.id}" data-id="${data.id}">
                                ▶ Слушать
                            </button>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
