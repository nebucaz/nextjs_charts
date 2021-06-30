import axios from 'axios';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json())
/*
const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data || null }
    })
*/

class ItemService {
    useItem(id) {
        const { data, error } = useSWR(`/api/user/${id}`, fetcher)

        return {
            item: data,
            isLoading: !error && !data,
            isError: error
        }
    }

    getAll() {
        /*
        const { items, error } = useSWR('/api/item', fetcher)
        console.log(items)
        return error ? [] : items;
        */
        return axios.get("/api/item");
    }

    get(id) {
        return axios.get(`/api/item/${id}`);
    }

    create(data) {
        return axios.post("/api/item", data);
    }

    update(id, data) {
        return axios.put(`/api/item/${id}`, data);
    }

    delete(id) {
        return axios.delete(`/api/item/${id}`);
    }

    deleteAll() {
        return axios.delete(`/api/item`);
    }
    /*
      findByTitle(title) {
        return axios.get(`/api/item?title=${title}`);
      }
    */
}

export default new ItemService();

/*
export default {
  getAll: async () => {
    let res = await axios.get(`/api/item`);
    return res.data || [];
  }
}
*/