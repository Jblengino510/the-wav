# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '🌱 Seeding data...'

puts '💥 Destroying old seeds...'
User.destroy_all
Genre.destroy_all
Beat.destroy_all
Cart.destroy_all
Like.destroy_all

puts '👤 Creating users...'
josh = User.create!(username: 'Josh', password: 'password', password_confirmation: 'password', avatar_url: '')
aaron = User.create!(username: 'Aaron', password: 'password', password_confirmation: 'password', avatar_url: '')


puts '🎼 Creating genres...'
Genre.create(name: 'Hip-Hop/Rap')
Genre.create(name: 'R&B')
Genre.create(name: 'Reggae')
Genre.create(name: 'Rock')
Genre.create(name: 'Electronic')
Genre.create(name: 'Country')
Genre.create(name: 'Metal')
Genre.create(name: 'Jazz')
Genre.create(name: 'Funk')
Genre.create(name: 'Afrobeat')
Genre.create(name: 'Dancehall')
Genre.create(name: 'Reggaeton')
Genre.create(name: 'Latin')
Genre.create(name: 'Latin Pop')
Genre.create(name: 'Pop')
Genre.create(name: 'House')


puts 'Creating beats...'

#SOLD BEATS
aug_date = rand(1..30).days.seconds.ago
july_date = rand(31..60).days.seconds.ago
july2 = rand(61..80).days.seconds.ago

10.times do
    Beat.create!(user_id: 2, genre_id: Genre.all.ids.sample, name: 'LESS GO', tempo: rand(50..200), price: 20, is_sold: true, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg', date_sold: aug_date)
    Beat.create!(user_id: 2, genre_id: Genre.all.ids.sample, name: 'LESS GO', tempo: rand(50..200), price: 20, is_sold: true, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg', date_sold: july_date)
    Beat.create!(user_id: 2, genre_id: Genre.all.ids.sample, name: 'LESS GO', tempo: rand(50..200), price: 20, is_sold: true, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg', date_sold: july2)
end

#Josh's beats
Beat.create!(user_id: 2, genre_id: Genre.all.ids.sample, name: 'Flex', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')
Beat.create!(user_id: 2, genre_id: Genre.all.ids.sample, name: 'Tinted Windows', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635309/de6zk4k7kjjp5ymk1hfs.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')
Beat.create!(user_id: 2, genre_id: Genre.all.ids.sample, name: 'We Out', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635332/rneetzsc5l0ojywwxq80.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')



#Aaron's beats
Beat.create!(user_id: 1, genre_id: Genre.all.ids.sample, name: 'Flex', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')
Beat.create!(user_id: 1, genre_id: Genre.all.ids.sample, name: 'LESS GO', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')
Beat.create!(user_id: 1, genre_id: Genre.all.ids.sample, name: 'Flex', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')
Beat.create!(user_id: 1, genre_id: Genre.all.ids.sample, name: 'Flex', tempo: rand(50..200), price: 20, is_sold: false, price: rand(10..50), plays: rand(1..100), audio_url: 'http://res.cloudinary.com/dczg4dzfm/video/upload/v1633635409/gypjqwfl7ghfasqifbxk.mp3', image_url: 'http://res.cloudinary.com/dczg4dzfm/image/upload/v1633375239/bfh6iybrqwuxttlrebil.jpg')

puts '✅ Done seeding...'