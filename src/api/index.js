import axios from 'axios'

const ADVICE_URL = 'https://api.adviceslip.com/advice';

export const fetchAdvice = async () => {
    try {
        const response = axios.get(ADVICE_URL)
        const { data: { slip: { advice } } } = await response

        return advice
    } catch (error) {
        console.error(error)
    }

    return ''
}