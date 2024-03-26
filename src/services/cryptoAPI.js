
// import { CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/Query";

// const cryptoApiHeaders = {
//     'X-RapidAPI-Key': 'ac078b76fbmsh47406e93a529966p19aac9jsnb9b31f3bf649',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

// }

// const baseUrl = 'https://coinranking1.p.rapidapi.com/coins';

// export const cryptoApi = createApi({
//     reducerPath: 'cryptoApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({ 
//         getCryptos: builder.query({
//             query: () => '/exchanges'
//         })
//     })
// });


// Import necessary functions from @reduxjs/toolkit/query for API creation and fetching.
import { CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/Query";

// Define an object containing headers, specifically for authenticating requests to the crypto API.
const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'ac078b76fbmsh47406e93a529966p19aac9jsnb9b31f3bf649', // API key for authentication
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com' // Host header for identifying the target server
}

// Set the base URL for the API calls, pointing to the crypto data provider.
const baseUrl = 'https://coinranking1.p.rapidapi.com/coins';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders});

// Create a Redux API slice using the createApi function, configuring it for crypto data fetching.
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi', // This seems to be a typo. It should be 'reducerPath' to define the state slice name.
    baseQuery: fetchBaseQuery({ baseUrl }), // Configure the base query with the base URL.
    endpoints: (builder) => ({  // Define the API endpoints using a builder pattern.
        getCryptos: builder.query({ // Create a query endpoint to fetch crypto data.
            query: () => createRequest('/exchanges') // Define the specific path for the query, which seems incorrect. It should target something like `/coins` based on the baseUrl.
        })
    })
});

