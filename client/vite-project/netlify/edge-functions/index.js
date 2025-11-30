export default async (req, context) => {

    // keeping the url hardcoded for now as initially this file was not able to read the env variables
    const url = new URL(`${context.url.pathname}`, 'https://quotes-117d.onrender.com/quotes');
    return Response.redirect(url.href, 301);
};

export const config = {
    path: '/quotes/*',
    excludedPath: ['/robots.txt'],
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit|LinkedInBot)'
    }
}