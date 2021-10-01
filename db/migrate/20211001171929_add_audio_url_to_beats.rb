class AddAudioUrlToBeats < ActiveRecord::Migration[6.1]
  def change
    add_column :beats, :audio_url, :string
  end
end
