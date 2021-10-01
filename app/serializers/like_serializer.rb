class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :beat_id
  has_one :beat
end
