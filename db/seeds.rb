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

puts '👤 Creating users...'
josh = User.create(username: 'Josh', password: 'password', avatar_url: '')

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

puts '✅ Done seeding...'