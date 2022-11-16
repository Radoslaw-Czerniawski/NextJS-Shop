export const fetchData = async <T,>(url: string): Promise<T | Error> => {
    try {
        const req = await fetch(url);
        const res: T = await req.json();
        return res;
    } catch (error) {
        if (typeof error === 'string' || typeof error === 'undefined') {
            return new Error(error);
        }
        return new Error('Unexpected error while fetching');
    }
};
