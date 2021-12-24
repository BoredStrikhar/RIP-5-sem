export class StockComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 400px; background-color: black">
                    <div class="card-body" style="color: white">
                        <h5 class="card-title" style="color: white">${data.name}</h5>
                        <p class="card-text">Количество на складе: <b>${data.quantity}</b></p>
                        <p class="card-text">Производитель: ${data.manufacturer}</p>
                        <p class="card-text">Вес: ${data.weight} г.</p>
                        <p class="card-text">Срок годности: ${data.expiration_date}</p>
                        <p class="card-text">Описание: ${data.description}</p>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}