class AddImageUrlToBeats < ActiveRecord::Migration[6.1]
  def change
    add_column :beats, :image_url, :string
  end
end
