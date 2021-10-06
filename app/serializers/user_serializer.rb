class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :avatar_url, :created_at, :total_beats, :total_plays, :unsold_beats

  has_many :carts

  def unsold_beats
    self.object.carts.map{|item| item.beat.is_sold}.filter{|boolean| boolean == false}.count
  end

  def total_beats
    self.object.beats.length
  end

  def total_plays
    self.object.beats.pluck(:plays).sum
  end
  
end
