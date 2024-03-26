
import { configureStore } from "@reduxjs/toolkit";
import { createApi, cryptoApi } from "../services/cryptoApi";

export default configureStore ({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
})