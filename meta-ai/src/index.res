let main = async () => {
  let response = await Fetch.fetch(
    "http://localhost:8080",
    {
      method: #GET,
      headers: Fetch.Headers.fromObject({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
      }),
    },
  )

  Console.log(response->Fetch.Response.status)
  Console.log(response->Fetch.Response.headers)
  // Console.log(await response->Fetch.Response.text)
}

main()->ignore
