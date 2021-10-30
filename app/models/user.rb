class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true, length: { minimum: 2 }
    validates :password, presence: true, length: { in: 6..30 }, confirmation: true, on: :create
    validates :password_confirmation, presence: true, on: :create

    has_many :beats, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :carts, dependent: :destroy
   
end
