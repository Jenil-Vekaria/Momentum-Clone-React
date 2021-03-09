import axios from 'axios'

export const fetchQuote = async () => {
    try {
        const storedQuote = localStorage.getItem('quote')
        let lastFetch = localStorage.getItem('lastmodified')
        let fetchNew = false

        if (lastFetch) {
            lastFetch = new Date(lastFetch)
            const now = new Date()

            const timeDiff = Math.abs(now - lastFetch)
            const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

            fetchNew = dayDiff >= 1
        }

        if (storedQuote && !fetchNew) {
            return JSON.parse(storedQuote)
        }
        else {
            const response = axios.get(process.env.REACT_APP_QUOTE_API_URL)
            const { data } = await response
            const { contents: { quotes } } = data
            const { quote, author, background } = quotes[0]

            localStorage.setItem('quote', JSON.stringify({ quote, author, background }))
            localStorage.setItem('lastmodified', new Date())
            return { quote, author, background }
        }

    }
    catch (error) {
        console.error(error)
    }

    return ''
}

export const fetchWeather = async () => {
    try {
        const requestURL = `${process.env.REACT_APP_WEATHER_API_URL}?q=toronto&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        const request = axios.get(requestURL)
        const response = await request

        const { data: { name, sys: { country }, main: { temp }, weather } } = response
        let { icon, main } = weather[0]

        icon = `${process.env.REACT_APP_WEATHER_ICON_URL}${icon}.png`

        return { name, temp, icon, main, country }

    } catch (error) {
        console.error(error)
    }

    return ''
}