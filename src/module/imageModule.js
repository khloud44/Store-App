function importAll(r) {
    let images = {};
    r.keys().map(item => {images[item.replace('./', '')] = r(item); });
    return images;
}
const reqImgs = importAll(require.context ( '../assets/', true, /\.(png|jpe?g|svg|jfif)$/));
export default  reqImgs;