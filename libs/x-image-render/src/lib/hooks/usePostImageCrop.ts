import { getSelectedSite, getSubDomain } from '@platformx/utilities';
import axios from 'axios';
import { useState } from 'react';

export const usePostImageCrop = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postRequest = async (path: string, payload: any, callback: any) => {
        try {
            setIsLoading(true);
            const res = await axios.post('https://dev.api.hcl-x.com/platform-x/' + path, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-cache",
                    sitename: getSelectedSite(),
                    site_host: getSubDomain(),
                },
                withCredentials: true,
            });
            setData(res.data);
            callback(res.data, payload);
        } catch (err: any) {
            setError(err);
            callback();
        } finally {
            setIsLoading(false);
        }
    };

    return { postRequest, data, isLoading, error };
};
