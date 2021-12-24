export class StockCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.pk}`)
            .addEventListener("click", listener)
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 400px; background-color: black; border-color: white">
                    <div class="card-body" style="color: white">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">Количество на складе: <b>${data.quantity}</b></p>
                        <p class="card-text">Производитель: ${data.manufacturer}</p>
                        <p class="card-text">Вес: ${data.weight} г.</p>
                        <p class="card-text">Срок годности: ${data.expiration_date}</p>
                        <p class="card-text">Описание: ${data.description}</p>
                        <button class="btn btn-primary" id="click-card-${data.pk}" data-id="${data.pk}">Нажми на меня</button>

                    </div>
                </div>
            `
        )
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}