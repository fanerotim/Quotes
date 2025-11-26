export default async (req, context) => {
    // keeping the url hardcoded for now as initially this file was not able to read the env variables
    const url = new URL(`${context.url.pathname}`, 'https://quotes-117d.onrender.com/quotes');
    console.log(url)
    return Response.redirect(url);
};

export const config = {
    path: '/*',
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit)'
    }
}