class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :created_at, :total_beats_uploaded, :total_plays, :total_likes, :unsold_beats, :total_beats_sold, :total_earnings, :beats_sold_by_week

  has_many :carts

  def total_earnings
    self.object.beats.where(is_sold: true).pluck(:price).sum
  end

  def beats_sold_by_week
    self.object.beats.where(is_sold: true).group_by_week(:date_sold, last: 12).count
  end

  def total_beats_sold
    self.object.beats.where(is_sold: true).length
  end

  def unsold_beats
    self.object.carts.map{|item| item.beat.is_sold}.filter{|boolean| boolean == false}.count
  end

  def total_beats_uploaded
    self.object.beats.length
  end

  def total_plays
    self.object.beats.pluck(:plays).sum
  end

  def total_likes
    self.object.beats.map{|beat| beat.likes.length}.sum
  end
  
end
