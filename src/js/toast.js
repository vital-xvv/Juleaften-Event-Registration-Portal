import { reactive } from 'vue';

let nextToastId = 0;
const timers = new Map();
export const toasts = reactive([]);

export const dismissToast = (id) => {
    const timer = timers.get(id);
    if (timer) {
        clearTimeout(timer);
        timers.delete(id);
    }

    const index = toasts.findIndex((item) => item.id === id);
    if (index !== -1) {
        toasts.splice(index, 1);
    }
};

const showToast = (message, type, duration = 4000) => {
    const id = nextToastId++;
    toasts.push({ id, message, type });
    if (duration > 0) {
        timers.set(id, setTimeout(() => dismissToast(id), duration));
    }
};

export const toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    info: (message, duration) => showToast(message, 'info', duration)
};
