export default function (value) {
    return value.length === 24 && /^[0-9a-f]+$/.test(value);
}
