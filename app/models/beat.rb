class Beat < ApplicationRecord
  belongs_to :user
  belongs_to :genre
  has_many :likes, dependent: :destroy
  has_many :carts, dependent: :destroy

  validates :name, presence: true
  validates :tempo, presence: true, numericality: true, inclusion: { in: 0..300 }
  validates :price, presence: true, numericality: { only_integer: true }
  validates :is_sold, inclusion: { in: [true, false] }
end
