class TempManager {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        const DBdata = await $.get('http://localhost:3000/cities')
        if (DBdata.length >= 1) {
            DBdata.forEach(d => this.cityData.push(d))
            this.cityData.forEach(c => c.updatedAt = new Date(c.updatedAt))
        } else {
            this.cityData = []
        }
    }
    async getCityData(cityName) {
        let city = await $.get('http://localhost:3000/city/' + cityName)
        if (city) {
            this.cityData.push(city)
        }
    }
    async saveCity(cityName) {
        const city = this.cityData.find(c => c.name === cityName)
        if (city) {
            await $.post('http://localhost:3000/city', city)
        }
    }
    removeCity(cityName) {
        $.ajax({
            method: "DELETE",
            url: 'http://localhost:3000/city/' + cityName,
            type: JSON,
            success: function(url) {
                console.log(url)
            },
            error: function(xhr, text, error) {
                console.log(text)
            }
        })
        const index = this.cityData.findIndex(d => d.name === cityName)
        this.cityData.splice(index, 1)
    }
    updateCity(cityName) {
        $.ajax({
            url: 'http://localhost:3000/city/' + cityName,
            method: "PUT",
            success: (response) => {
                const updatedCity = response
                const index2 = this.cityData.findIndex(d => d.name === cityName)
                this.cityData.splice(index2, 1, updatedCity)
                this.cityData.forEach(c => c.updatedAt = new Date(c.updatedAt))
            }
        })
    }
}