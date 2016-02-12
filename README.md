# url-shortener

## Free Code Camp URL Shortener Microservice Project

At /new, accepts any valid URL (example: http://www.google.com/), and outputs a JSON-formatted string that includes a shortened link:

```
hostname/new/http://www.google.com
{"original_url":"http://www.google.com","short_url":"hostname/cnku"}
```

`short_url` will now redirect to `original_url`.

If an invalid URL is supplied, the service replies with an error:
```
{"error":"Invalid URL"}
```

#### Built following the Clementine.js tutorial:
#### http://www.clementinejs.com/tutorials/tutorial-beginner.html
