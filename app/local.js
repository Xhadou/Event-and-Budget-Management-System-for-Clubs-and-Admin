function setlocal(key, value) {
    typeof window !== 'undefined' ? window.localStorage.setItem(key, value) : null;
}

function getlocal(key) {
    const value = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return value;
}
