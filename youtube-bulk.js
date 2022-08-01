const axios = require('axios')

const links = [
]

async function main() {
    for (const link of links) {
        try {
            const response = await axios.get(`https://www.youtube.com/oembed?url=${link}`);
        } catch (error) {
            console.log(link)
            console.log(error.status, error.data, error.text)
        }
    }

}

main().then(console.log).catch(console.error)
