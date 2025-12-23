import { useState, useMemo } from 'react';
import './App.css';

const TRACK_IDS = [
  "78nvT4euebtCsEigaNt4aa",
  "1i92UFFkxtKv4tYNzt1X1b",
  "34xGLuxM0rkxhCVyMSqwJO",
  "3F3roWqJPMtmLbPPl93bbR",
  "2Ch7LmS7r2Gy2kc64wv3Bz",
  "561jH07mF1jHuk7KlaeF0s",
  "1Y3LN4zO1Edc2EluIoSPJN",
  "0rKtyWc8bvkriBthvHKY8d",
  "2LKOHdMsL0K9KwcPRlJK2v",
  "4Ub8UsjWuewQrPhuepfVpd",
  "7H7NyZ3G075GqPx2evsfeb",
  "78Sw5GDo6AlGwTwanjXbGh",
  "1v1oIWf2Xgh54kIWuKsDf6",
  "7oD6QZsaK3lrMWsmJnvuO0",
  "5TRPicyLGbAF2LGBFbHGvO",
  "3s7MCdXyWmwjdcWh7GWXas",
  "4NgherJDfCXWBZBYheM4jK",
  "3JvKfv6T31zO0ini8iNItO",
  "1SKPmfSYaPsETbRHaiA18G",
  "1xK59OXxi2TAAAbmZK0kBL",
  "1DIXPcTDzTj8ZMHt3PDt8p",
  "5KXsZJtIb0ec5gfBKBw3vh",
  "2LWJ0zNei0z2WjHHwSNUkx",
  "1vicAuW47ccp1l5mYmaWi7",
  "14Bcv6siTBPw3TlP84dasC",
  "5kqIPrATaCc2LqxVWzQGbk",
  "37y7iDayfwm3WXn5BiAoRk",
  "7uoFMmxln0GPXQ0AcCBXRq",
  "5MxNLUsfh7uzROypsoO5qe",
  "3CIyK1V4JEJkg02E4EJnDl",
  "7MJQ9Nfxzh8LPZ9e9u68Fq",
  "5CM4UuQ9Gnd6K2YyKGPMoK",
  "3YaRY9vbpnggTArCdGVXnS",
  "4LRPiXqCikLlN15c3yImP7",
  "1k1Bqnv2R0uJXQN4u6LKYt",
  "2Foc5Q5nqNiosCNqttzHof",
  "3AJwUDP919kvQ9QcozQPxg",
  "2QjOHCTQ1Jl3zawyYOpxh6",
  "2qOm7ukLyHUXWyR4ZWLwxA",
  "7yq4Qj7cqayVTp3FF9CWbm",
  "3CboywxfJIgvHqi2FF4exb",
  "1ujxjsoNvh4XgS2fUNwkZ2",
  "4SqWKzw0CbA05TGszDgMlc",
  "4pTkDIlpFNoeWbahu8pVXW",
  "2pUpNOgJBIBCcjyQZQ00qU",
  "70LcF31zb1H0PyJoS1Sx1r",
  "3NqBxTOMCJ3zW9CIP51td4",
  "591ks2A0o7ratTpiRdI7M6",
  "2VxeLyX666F8uXCJ0dZF8B",
  "2Z8WuEywRWYTKe1NybPQEW",
  "3hPbdPIXZPpyywSxnKNtYh",
  "0VjIjW4GlUZAMYd2vXMi3b",
  "1qDrWA6lyx8cLECdZE7TV7",
  "0y1QJc3SJVPKJ1OvFmFqe6",
  "7DbdUf8aHSYoliSjO6LZv6",
  "0MnTkIEP4zZN1IUSu8MvIz",
  "7EkWXAI1wn8Ii883ecd9xr",
  "79EkGysjP2dL5GdpeQjRxT",
  "6RUKPb4LETWmmr3iAEQktW",
  "0sTlGEld0h8kIPZaKDYUf4",
  "1Fid2jjqsHViMX6xNH70hE",
  "6b37xrsNCWYIUphFBazqD6",
  "4ZJwt3yb5gVCufioOQHBKS",
  "1qpGMJi0ippCaMUOs7cz2q",
  "4h4QlmocP3IuwYEj2j14p8",
  "6Dk5fHTvH897XrVzCO64Mx",
  "1mea3bSkSGXuIRvnydlB5b",
  "7GX5flRQZVHRAGd6B4TmDO",
  "0yc6Gst2xkRu0eMLeRMGCX",
  "7D7e6hm2LiNd6nLuJF6K9Q",
  "6lYY2HktYKpV1pUamfRlU1",
  "6AQbmUe0Qwf5PZnt4HmTXv",
  "1KIJclzEbNhSVw8tiHPWwE",
  "1QwYL1JmXingJ2UQeLEeBH",
  "1aXV8GrmQLvgoFtBPERP7E",
  "1cwqP7Tyxu5z8XDYoPkNte",
  "6RiiSy9GzSwiyDEJDiMuKe",
  "2dHHgzDwk4BJdRwy9uXhTO",
  "7DcJ6fEBb7BaKuYKTwiDxK",
  "4nAo5a74uSbJ1R114JKGEU",
  "7KhJdiu4zbPlhlImRLIyDl",
  "0TwBtDAWpkpM3srywFVOV5",
  "5TbzAWWc5eJaANpA9kfGCd",
  "3OHfY25tqY28d16oZczHc8",
  "1ml03ZtwxEJJiEuIsjke7W",
  "5E4mQ2mXblbeuI4tefnMZG",
  "0FDzzruyVECATHXKHFs9eJ",
  "27rZYxE4l21wTaovX4WTnI",
  "31mzt4ZV8C0f52pIz1NSwd",
  "4ewazQLXFTDC8XvCbhvtXs",
  "3BJe4B8zGnqEdQPMvfVjuS",
  "3u6PxWema1snbjLbFEyjkJ",
  "5odlY52u43F5BjByhxg7wg",
  "4v7DCN09hgXkKazefkznDQ",
  "3rq5w4bQGigXOfdN30ATJt",
  "48q0vSHcJdhK3IiXH8C5WJ",
  "2bZ7OXzULD6d6qr137kR83",
  "50v2TSRV31bwpAPkjWejNL",
  "4etKC4ngPKsQDHUMnYgV3A",
  "5XeFesFbtLpXzIVDNQP22n",
  "0Qt4P9SmYBhzE5wdA4ERIl",
  "0FA4wrjDJvJTTU8AepZTup",
  "3RbNcjVnQixKa1sULcwd2K",
  "1j4kHkkpqZRBwE0A4CN4Yv",
  "7B3z0ySL9Rr0XvZEAjWZzM",
  "0DK6lGJisrNaLkiK6cjDaw",
  "5cjagrNaegv6IQZKflkPTf",
  "7rbECVPkY5UODxoOUVKZnA",
  "10nyNJ6zNy2YVYLrcwLccB",
  "6GyFP1nfCDB8lbD2bG0Hq9",
  "386RUes7n1uM1yfzgeUuwp",
  "2Ih217RCGAmyQR68Nn7Cqo",
  "6MXXY2eiWkpDCezVCc0cMH",
  "0BxE4FqsDD1Ot4YuBXwAPp",
  "40gk32E7YaTFoQwDIWv2SY",
  "1fDsrQ23eTAVFElUMaf38X",
  "6Ec5LeRzkisa5KJtwLfOoW",
  "29EdNlJQqStWhNkSGpkuFQ",
  "47AUpATUatp72I5Ctmh8I4",
  "16xmH2BN3DV1qmmq6XEpOQ",
  "42qNWdLKCI41S4uzfamhFM",
  "3hRV0jL3vUpRrcy398teAU",
  "6gQaf0ANLks2uWl2AHhU26",
  "7GkzY4rX5ChjsHM8JeBnU5",
  "2rmk4LsLFzVll7ceG3V2wq",
  "3aauaXWRgwCMoykMbI0Jq1",
  "3ZCTVFBt2Brf31RLEnCkWJ",
  "6vFsBXYczYsP0H3lgunZOm",
  "6gKpVBUrMg2QTujnagF9bf",
  "4KW1lqgSr8TKrvBII0Brf8",
  "20I6sIOMTCkB6w7ryavxtO",
  "2eAvDnpXP5W0cVtiI0PUxV",
  "3dnP0JxCgygwQH9Gm7q7nb",
  "6IPwKM3fUUzlElbvKw2sKl",
  "5rgy6ghBq1eRApCkeUdJXf",
  "3sNVsP50132BTNlImLx70i",
  "6Z8R6UsFuGXGtiIxiD8ISb",
  "6CKoWCWAqEVWVjpeoJXyNH",
  "7h2nmmoWDi2UpfYKLKWLYB",
  "3GYlZ7tbxLOxe6ewMNVTkw",
  "0WFryfbNKPXVtVQlz5dZ8H",
  "0SpkyS1Q4MD8GaVcP5YjT4",
  "3oUEzTAoOxqZHN4xiqTGqJ",
  "1FWsomP9StpCcXNWmJk8Cl",
  "0dGqP4VickYjtIaB5VOt4H",
  "6dBUzqjtbnIa1TwYbyw5CM",
  "3p4hRhMcb6ch8OLtATMaLw",
  "4kjI1gwQZRKNDkw1nI475M",
  "4xqrdfXkTW4T0RauPLv3WA",
  "6tNQ70jh4OwmPGpYy6R2o9",
  "3I10CpyWcseAMRzPCY2uPB",
  "5VOgXIIDg9cyQ3VMXgH3a3",
  "4apQk6JELGhkcuSuIZz6jW",
  "3vkCueOmm7xQDoJ17W1Pm3",
  "77KnJc8o5G1eKVwX5ywMeZ",
  "5TxRUOsGeWeRl3xOML59Ai",
  "0JIMT9gzLIIz0esKLyjbKf",
  "6dOtVTDdiauQNBQEDOtlAB",
  "40riOy7x9W7GXjyGp4pjAv",
  "0BCPKOYdS2jbQ8iyB56Zns",
  "3fuyYaLhZ2RoP9eWpvfP1H",
  "0UV5zxRMz6AO4ZwUOZNIKI",
  "2plbrEY59IikOBgBGLjaoe",
  "5Ravsw8TmHN5wBiYPPYUFw",
  "3QaPy1KgI7nu9FJEQUgn6h",
  "04sN26COy28wTXYj3dMoiZ",
  "4RVwu0g32PAqgUiJoXsdF8",
  "6jbYpRPTEFl1HFKHk1IC0m",
  "35ISBknsCeZQtq66xABI9g",
  "63Gl4Wqr98iJnWoNGFOQjr",
  "3jHdKaLCkuNEkWcLVmQPCX",
  "2bvZfl6IXGK1bxhJQTvhP6",
  "1vcb5OCIZ7X7WfomgPgH4y",
  "5Osd2BWeCNtA6EMLY0Dsil",
  "6rL8u0RmBmL1Mp5rK33tQA",
  "6H4TFP1VT37sLqcB0SEDPa",
  "2cGxRwrMyEAp8dEbuZaVv6",
  "57iDDD9N9tTWe75x6qhStw",
  "2dxjKgT0li4qBI3QwuN9Ih",
  "19kHhX6f6EfLU7rcO3RqjO",
  "3skn2lauGk7Dx6bVIt5DVj",
  "1KMkcUvF7m3SDChDOa7i5L",
  "46vNe30zHBP2HUaYjqjL5g",
  "3hB9lDLyAClYVZivMMl20N",
  "3oEkrIfXfSh9zGnE7eBzSV",
  "1Dr5JexwA15wmKe7Y7maA9",
  "5EWPGh7jbTNO2wakv8LjUI",
  "21IYMdzTrzSe191Cy5eMap",
  "7eJMfftS33KTjuF7lTsMCx",
  "2nLtzopw4rPReszdYBJU6h",
  "1o82DwNisONAd2mu1RcGE6",
  "426HZHqKEfGFiNeEjS0Zeq",
  "6YYjo0Q9iYlG3KrUOPr1kt",
  "2VHp98YYcFKrAy09IaiXN2",
  "6wE5bUgyErJTzGBqqbjdGo",
  "1XBYiRV30ykHw5f4wm6qEn",
  "44CZRkOxv7UItaAUmh8PgN",
  "6Qyc6fS4DsZjB2mRW9DsQs",
  "7FDV5ELOJHCGLe52AnttEd",
  "39sDitIeCMrVX2QyXHY46t",
  "3VCXx37jNGNOMns6z2OnvJ",
];

const TRACK_SET = new Set(TRACK_IDS);

const extractTrackId = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(
    /(?:open\.spotify\.com\/track\/|spotify:track:)([A-Za-z0-9]{22})/
  );
  if (match) return match[1];
  if (/^[A-Za-z0-9]{22}$/.test(trimmed)) return trimmed;
  return null;
};

const RESULT_COPY = {
  in: {
    title: "In Ahu Road",
    body: "Signal locked. This track is inside the Ahu Road list.",
  },
  out: {
    title: "Not In Ahu Road",
    body: "No match. This track is outside the Ahu Road list.",
  },
  invalid: {
    title: "Invalid Link",
    body: "Drop a full Spotify track link or a 22-char track ID.",
  },
};

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = extractTrackId(input);
    if (!id) {
      setResult({ status: "invalid", id: null });
      return;
    }
    setResult({ status: TRACK_SET.has(id) ? "in" : "out", id });
  };

  const helperText = useMemo(
    () => "Paste any Spotify track link and we will scan the Ahu Road list.",
    []
  );

  return (
    <div className="frame">
      <header>
        <p className="subtitle">Is it in Ahu Road?</p>
        <h1 className="title">Ahu Road Scanner</h1>
        <p className="subtitle">{helperText}</p>
      </header>

      <form className="input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://open.spotify.com/track/..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setResult(null);
          }}
        />
        <button type="submit">Check</button>
      </form>

      {result && (
        <section className={`result ${result.status}`}>
          <div className="pill">
            <span className="track-id">
              {result.id ? result.id : "no-id"}
            </span>
          </div>
          <h2>{RESULT_COPY[result.status].title}</h2>
          <p>{RESULT_COPY[result.status].body}</p>
        </section>
      )}

      <div className="footer">
        <span>Black &amp; white mode engaged.</span>
        <div className="signal" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default App;
