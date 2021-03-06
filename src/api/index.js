import axios from 'axios'

export const fetchQuote = async () => {
    try {
        const storedQuote = localStorage.getItem('quote')

        if (storedQuote) {
            return JSON.parse(storedQuote)
        }
        else {
            const response = axios.get(process.env.REACT_APP_QUOTE_API_URL)
            const { data } = await response
            const { contents: { quotes } } = data
            const { quote, author, background } = quotes[0]

            localStorage.setItem('quote', JSON.stringify({ quote, author, background }))
            return { quote, author, background }
        }

    }
    catch (error) {
        console.error(error)
    }

    return ''
}