class CartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :beat_id, :beat_creator, :sold
  has_one :user
  has_one :beat

  def sold
    self.object.beat.is_sold
  end

  def beat_creator
    self.object.beat.user.username
  end

end
