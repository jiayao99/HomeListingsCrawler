# How to use?

~~~
git clone https://github.com/jiayao99/HomeListingsCrawler.git
~~~

~~~
cd HomeListingsCrawler
~~~

~~~
npm install
~~~

~~~
ts-node src/index.ts
~~~

then open postman (or your browser), send the following get request:

~~~
http://localhost:20001/crawl?city=San+Francisco&page=3&size=4
~~~

and the result should look something like this:

~~~
{
    "listings": [
        {
            "address": "488 Walkup St, Millersburg, OH 44654",
            "price": "240000",
            "bedrooms": "3",
            "bathrooms": "1",
            "sqft": "1623"
        },
        {
            "address": "599 Terrace Ridge Cir, Howard, OH 43028",
            "price": "614777",
            "bedrooms": "4",
            "bathrooms": "3",
            "sqft": "4150"
        },
        {
            "address": "1465 Lockbourne Rd, Columbus, OH 43206",
            "price": "319900",
            "bedrooms": "5",
            "bathrooms": "5",
            "sqft": "1964"
        },
        {
            "address": "9717 Ketterman Dr, Galion, OH 44833",
            "price": "215000",
            "bedrooms": "3",
            "bathrooms": "1",
            "sqft": "1008"
        }
    ]
}
~~~
