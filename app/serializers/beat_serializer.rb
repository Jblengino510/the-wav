class BeatSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :tempo, :price, :is_sold, :date_sold, :audio_data
  has_one :user
  has_one :genre

  def audio_data
    rails_blob_path(object.audio_data, only_path: true) if object.audio_data.attached?
  end
  
end
