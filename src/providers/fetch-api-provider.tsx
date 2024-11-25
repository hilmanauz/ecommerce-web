"use client";
import React from "react";
import _ from "lodash";
import axios, { CreateAxiosDefaults } from "axios";
import { ApiClient } from "@/lib";

type ApiTokenProps = {
    token?: string;
    fetchType: "cms" | "client";
};

const FetchApiContext = React.createContext<ApiTokenProps>({
    fetchType: "cms",
});

export const useFetchApiContext = () => React.useContext(FetchApiContext);

export const useFetchApi = (props?: {
    otherProps?: Omit<CreateAxiosDefaults<any>, "headers" | "baseURL">;
    customHeaders?: {
        [key: string]: string;
    };
}) => {
    const { fetchType, token } = useFetchApiContext();
    const access_token = React.useMemo(() => {
        let authType = "";
        switch (fetchType) {
            case "client":
                authType = "Basic";
                break;
            case "cms":
                authType = "Bearer";
                break;
        }
        return `${authType} ${token}`;
    }, [token, fetchType]);

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: {
            Authorization: access_token,
            ...(props?.customHeaders || {}),
        },
        ...props?.otherProps,
        timeout: 30000,
    });

    return ApiClient(client);
};

const FetchApiProvider = (
    props: {
        children: React.ReactNode;
    } & ApiTokenProps
) => {
    const { children, ...token } = props;

    return (
        <FetchApiContext.Provider value={{ ...token }}>
            {children}
        </FetchApiContext.Provider>
    );
};

export default FetchApiProvider;
