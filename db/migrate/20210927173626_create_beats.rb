class CreateBeats < ActiveRecord::Migration[6.1]
  def change
    create_table :beats do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :genre, null: false, foreign_key: true
      t.string :name
      t.integer :tempo
      t.integer :price
      t.boolean :is_sold

      t.timestamps
    end
  end
end
