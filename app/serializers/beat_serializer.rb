class BeatSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :genre_id, :name, :tempo, :price, :plays, :is_sold, :date_sold, :audio_data, :created_at

  has_one :user
  has_one :genre
  has_many :likes

  def audio_data
    rails_blob_path(object.audio_data, only_path: true) if object.audio_data.attached?
  end
  
end
