# IMDB-Scraper

## Setup the project

**Install the project**:

``` bash
git clone https://github.com/tetsh/IMDB-Scraper.git
cd IMDB-Scraper
npm i
```

**Setup the database**:

Run the sql commands in models/database.sql

``` bash
mysql -u root -p > source models/database.sql
```

**Setup the environmental variables**: Replace the variables in example.env with your local mysql settings and rename the file to `.env`

**Run the server**:

``` bash
npm start
```

**Get API Service**:

``` bash
Trending Movies
http://localhost:3000/api/trending/

Top Rated Movies
http://localhost:3000/api/toprated/

Now Playing Movies
http://localhost:3000/api/nowplaying/

UpComming Movies
http://localhost:3000/api/upcoming/

Recommendation Movies
http://localhost:3000/api/recommendations/791373
```