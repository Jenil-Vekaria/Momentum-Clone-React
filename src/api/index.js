import axios from 'axios'

export const fetchQuote = async () => {
    try {
        const storedQuote = localStorage.getItem('quote')
        if (storedQuote) {
            console.log('Getting Stored Quote')
            return JSON.parse(storedQuote)
        }
        else {
            const response = axios.get(process.env.REACT_APP_QUOTE_API_URL)
            const { data } = await response
            const { contents: { quotes } } = data
            const { quote, author } = quotes[0]
            console.log('Getting New Quote')
            localStorage.setItem('quote', JSON.stringify({ quote, author }))
            return { quote, author }
        }

    }
    catch (error) {
        console.error(error)
    }

    return {}
}

export const fetchBackground = async () => {
    try {
        const backgroundImage = localStorage.getItem('backgroundImage')
        if (backgroundImage) {
            console.log('Getting Stored Background Url')
            return backgroundImage
        }
        else {
            const requestURL = `${process.env.REACT_APP_UNSPLASH_API_URL}client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&orientation=landscape&query=landscape`
            const request = axios.get(requestURL)
            const response = await request;
            const { data: { urls: { full } } } = response

            console.log('Getting New Background Url')
            localStorage.setItem('backgroundImage', full)
            return full
        }
    }
    catch (error) {
        console.error(error)
    }

}