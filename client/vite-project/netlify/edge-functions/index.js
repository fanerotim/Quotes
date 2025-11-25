export default async (req, context) => {

    return new URL(`${context.url.pathname}`, 'https://quotes-117d.onrender.com/quotes');
};

export const config = {
    path: '/*',
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit)'
    }
}