class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :mobile
      t.string :work
      t.text   :address
      t.text   :notes
      t.integer :user_id
      
      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
