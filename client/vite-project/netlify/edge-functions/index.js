export default async (req, context) => {
    console.log('THOSE ARE THE HEADERS AND FIRST LOG - SERVES AS GENERAL INFORMATION.', req.headers);

    console.log('Context provides access to the pathname ', context.url.pathname)
    console.log('this pointed to Window obj, but it was empty, so lets print it now to double check: ', window)

    const url = new URL(`${context.url.pathname}`, `${import.meta.env.VITE_BASE_URL}`);
    console.log('CONSTRUCTED URL: ', url);

    new Response('Testing my first edge function')
};

export const config = {
    path: '/*',
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit)'
    }
}