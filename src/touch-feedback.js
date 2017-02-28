const eventBind = function (container, bindProp, feedbackClass) {
    const eventData = {};
    const classUtil = {
        hasClass(elem, cls) {
            cls = cls || '';
            if (cls.replace(/\s/g, '').length == 0) return false;
            return new RegExp(` ${cls} `).test(` ${elem.className} `);
        },
        addClass(elem, cls) {
            if (!this.hasClass(elem, cls)) {
                elem.className += ` ${cls}`;
            }
        },
        removeClass(elem, cls) {
            if (this.hasClass(elem, cls)) {
                let newClass = ` ${elem.className.replace(/[\t\r\n]/g, '')} `;
                while (newClass.indexOf(` ${cls} `) >= 0) {
                    newClass = newClass.replace(` ${cls} `, '');
                }
                elem.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        },
        closest(elem, attribute) {
            let cur;
            for (cur = elem; cur; cur = cur.parentNode) {
                if (cur.nodeType === 1 && cur.getAttribute(attribute) === 'true') {
                    break;
                }
            }
            return cur;
        },
    };
    container.addEventListener('touchstart', (e) => {
        eventData.event = e.changedTouches ? e.changedTouches[0] : e;
        eventData.startX = eventData.event.pageX;
        eventData.startY = eventData.event.pageY;
        eventData.target = classUtil.closest(e.target, bindProp);
        if (eventData.target) {
            classUtil.addClass(eventData.target, feedbackClass);
        }
    });
    container.addEventListener('touchcancel', (e) => {
        classUtil.removeClass(eventData.target, feedbackClass);
    });
    container.addEventListener('touchend', (e) => {
        classUtil.removeClass(eventData.target, feedbackClass);
    });
};

const TouchFeedback = function (container, option) {
    this._container = typeof container === 'string'
        ? document.querySelector(container) : container;
    option = option || {};
    this._bindProp = option.bindProp || 'touchFeedback';
    this._feedbackClass = option.feedbackClass || 'feedback';
    eventBind(this._container, this._bindProp, this._feedbackClass);
};

export default TouchFeedback;
