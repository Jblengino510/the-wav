## The Wav
<img height="200x" src="client/public/the-wav-logo.jpg">

The Wav is an online marketplace where users can buy and sell beats.

<br />

## Built With
This project was built with the following:
- [Ruby on Rails](https://rubyonrails.org/)
- [React](https://reactjs.org/)
- [React Dropzone](https://react-dropzone.js.org/)
- [Material UI](https://mui.com/) (CSS)
- [Chartkick](https://chartkick.com/), [Chart.js](https://www.chartjs.org/)

<br />

## Getting Started
<br />
To run this project locally, run the following commands:
<br />

```javascript
bundle install
npm install --prefix client

rails db:create db:migrate db:seed

rails s
npm start --prefix client
```


## User Stories

- Browse beats uploaded by all creators.
- Log in to an existing account or create a new one.
- Upload beats to their profile with a drag & drop feature (Audio files accepted: M4A, MP3, WAV, FLAC, AAC, OGG, MP2, and WMA).
- Edit or delete a previously uploaded beat.
- Like/dislike beats from other creators.
- View total likes and plays for each beat.
- Add beats to their cart for purchase (fake checkout).
- Edit their username, profile picture, and banner image.
- Users are provided a dashboard where they can track sales stats such as total beats sold, totals earnings, and total plays from all of their beats.
