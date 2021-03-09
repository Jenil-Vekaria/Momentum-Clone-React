import axios from 'axios'

export const fetchQuote = async () => {
    try {
        const storedQuote = localStorage.getItem('quote')
        const fetchNew = canFetchNewData()

        if (storedQuote && !fetchNew) {
            return JSON.parse(storedQuote)
        }
        else {
            const response = axios.get(process.env.REACT_APP_QUOTE_API_URL)
            const { data } = await response
            const { contents: { quotes } } = data
            const { quote, author } = quotes[0]

            localStorage.setItem('quote', JSON.stringify({ quote, author }))
            return { quote, author }
        }

    }
    catch (error) {
        console.error(error)
    }

    return ''
}

function canFetchNewData() {
    let lastFetch = localStorage.getItem('lastmodified')
    let fetchNew = true

    if (lastFetch) {
        lastFetch = new Date(lastFetch)
        const now = new Date()

        const timeDiff = Math.abs(now - lastFetch)
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        fetchNew = dayDiff >= 2
    }

    return fetchNew
}

export const fetchBackground = async () => {
    try {
        const backgroundImage = localStorage.getItem('backgroundImage')
        const fetchNew = canFetchNewData()

        if (backgroundImage && !fetchNew) {
            return JSON.parse(backgroundImage)
        }
        else {
            const requestURL = `${process.env.REACT_APP_UNSPLASH_API_URL}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&orientation=landscape&query=hill`
            const request = axios.get(requestURL)
            const response = await request;
            let { data: { urls: { full }, user: { name }, location: { city, country }, links: { html } } } = response

            let user = name
            let locationCountry = country

            if (city && country) {
                city += ', '
            }

            const result = { full, user, city, locationCountry, html }

            localStorage.setItem('backgroundImage', JSON.stringify(result))
            localStorage.setItem('lastmodified', new Date())

            return result
        }
    }
    catch (error) {
        console.error(error)
    }

    // This is a backup background if the unsplash fails to fetch a background
    return 'https://theysaidso.com/img/qod/qod-inspire.jpg'
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