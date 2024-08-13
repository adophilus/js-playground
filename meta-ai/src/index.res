let main = async () => {
  let response = await Fetch.fetch(
    "https://www.meta.ai/api/graphql/",
    {
      method: #POST,
      headers: Fetch.Headers.fromObject({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      }),
    },
  )

  Console.log(response)
}

main()->ignore
