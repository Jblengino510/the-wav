class AddWaveFormUrlToBeats < ActiveRecord::Migration[6.1]
  def change
    add_column :beats, :wave_form_url, :string
  end
end
