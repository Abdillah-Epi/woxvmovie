import { useParams } from "react-router-dom";
import { ErrorResponse } from "../error";
import useAuth from "./useAuth";

export interface RequestSuccess {
    body: string;
    success: true;
}

export type RequestResponse = RequestSuccess | ErrorResponse;

const useResetPasssword = () => {
    const { oauth, setOAuth } = useAuth();

    const sendRequest = async (email: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/rest-password`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${oauth}`
            },
            method: "POST",
            body: JSON.stringify({
                email
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 202) {
            return 202;
        }
        return await res.json().then((r: ErrorResponse) => {
            return r;
        });
    };

    const params = useParams();
    const updatePassword = async (password: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/update-password/${params.token}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${oauth}`
            },
            method: "PUT",
            body: JSON.stringify({
                password
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        return await res.json().then((r: { success: true } | ErrorResponse) => {
            return r;
        });
    };

    return { sendRequest, updatePassword };
};

export default useResetPasssword;
