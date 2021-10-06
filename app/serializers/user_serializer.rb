class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :avatar_url, :created_at, :total_beats, :total_plays, :unsold_beats, :total_beats_sold, :beats_sold_by_week

  has_many :carts

  def beats_sold_by_week
    self.object.beats.where(is_sold: true).group_by_week(:date_sold, last: 12).count
  end

  def total_beats_sold
    self.object.beats.where(is_sold: true).length
  end

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
