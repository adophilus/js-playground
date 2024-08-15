let main = async () => {
  let response = await Fetch.fetch(
<<<<<<< HEAD
    "https://www.meta.ai/api/graphql/",
    {
      method: #POST,
      headers: Fetch.Headers.fromObject({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
=======
    "http://localhost:8080",
    {
      method: #GET,
      headers: Fetch.Headers.fromObject({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
>>>>>>> c791865e809c744b159f4d4f9acf848560b074e0
      }),
    },
  )

<<<<<<< HEAD
  Console.log(response)
=======
  Console.log(response->Fetch.Response.status)
  Console.log(response->Fetch.Response.headers)
  // Console.log(await response->Fetch.Response.text)
>>>>>>> c791865e809c744b159f4d4f9acf848560b074e0
}

main()->ignore
