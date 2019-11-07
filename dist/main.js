const tempe = new TempManager
const renderer = new Renderer

const loadPage = async function () {
    let currentTime = new Date(Date.now())
    await tempe.getDataFromDB()
    tempe.cityData.forEach(async c => {
        if (c.length > 0) {
            if ((((currentTime - c.updatedAt) / 3600000) % 24) > 3) {
                await tempe.updateCity(c.name)
            }
        }
    })
    renderer.renderWeather(tempe.cityData)
}
const handleSearch = async function (city) {
    await tempe.getCityData(city)
    renderer.renderWeather(tempe.cityData)
}
$("#search").on("click", async function () {
    let input = $("#city-input").val()
    $("#city-input").val("")
    await handleSearch(input)
})
$("#weather").on("click", "#save", async function () {
    const cityName = $(this).siblings("#city").text()
    await tempe.saveCity(cityName)
})
$("#weather").on("click", "#delete", function () {
    const cityName = $(this).siblings("#city").text()
    tempe.removeCity(cityName)
    renderer.renderWeather(tempe.cityData)
})
$("#weather").on("click", "#update", async function () {
    const cityName = $(this).siblings("#city").text()
    await tempe.updateCity(cityName)
    renderer.renderWeather(tempe.cityData)
})
loadPage();