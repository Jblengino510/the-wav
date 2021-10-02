class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :avatar_url, :created_at, :total_beats, :total_plays

  def total_beats
    self.object.beats.length
  end

  def total_plays
    self.object.beats.pluck(:plays).sum
  end
  
end
