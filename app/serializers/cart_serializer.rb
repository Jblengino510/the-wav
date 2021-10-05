class CartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :beat_id
  has_one :user
  has_one :beat
end
