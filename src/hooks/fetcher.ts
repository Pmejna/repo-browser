export default function fetcher(url: string, data = undefined) {
    if (url === ``) {
        let data: [] = [];
        return data
    } else {
        return fetch(`${url}`, {
            method: 'GET',
            body: JSON.stringify(data),
        }
        ).then((res) => {
            if (res.status > 399 && res.status < 200) {
                throw new Error();
            }
            return res.json()
        }).catch((e) => {
            throw new Error(e);
        })
    }
}