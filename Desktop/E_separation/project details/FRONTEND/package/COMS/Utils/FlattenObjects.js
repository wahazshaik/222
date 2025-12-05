const FlattenObjects = (source, target) => {
    Object.keys(source).forEach(function (k) {
        if (source[k] !== null && typeof source[k] === 'object') {
            FlattenObjects(source[k], target);
            return;
        }
        target[k] = source[k];
    });
};

export default FlattenObjects