export const storeApiCache = async (url, method, res) => {
    if ('caches' in window) {
        return await setApiCache(url, method, res)
    } else {
        return res;
    }
};

export const loadApiCache = async (url, method) => {
    if ('caches' in window) {
        return await getApiCache(url, method)
    } else {
        return null;
    }
};

export const deleteApiCache = (method) => {
    caches.delete(method)
        .then(() => {

        })
};

const getApiCache = (url, method) => {
    return new Promise((resolve, reject) => {
        caches.open(method)
            .then(cache => {
                cache.match(url)
                    .then(item => {
                        if (item !== undefined) {

                            resolve(item)
                        } else {

                            resolve(null)
                        }
                    })
            })
    });
};

const setApiCache = (url, method, res) => {
    let resClone = res.clone();
    return new Promise((resolve, reject) => {
        caches.open(method)
            .then(cache => {
                cache.match(url)
                    .then(item => {
                        if (item === undefined) {
                            cache.put(url, res);
                            resolve(resClone)
                        } else {
                            resolve(res)
                        }
                    })
            })
    });
};