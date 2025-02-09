export default class NotificationMessage {
    static lastShownMessage;

    constructor(message = '', {duration = 2000, type='success'} = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.renderElement();
    }

    createTemplate() {
        return `
            <div class="notification ${this.type}" style="--value:${this.duration / 950}s"> 
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">
                        ${this.message}
                    </div>
                </div>
            </div>
        `;
    }
 
    renderElement() {
        const domElement = document.createElement('div');
        domElement.innerHTML = this.createTemplate();
        this.element = domElement.firstElementChild;
    }

    show(targetElement = document.body) {
        this.hide();
        NotificationMessage.lastShownMessage = this;

        targetElement.append(this.element);

        this.timerId = setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    hide() {
        if (NotificationMessage.lastShownMessage) {
            NotificationMessage.lastShownMessage.destroy();
        }
    }

    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        clearTimeout(this.timerId);
        NotificationMessage.lastShownMessage = null;
    }
}
