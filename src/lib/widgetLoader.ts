const localBaseUrl = `http${process.env.NODE_ENV === "production" ? "s" : ""}://${process.env.NEXT_PUBLIC_HOST}/widgets`

const widgets = [
    {
        name: "Test 1",
        path: localBaseUrl + "/test/1",
        logo: null,
        colour: "red"
    },
    {
        name: "Another test",
        path: localBaseUrl + "/test2",
        logo: "Spotify_Logo_CMYK_White.png",
        colour: "aqua"
    },
    {
        name: "Memory Game",
        path: localBaseUrl + "/memoryGame",
        logo: null,
        colour: "lime"
    },
    {
        name: "External site test - zoom quilt",
        path: "https://zoomquilt.org/",
        logo: null,
        colour: "lime"
    }
]

export default widgets;