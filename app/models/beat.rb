class Beat < ApplicationRecord
  belongs_to :user
  belongs_to :genre
  has_one_attached :audio_data

  validates :name, presence: true
  validates :tempo, numericality: true, inclusion: { in: 0..300 }
  validates :price, numericality: { only_integer: true }
  validates :is_sold, inclusion: { in: [true, false] }
end
