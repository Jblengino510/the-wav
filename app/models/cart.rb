class Cart < ApplicationRecord
  belongs_to :user
  belongs_to :beat

  validates :beat_id, uniqueness: { scope: :user }
end
