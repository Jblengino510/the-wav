class AddPlaysToBeats < ActiveRecord::Migration[6.1]
  def change
    add_column :beats, :plays, :integer
  end
end
