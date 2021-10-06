class CartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :beat_id, :beat_creator
  has_one :user
  has_one :beat

  def beat_creator
    self.object.beat.user.username
  end
end
