class Like < ApplicationRecord
  belongs_to :user
  belongs_to :beat

  validates :user_id, uniqueness: true
end
