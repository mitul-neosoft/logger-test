export const objectSort = (arr: any[], key: string, method: 'asc' | 'desc', date?: boolean) => {
    if (method === 'asc') {
        if (date) {
            return arr.sort((a: any, b: any) => (new Date(a[key]) > new Date(b[key]) ? 1 : -1));
        } else {
            return arr.sort((a: any, b: any) => (a[key] == null || a[key] > b[key] ? 1 : -1));
        }
    } else {
        if (date) {
            return arr.sort((a: any, b: any) => (new Date(a[key]) < new Date(b[key]) ? 1 : -1));
        } else {
            return arr.sort((a: any, b: any) => (a[key] < b[key] ? 1 : -1));
        }
    }
}