class CreateActivities < ActiveRecord::Migration
  def self.up
    create_table :activities do |t|
      t.string :subject
      t.string :from
      t.integer :email_id
      t.integer :user_id
      t.boolean :seen
      t.timestamps
    end
  end

  def self.down
    drop_table :activities
  end
end
