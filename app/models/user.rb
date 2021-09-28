class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true, length: { minimum: 2 }
    validates :password, presence: true, length: { in: 6..30 }, confirmation: true
    validates :password_confirmation, presence: true

    has_many :beats, dependent: :destroy
end
