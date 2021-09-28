class AddDateSoldToBeats < ActiveRecord::Migration[6.1]
  def change
    add_column :beats, :date_sold, :datetime
  end
end
